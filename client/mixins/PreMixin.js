var React = require('react');
var State = require('react-router').State;
var SecurityService = require('services/security');

var PreMixin = {
	contextTypes: {
		router: React.PropTypes.func
	},
	componentWillMount: function(){
		SecurityService.checkAuth()
		.then(function(response){
			this.context.router.transitionTo('admin_home');
		}.bind(this), function(error){})
	}
}

module.exports = PreMixin;