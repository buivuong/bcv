var PoemsController = require('controllers/admin/PoemsController');

module.exports = function(app){
	var config = require('config');
	var module = config.defaultAdminUrl+'poems/';

	app.post(module+'add', PoemsController.postAdd);
	app.post(module+'edit', PoemsController.postEdit);
	app.post(module+'delete', PoemsController.postDelete);
	app.post(module+'list', PoemsController.postList);
	app.post(module+'detail', PoemsController.postDetail);
}