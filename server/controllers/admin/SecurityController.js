var knex = require('connect');
var passwordHash = require('password-hash');
var SecurityModel = require('models/admin/SecurityModel');
var is = require('is_js');
var async = require('async');
var functions = require('functions');

var main = {
	getCheckAuth: function(req, res){
		var bearerToken;
	    var bearerHeader = req.headers.authorization;

	    if (typeof bearerHeader !== 'undefined') {
	        var bearer = bearerHeader.split(" ");
	        bearerToken = bearer[1];
	        
	        knex('users')
	        .where({
	        	token: bearerToken
	        })
	        .then(function(rows){
	        	if(rows.length > 0)
	        		res.status(200).json({message: 'There has token'});
	        	else
	        		res.status(400).json({message: 'There is no Authorization'});			
	        }, function(error){
	        	res.status(500).json({error: error});
	        })

	    }else
	    	res.status(500).json({message: 'There is no Authorization'});
	},
	postLogin: function(req, res){
		var postData = req.body.data;
		var token = new Date().getTime().toString();

		var updateData = {
			last_login_at: postData.last_login_at,
			token: token
		}

		var check_error_data = {
			name: postData.name,
			password: postData.password
		}

		var errors = SecurityModel.validation_require_fields(check_error_data);
		if(errors.length > 0)
			return res.status(400).json(errors);

		async.waterfall([
			function(callback){
				knex('users').where('name', postData.name).asCallback(function(err, rows){
					if(err) return res.status(500).json(err);
					else{
						if(rows.length === 0)
							return res.status(400).json(SecurityModel.server_name_exists);	
						else
							callback(null, rows[0]);
					}
				});
			},
			function(row, callback){
				if(passwordHash.verify(postData.password, row.password_hash))
					callback(null, row);
				else
					return res.status(400).json(SecurityModel.server_password_exists);
			},
			function(row, callback){
				row.token = token;

				knex('users').update(updateData)
				.then(function(updated){
					return res.json({data: row});
				})
				.catch(function(error){
					return res.status(500).json(error);
				})
			}
		]);
	},
	postRegistration: function(req, res){
		var postData = req.body.data;

		var password_hash = passwordHash.generate(postData.password);

		var insertData = {
			name: postData.name,
			email: postData.email,
			password: postData.password,
			password_hash: password_hash,
			created_at: postData.created_at,
			updated_at: postData.updated_at
		}

		var errors = SecurityModel.validation_require_fields(postData);

		if(errors.length > 0)
			return res.status(400).json(errors);
		
		errors = SecurityModel.validation_email_fields(postData);

		if(errors.length > 0)
			return res.status(400).json(errors);

		errors = SecurityModel.validation_min_fields(postData);

		if(errors.length > 0)
			return res.status(400).json(errors);

		errors = SecurityModel.validation_compare_fields(postData);

		if(errors.length > 0)
			return res.status(400).json(errors);

		async.waterfall([
			function(callback){
				knex('users').where('email', postData.email).asCallback(function(err, rows){
					if(err) return res.status(500).json(err);
					if(rows.length > 0)
						return res.status(400).json(SecurityModel.server_same_fields);
					else
						callback(null);
				});
			},
			function(callback){
				knex('users').insert(insertData)
				.then(function(rows){
					return res.json({data: {id: rows[0]}});
				})
				.catch(function(error){
					return res.status(500).json(error);
				})
			}
		]);
		
	}
}

module.exports = main;