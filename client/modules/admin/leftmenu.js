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
			<div className="ui left fixed inverted vertical menu">
				<div className="item">
					<img className="ui tiny centered circular image" src="images/logo.jpg"/>
				</div>
				<div className="item">
					<div className="ui small icon input">
						<input type="text" placeholder="Tìm kiếm..."/>
						<i className="search icon"/>
					</div>
				</div>
				<a className="item" onClick={this.onClickHome}>
					<i className="home icon"/>
					Trang chủ
				</a>
				<a className="item" onClick={this.onClickAuthor}>
					<i className="student icon"/>
					Tác giả
				</a>
				<a className="item" onClick={this.onClickPoem}>
					<i className="leaf icon"/>
					Thơ ca
				</a>
				<a className="item" onClick={this.onClickPainting}>
					<i className="file image outline icon"/>
					Tranh vẽ
				</a>
			</div>
		);
	}
});

module.exports = LeftMenu;