var React = require('react');
var Router = require('react-router');
var AuthMixin = require('mixins/AuthMixin');
var LeftMenu = require('modules/admin/leftmenu');

var RouteHandler = Router.RouteHandler;

var LoggedIn = React.createClass({
	mixins: [AuthMixin],
	render: function(){
		return (
			<div className="ui fluid container">
				<LeftMenu/>
				<div style={{marginLeft: '16rem', marginRight: '1rem'}}>
					<RouteHandler/>
				</div>
			</div>
		);
	}
});

module.exports = LoggedIn;