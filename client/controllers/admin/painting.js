var React = require('react');
var PaintingService = require('services/painting');
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
				dom.forceUpdate();
			}
		}, function(error){

		})
	},
	listPainting: function(dom){
		var postData = {limit: dom.limit, offset: dom.offset, search: dom.search};
		$(React.findDOMNode(dom.refs.card_list)).addClass('loading');

		PaintingService.list(postData)
		.then(function(response){
			if(dom.isMounted()){
				$(React.findDOMNode(dom.refs.card_list)).removeClass('loading');
				dom.setState({list: response.data, count: response.count});
			}
		}, function(error){
			
		})
	},
	onClickPage: function(dom, page){
		dom.offset = (page-1)*dom.limit;
		this.listPainting(dom);
	},
	onEnterName: function(dom, event){
		if(event.keyCode === 13){
			dom.search.name = event.target.value;
			dom.offset = 0;
			this.listPainting(dom);
		}
	},
	resetForm: function(dom){
		$('#'+dom.id_pre+'name').val('');
		dom.author = {
			id: '',
			name: 'Chưa có'
		},
		dom.refs.content_editor.reset();
		$('#'+dom.id_pre+'description').val('');
		dom.forceUpdate();
	},
	getInputsValue: function(dom){
		var data = new FormData();

		if(Cookies.get('admin_user')){
			var admin_user = JSON.parse(Cookies.get('admin_user'));
			user_id = admin_user.id;
		}

		var now = moment().tz(Config.serverTimezone).format('YYYY-MM-DD HH:mm:ss');
		var created_at = updated_at = now;

		var photo = dom.refs.avatar.getAvatar();
		var name = $('#'+dom.id_pre+'name').val();
		var author_id = dom.author.id;
		var description = $('#'+dom.id_pre+'description').val();
		var content = dom.refs.content_editor.getHTML();

		data.append('image', photo);
		data.append('name', name);
		data.append('author_id', author_id);
		data.append('description', description);
		data.append('content', content);
		data.append('user_id', user_id);
		data.append('current_date', created_at);		

		return data;
	},
	beforeSubmit: function(dom){
		$(React.findDOMNode(dom)).removeClass('error');
		$(React.findDOMNode(dom)).addClass('loading');
		Validation.beforeErrorsDiv(dom);
	},
	onClickSubmit: function(dom){
		this.beforeSubmit(dom);
		var postData = this.getInputsValue(dom);

		PaintingService.add(postData)
		.then(function(response){
			$(React.findDOMNode(dom)).removeClass('loading');
			this.resetForm(dom);
			dom.context.router.transitionTo('admin_painting_list');
		}.bind(this), function(error){
			$(React.findDOMNode(dom)).removeClass('loading');
			$(React.findDOMNode(dom)).addClass('error');
			if(error.status === 400){
				if(is.not.array(error.messages))
					dom.refs.image_error_dialog.open();
				else
					Validation.afterErrorsDiv(dom, error.messages);
			}
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