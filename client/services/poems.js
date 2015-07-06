var config = require('config');

var baseUrl = config.baseServerUrlAdmin+'poems/';

var Service = {
	PoemType: {
		thotinh: 'Thơ tình',
		thodoi: 'Thơ đời',
		thodao: 'Thơ đạo'
	},
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