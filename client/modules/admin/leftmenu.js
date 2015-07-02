var React = require('react');

var LeftMenu = React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},
	onClickHome: function(){
		this.context.router.transitionTo('admin_home');
	},
	onClickAuthor: function(){
		this.context.router.transitionTo('admin_authors');
	},
	onClickPoem: function(){
		this.context.router.transitionTo('admin_poems');
	},
	onClickPainting: function(){
		this.context.router.transitionTo('admin_painting');
	},
	render: function(){
		return (
			<div className="ui vertical menu">
				<a className="item" onClick={this.onClickHome}>
					Trang chủ
				</a>
				<a className="item" onClick={this.onClickAuthor}>
					Tác giả
				</a>
				<a className="item" onClick={this.onClickPoem}>
					Thơ ca
				</a>
				<a className="item" onClick={this.onClickPainting}>
					Tranh vẽ
				</a>
			</div>
		);
	}
});

module.exports = LeftMenu;