var React = require('react');
var AuthorsService = require('services/authors');
var Validation = require('components/validation');
var Config = require('config');
var is = require('is_js');

var Controller = {
	listAuthors: function(dom){
		AuthorsService.list(null)
		.then(function(response){
			if(dom.isMounted())
				dom.setState({list: response.data});
		}, function(error){})
	},
	resetForm: function(dom){
		$('#'+dom.id_pre+'name').val('');
		dom.refs.profile_editor.reset();
	},
	getInputsValue: function(dom){
		var user_id = null;

		if(Cookies.get('admin_user')){
			var admin_user = JSON.parse(Cookies.get('admin_user'));
			user_id = admin_user.id;
		}

		var name = $('#'+dom.id_pre+'name').val();
		var profile = dom.refs.profile_editor.getHTML();
		var now = moment().tz(Config.serverTimezone).format('YYYY-MM-DD HH:mm:ss');
		var created_at = updated_at = now;

		return {
			name: name, profile: profile, created_at: created_at, updated_at: updated_at, created_by: user_id, updated_by: user_id
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

		AuthorsService.add(postData)
		.then(function(response){
			this.resetForm(dom);
			$(React.findDOMNode(dom)).removeClass('loading');
			dom.context.router.transitionTo('admin_authors_list');
		}.bind(this), function(error){
			$(React.findDOMNode(dom)).removeClass('loading');
			$(React.findDOMNode(dom)).addClass('error');

			if(error.status === 400)
				Validation.afterErrorsDiv(dom, error.messages);
		}.bind(this))
	}
}

module.exports = Controller;