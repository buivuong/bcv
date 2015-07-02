var config = require('config');

var baseUrl = config.baseServerUrlAdmin+'photos/';

var Service = {
	detail: function(post){
		var url = baseUrl+'detail';
		var postData = {data: post};
		var deferred = Q.defer();

		$.post(url, postData, function(data){
			deferred.resolve(data);
		})
		.fail(function(error){
			var response = {messages: JSON.parse(error.responseText), status: error.status};

			deferred.reject(response);
		})

		return deferred.promise;
	},
	add: function(post){
		var url = baseUrl+'add';
		var postData = post;
		var deferred = Q.defer();

		$.ajax({
			url: url,
			data: postData,
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			success: function(data){
				deferred.resolve(data);	
			},
			error: function(error){
				var response = {messages: JSON.parse(error.responseText), status: error.status};

				deferred.reject(response);
			}
		});

		return deferred.promise;
	},
	edit: function(post){
		var url = baseUrl+'edit';
		var postData = {data: post};
		var deferred = Q.defer();

		$.post(url, postData, function(data){
			deferred.resolve(data);
		})
		.fail(function(error){
			var response = {messages: JSON.parse(error.responseText), status: error.status};

			deferred.reject(response);
		})

		return deferred.promise;
	},
	delete: function(post){
		var url = baseUrl+'delete';
		var postData = {data: post};
		var deferred = Q.defer();

		$.post(url, postData, function(data){
			deferred.resolve(data);
		})
		.fail(function(error){
			var response = {messages: JSON.parse(error.responseText), status: error.status};

			deferred.reject(response);
		})

		return deferred.promise;
	},
	list: function(post){
		var url = baseUrl+'list';
		var postData = {data: post};
		var deferred = Q.defer();

		$.post(url, postData, function(data){
			deferred.resolve(data);
		})
		.fail(function(error){
			var response = {messages: JSON.parse(error.responseText), status: error.status};

			deferred.reject(response);
		})

		return deferred.promise;
	}
}

module.exports = Service;