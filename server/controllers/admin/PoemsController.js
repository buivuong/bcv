var knex = require('connect');
var PoemsModel = require('models/admin/PoemsModel');
var is = require('is_js');
var async = require('async');
var functions = require('functions');

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
			type: postData.type,
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
		.select('poems.id', 'poems.name', 'poems.author_id', 'poems.content', 'poems.type', 'poems.description', 'authors.name AS author_name')
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
				knex('poems')
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
		var postData = req.body.data;
		var insertData = {
			name: postData.name,
			type: postData.type,
			author_id: postData.author_id,
			content: postData.content,
			description: postData.description,
			created_at: postData.created_at,
			updated_at: postData.updated_at,
			created_by: postData.created_by,
			updated_by: postData.updated_by
		}

		var errors = PoemsModel.validation_require_fields(postData);

		if(errors.length > 0)
			return res.status(400).json(errors);

		async.waterfall([
			function(callback){
				knex('poems')
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