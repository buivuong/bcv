var React = require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;

var Template = React.createClass({
	render: function(){
		return (
			<div className="ui basic segment">
				<RouteHandler/>
			</div>
		);
	}
});

module.exports = Template;