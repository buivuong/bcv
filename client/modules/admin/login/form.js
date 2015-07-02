var React = require('react');
var LoginController = require('controllers/admin/login.js');

var Form = React.createClass({
	id_pre: 'admin_login_',
	contextTypes: {
		router: React.PropTypes.func
	},
	onKeyDownForm: function(event){
		if(event.keyCode === 13)
			this.onClickSubmit();
	},
	onClickSubmit: function(){
		LoginController.onClickSubmit(this);
	},
	render: function(){
		return (
			<div className="ui form segment" onKeyDown={this.onKeyDownForm}>
				<h2 className="ui center aligned icon header">
					<i className="circular map marker icon"></i>
			  		Đăng nhập
				</h2>
				<div className="field">
					<div className="ui left icon input">
						<input type="text" placeholder="Tên người dùng" id={this.id_pre+'name'}/>
						<i className="user icon"></i>
					</div>
				</div>
				<div className="field">
					<div className="ui left icon input">
						<input type="password" placeholder="Mật khẩu" id={this.id_pre+'password'}/>
						<i className="lock icon"></i>
					</div>
				</div>
				<div className="field">
					<button className="ui fluid green button" onClick={this.onClickSubmit}>Đăng nhập</button>
				</div>
			</div>
		);
	}
});

module.exports = Form;