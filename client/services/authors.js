var config = require('config');

var baseUrl = config.baseServerUrlAdmin+'authors/';

var Service = {
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