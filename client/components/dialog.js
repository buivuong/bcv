var React = require('react');

var Dialog = React.createClass({
	root: null,
	propTypes: {
		header: React.PropTypes.string,
		size: React.PropTypes.string
	},
	getDefaultProps: function(){
		return {
			size: 'small'
		}
	},
	componentDidMount: function(){
		var root = this.root = $(React.findDOMNode(this));
	},
	open: function(){
		this.root.modal('show');
	},
	close: function(){
		this.root.modal('hide');
	},
	render: function(){
		return (
			<div className={"ui "+this.props.size+" modal"}>
  				<div className="header">
    				{this.props.header}
  				</div>
  				<div className="content">
  					{this.props.children}
  				</div>
			</div>
		)
	}
});

module.exports = Dialog;