var SecurityController = require('controllers/admin/SecurityController');

module.exports = function(app){
	var config = require('config');
	var module = config.defaultAdminUrl+'security/';

	app.post(module+'registration', SecurityController.postRegistration);
	app.post(module+'login', SecurityController.postLogin);
	app.get(module+'checkAuth', SecurityController.getCheckAuth);
}