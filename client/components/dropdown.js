var React = require('react');

var Dropdown = React.createClass({
	root: null,
	propTypes: {
		idx: React.PropTypes.string,
		list: React.PropTypes.object,
		defaultText: React.PropTypes.string
	},
	getDefaultProps: function(){
		return {
			defaultText: 'Mời bạn chọn'
		}
	},
	componentDidMount: function(){
		var root = this.root = $(React.findDOMNode(this));

		this.root.dropdown();
	},
	setValue: function(value){
		this.root.dropdown('set selected', value);
	},
	getValue: function(){
		return this.root.dropdown('get value');
	},
	render: function(){
		var rows = [];
		for(var key in this.props.list){
			rows.push(<div className="item" data-value={key} key={key}>{this.props.list[key]}</div>);
		}
		
		return (
			<div className="ui search selection dropdown" id={this.props.idx}>
				<input type="hidden"/>
				<i className="dropdown icon"></i>
				<div className="default text">{this.props.defaultText}</div>
				<div className="menu">{rows}</div>
			</div>
		)
	}
});

module.exports = Dropdown;