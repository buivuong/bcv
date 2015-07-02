var React = require('react');
var Router = require('react-router');
var AuthMixin = require('mixins/AuthMixin');
var LeftMenu = require('modules/admin/leftmenu');

var RouteHandler = Router.RouteHandler;

var LoggedIn = React.createClass({
	mixins: [AuthMixin],
	render: function(){
		return (
			<div className="ui page grid">
				<div className="row">
					<div className="three wide column">
						<LeftMenu/>
					</div>
					<div className="thirteen wide column">
						<RouteHandler/>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = LoggedIn;