var React = require('react');
var SecurityService = require('services/security');
var Validation = require('components/validation');
var Config = require('config');
var is = require('is_js');

var Controller = {
	resetForm: function(dom){
		$('#'+dom.id_pre+'name').val('');
		$('#'+dom.id_pre+'password').val('');
	},
	getInputsValue: function(dom){
		var name = $('#'+dom.id_pre+'name').val();
		var password = $('#'+dom.id_pre+'password').val();
		var now = moment().tz(Config.serverTimezone).format('YYYY-MM-DD HH:mm:ss');
		var last_login_at = now;

		return {
			name: name, password: password, last_login_at: last_login_at
		}
	},
	beforeSubmit: function(dom){
		$(React.findDOMNode(dom)).removeClass('error');
		$(React.findDOMNode(dom)).addClass('loading');
		Validation.beforeErrorsDiv(dom);
	},
	onClickSubmit: function(dom){
		this.beforeSubmit(dom);
		var postData = this.getInputsValue(dom);

		SecurityService.login(postData)
		.then(function(response){
			this.resetForm(dom);
			var expire = 108000;
			Cookies.set('admin_user', JSON.stringify(response.data), {expires: expire});
			$(React.findDOMNode(dom)).removeClass('loading');
			dom.context.router.transitionTo('loggedIn');
		}.bind(this), function(error){
			$(React.findDOMNode(dom)).removeClass('loading');
			$(React.findDOMNode(dom)).addClass('error');

			if(error.status === 400)
				Validation.afterErrorsDiv(dom, error.messages);
		}.bind(this))
	}
}

module.exports = Controller;