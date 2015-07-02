var is = require('is_js');
var extend = require('extend');

var Model = {
	require_fields: [
		{field: 'name', message: 'Bắt buộc nhập'},
		{field: 'email', message: 'Bắt buộc nhập'},
		{field: 'password', message: 'Bắt buộc nhập'}
	],
	compare_fields: [
		{field: 'password', message: 'Hai mật khẩu phải giống nhau'},
		{field: 'repeat_password', message: 'Hai mật khẩu phải giống nhau'}
	],
	email_field: {field: 'email', message: 'Phải nhập email chính xác'},
	min_field: {field: 'password', message: 'Mật khẩu phải ít nhất 6 ký tự'},
	server_same_fields: [{field: 'email', message: 'Email đã đăng ký rồi'}],
	server_name_exists: [{field: 'name', message: 'Tên người dùng chưa có'}],
	server_password_exists: [{field: 'password', message: 'Mật khẩu sai !!!'}],
	validation_compare_fields: function(post_fields){
		var error_fields = [];

		var password = '';
		for(var key in post_fields){
			var post_field = post_fields[key];
			if(key === 'password')
				password = post_field;
			else if(key === 'repeat_password'){
				if(is.not.equal(post_field, password)){
					error_fields = extend([], this.compare_fields);
				}
				break;
			}
		}

		return error_fields;
	},
	validation_email_fields: function(post_fields){
		var error_fields = [];

		for(var key in post_fields){
			var post_field = post_fields[key];
			if(key === this.email_field.field){
				if(is.not.email(post_field))
					error_fields.push(this.email_field);
				break;
			}

		}

		return error_fields;
	},
	validation_min_fields: function(post_fields){
		var error_fields = [];

		for(var key in post_fields){
			var post_field = post_fields[key];
			if(key === this.min_field.field){
				if(is.under(post_field.length, 6))
					error_fields.push(this.min_field);
				break;
			}

		}

		return error_fields;
	},
	validation_require_fields: function(post_require_fields){
		var error_fields = [];

		for(var i = 0; i < this.require_fields.length; i++){
			var require_field = this.require_fields[i];
			for(var key in post_require_fields){
				var post_require_field = post_require_fields[key];
				if(key === require_field.field){
					if(is.empty(post_require_field) || is.null(post_require_field))
						error_fields.push(require_field);
					break;
				}

			}

		}

		return error_fields;
	}
}

module.exports = Model;