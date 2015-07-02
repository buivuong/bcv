var is = require('is_js');

var Function = {
	generateRandomString: function(len){
		var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < len; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	},
	execEmpty: function(value){
		if(is.empty(value) || is.null(value))
			return '';
		else return value;
	}
}

module.exports = Function;