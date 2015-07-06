var knex = require('connect');
var PoemsModel = require('models/admin/PoemsModel');
var PhotosModel = require('models/admin/PhotosModel');
var is = require('is_js');
var async = require('async');
var functions = require('functions');
var fs = require('fs');
var path = require('path');
var Config = require('config');

var main = {
	postDelete: function(req, res){
		var postData = req.body.data;

		var updateData = {
			deleted: 1
		}
		
		knex('poems')
		.where('id', postData.id)
		.update(updateData)
		.then(function(updated){
			return res.json({data: updated});
		})
		.catch(function(error){
			return res.status(500).json(error);
		})
	},
	postEdit: function(req, res){
		var postData = req.body.data;

		var updateData = {
			name: postData.name,
			author_id: postData.author_id,
			content: postData.content,
			description: postData.description,
			updated_at: postData.updated_at,
			updated_by: postData.updated_by
		}

		var errors = PoemsModel.validation_require_fields(postData);

		if(errors.length > 0)
			return res.status(400).json(errors);

		knex('poems')
		.where('id', postData.id)
		.update(updateData)
		.then(function(updated){
			return res.json({data: updated});
		})
		.catch(function(error){
			return res.status(500).json(error);
		})
	},
	postDetail: function(req, res){
		var postData = req.body.data;

		knex('poems')
		.select('poems.id', 'poems.name', 'poems.author_id', 'poems.content', 'poems.description', 'authors.name AS author_name')
		.innerJoin('authors', 'authors.id', 'poems.author_id')
		.where('poems.id', postData.id)
		.then(function(rows){
			return res.json({data: rows[0]});
		})
		.catch(function(error){
			return res.status(500).json(error);
		})
	},
	postList: function(req, res){
		var postData = req.body.data;

		var limit = parseInt(postData.limit);
		var offset = parseInt(postData.offset);

		async.waterfall([
			function(callback){
				knex('photos')
				.where('name', 'like', '%'+functions.execEmpty(postData.search.name)+'%')
				.where('deleted', 0)
				.limit(limit)
				.offset(offset)
				.orderBy('created_at', 'desc')
				.then(function(rows){
					callback(null, rows);
				})
				.catch(function(error){
					return res.status(500).json(error);
				})
			},
			function(rows, callback){
				knex('poems')
				.where('name', 'like', '%'+functions.execEmpty(postData.search.name)+'%')
				.where('deleted', 0)
				.count('id as count')
				.then(function(count){
					return res.json({data: rows, count: count[0].count});
				})
				.catch(function(error){
					return res.status(500).json(error);
				})
			}
		]);
	},
	postAdd: function(req, res){
		var files = req.files;

		var image = files.image;
		var postData = {
			name: req.body.name,
			author_id: req.body.author_id
		}

		if(is.null(image) || is.undefined(image))
			return res.status(400).json(PhotosModel.require_image_field);

		var errors = PoemsModel.validation_require_fields(postData);

		if(errors.length > 0)
			return res.status(400).json(errors);

		var image_name = new Date().getTime().toString();

		var insertData = {
			name: req.body.name,
			author_id: req.body.author_id,
			content: req.body.content,
			description: req.body.description,
			updated_at: req.body.current_date,
			created_at: req.body.current_date,
			created_by: req.body.user_id,
			updated_by: req.body.user_id,
			image: 'images/painting/'+image_name+'.jpg'
		}

		async.waterfall([
			function(callback){
				fs.readFile(files.image.path, function(error, data){
					if(error)
						return res.status(500).json(error);
					else{
						var newPath = path.dirname(process.cwd())+Config.storagePhoto+image_name+'.jpg';
						callback(null, newPath, data);
					}
				})
			},
			function(newPath, data, callback){
				fs.writeFile(newPath, data, function(error){
					if(error)
						return res.status(500).json(error);
					else
						callback(null);
				})
			},
			function(callback){
				knex('photos')
				.insert(insertData)
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