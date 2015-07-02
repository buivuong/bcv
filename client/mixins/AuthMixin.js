var React = require('react');
var State = require('react-router').State;
var SecurityService = require('services/security');

var AuthMixin = {
	contextTypes: {
		router: React.PropTypes.func
	},
	componentWillMount: function(){
		SecurityService.checkAuth()
		.then(function(response){
		}, function(error){
			this.context.router.transitionTo('admin_login');
		}.bind(this))
	}
}

module.exports = AuthMixin;