var React = require('react');

var Validation = {
	beforeErrorsDiv: function(dom){
		var div = $(React.findDOMNode(dom));
		div.find('.field').removeClass('error');
		div.find('.pointing').remove();
	},
	afterErrorsDiv: function(dom, errors){
		for(var i = 0; i < errors.length; i++){
			var error = errors[i];
			var id = $('#'+dom.id_pre+error.field);
			var label = '<div class="ui red pointing label">'+error.message+'</div>';

			id.closest('div.field').addClass('error');
			id.closest('div.field').append(label);
		}
	}
}

module.exports = Validation;