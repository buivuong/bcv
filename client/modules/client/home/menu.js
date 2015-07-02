var React = require('react');

var Menu = React.createClass({
	render: function(){
		return (
			<div className="ui menu">
				<a className="item">
					Trang chủ
				</a>
				<a className="item">
					Hội họa
				</a>
				<a className="item">
					Thơ
				</a>
				<a className="item">
					Tác phẩm văn chương
				</a>
			</div>
		);
	}
});

module.exports = Menu;