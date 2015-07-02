var React = require('react');
var Registration_Form = require('modules/admin/registration/form');
var PreMixin = require('mixins/PreMixin');

var Template = React.createClass({
	mixins: [PreMixin],
	render: function(){
		return (
			<div className="ui one column stackable center aligned page grid">
   				<div className="column six wide" style={{marginTop: '30px', textAlign: 'left'}}>
       				<Registration_Form/>
   				</div>
			</div>
		);
	}
});

module.exports = Template;