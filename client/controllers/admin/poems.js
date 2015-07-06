var React = require('react');
var PoemsService = require('services/poems');
var Validation = require('components/validation');
var Config = require('config');
var is = require('is_js');

var Controller = {
	loadDetail: function(dom, id){
		var postData = {id: id};
		$(React.findDOMNode(dom)).addClass('loading');

		PoemsService.detail(postData)
		.then(function(response){
			if(dom.isMounted()){
				$(React.findDOMNode(dom)).removeClass('loading');
				$('#'+dom.id_pre+'name').val(response.data.name);
				dom.author = {
					id: response.data.author_id,
					name: response.data.author_name
				},
				$('#'+dom.id_pre+'description').val(response.data.description);
				dom.refs.content_editor.setHTML(response.data.content);
				dom.refs.poem_type.setValue(response.data.type);
				dom.forceUpdate();
			}
		}, function(error){

		})
	},
	listPoems: function(dom){
		var postData = {limit: dom.limit, offset: dom.offset, search: dom.search};
		$(React.findDOMNode(dom.refs.table_list)).addClass('loading');

		PoemsService.list(postData)
		.then(function(response){
			if(dom.isMounted()){
				$(React.findDOMNode(dom.refs.table_list)).removeClass('loading');
				dom.setState({list: response.data, count: response.count});
			}
		}, function(error){
			
		})
	},
	onClickPage: function(dom, page){
		dom.offset = (page-1)*dom.limit;
		this.listPoems(dom);
	},
	onEnterName: function(dom, event){
		if(event.keyCode === 13){
			dom.search.name = event.target.value;
			dom.offset = 0;
			this.listPoems(dom);
		}
	},
	resetForm: function(dom){
		$('#'+dom.id_pre+'name').val('');
		dom.author = {
			id: null,
			name: 'Chưa có'
		},
		dom.refs.content_editor.reset();
		$('#'+dom.id_pre+'description').val('');
		dom.forceUpdate();
	},
	getInputsValue: function(dom){
		var user_id = null;

		if(Cookies.get('admin_user')){
			var admin_user = JSON.parse(Cookies.get('admin_user'));
			user_id = admin_user.id;
		}

		var name = $('#'+dom.id_pre+'name').val();
		var type = dom.refs.poem_type.getValue();
		var description = $('#'+dom.id_pre+'description').val();
		var content = dom.refs.content_editor.getHTML();
		var author_id = dom.author.id;
		var now = moment().tz(Config.serverTimezone).format('YYYY-MM-DD HH:mm:ss');
		var created_at = updated_at = now;

		return {
			name: name, content: content, description: description, author_id: author_id, type: type,
			created_at: created_at, updated_at: updated_at, created_by: user_id, updated_by: user_id
		}
	},
	beforeSubmit: function(dom){
		$(React.findDOMNode(dom)).removeClass('error');
		$(React.findDOMNode(dom)).addClass('loading');
		Validation.beforeErrorsDiv(dom);
	},
	onClickSubmit: function(dom){
		this.beforeSubmit(dom);
		var postData = this.getInputsValue(dom);

		PoemsService.add(postData)
		.then(function(response){
			$(React.findDOMNode(dom)).removeClass('loading');
			this.resetForm(dom);
			dom.context.router.transitionTo('admin_poems_list');
		}.bind(this), function(error){
			$(React.findDOMNode(dom)).removeClass('loading');
			$(React.findDOMNode(dom)).addClass('error');

			if(error.status === 400)
				Validation.afterErrorsDiv(dom, error.messages);
		}.bind(this))
	},
	onClickEdit: function(dom){
		this.beforeSubmit(dom);
		var postData = this.getInputsValue(dom);
		postData.id = dom.props.params.id;

		PoemsService.edit(postData)
		.then(function(response){
			$(React.findDOMNode(dom)).removeClass('loading');
			dom.context.router.transitionTo('admin_poems_list');
		}.bind(this), function(error){
			$(React.findDOMNode(dom)).removeClass('loading');
			$(React.findDOMNode(dom)).addClass('error');

			if(error.status === 400)
				Validation.afterErrorsDiv(dom, error.messages);
		}.bind(this))
	},
	onRemove: function(dom, action){
		if(action === 'yes'){
			var postData = {id: dom.undeleted_row.id};

			PoemsService.delete(postData)
			.then(function(deleted){
				this.listPoems(dom);
			}.bind(this), function(error){

			})
		}

		dom.refs.remove_dialog.close();
	}
}

module.exports = Controller;