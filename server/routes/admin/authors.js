var AuthorsController = require('controllers/admin/AuthorsController');

module.exports = function(app){
	var config = require('config');
	var module = config.defaultAdminUrl+'authors/';

	app.post(module+'add', AuthorsController.postAdd);
	app.post(module+'list', AuthorsController.postList);
}