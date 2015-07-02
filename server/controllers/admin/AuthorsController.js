var knex = require('connect');
var AuthorsModel = require('models/admin/AuthorsModel');
var is = require('is_js');
var async = require('async');

var main = {
	postList: function(req, res){
		var postData = req.body.data;

		async.waterfall([
			function(callback){
				knex('authors')
				.select()
				.orderBy('created_at', 'desc')
				.then(function(rows){
					return res.json({data: rows});
				})
				.catch(function(error){
					return res.status(500).json(error);
				})
			}
		]);
	},
	postAdd: function(req, res){
		var postData = req.body.data;

		var insertData = {
			name: postData.name,
			profile: postData.profile,
			created_at: postData.created_at,
			updated_at: postData.updated_at,
			created_by: postData.created_by,
			updated_by: postData.updated_by
		}

		var errors = AuthorsModel.validation_require_fields(postData);

		if(errors.length > 0)
			return res.status(400).json(errors);

		async.waterfall([
			function(callback){
				knex('authors')
				.where({name: postData.name})
				.then(function(rows){
					if(rows.length > 0)
						return res.status(400).json(AuthorsModel.server_same_fields);
					else
						callback(null);
				})
				.catch(function(error){
					return res.status(500).json(error);
				})
			},
			function(callback){
				knex('authors').insert(insertData)
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