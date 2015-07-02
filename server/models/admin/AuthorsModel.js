var is = require('is_js');
var extend = require('extend');

var Model = {
	require_fields: [
		{field: 'name', message: 'Bắt buộc nhập'}
	],
	server_same_fields: [{field: 'name', message: 'Tác giả đã có rồi'}],
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