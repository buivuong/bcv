var PhotosController = require('controllers/admin/PhotosController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

module.exports = function(app){
	var config = require('config');
	var module = config.defaultAdminUrl+'photos/';

	app.post(module+'add', multipartMiddleware, PhotosController.postAdd);
	app.post(module+'edit', PhotosController.postEdit);
	app.post(module+'delete', PhotosController.postDelete);
	app.post(module+'list', PhotosController.postList);
	app.post(module+'detail', PhotosController.postDetail);
}