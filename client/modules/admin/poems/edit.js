var React = require('react');
var PoemsController = require('controllers/admin/poems.js');
var TextEditor = require('components/text_editor');
var Dialog = require('components/dialog');
var AuthorPopup = require('modules/admin/authors/popup');

var Form = React.createClass({
	id_pre: 'admin_poems_add_',
	author: null,
	contextTypes: {
		router: React.PropTypes.func
	},
	componentWillMount: function(){
		this.author = {id: null, name: 'Chưa có'};
	},
	componentDidMount: function(){
		PoemsController.loadDetail(this, this.props.params.id);
	},
	onClickSubmit: function(){
		PoemsController.onClickEdit(this);
	},
	onClickAuthor: function(){
		this.refs.author_dialog.open();
	},
	onClickRowAuthor: function(row){
		this.author.id = row.id;
		this.author.name = row.name;
		this.forceUpdate();
		this.refs.author_dialog.close();
	},
	render: function(){
		return (
			<div className="ui form">
				<Dialog header="Chọn tác giả" ref="author_dialog">
					<AuthorPopup onClickRow={this.onClickRowAuthor}/>
				</Dialog>

				<div className="field">
					<button className="ui green button" onClick={this.onClickSubmit}>Sửa bài thơ</button>
				</div>
				<div className="two fields">
					<div className="required field">
						<label>Tên bài thơ</label>
						<input type="text" placeholder="Tên bài thơ" id={this.id_pre+'name'}/>
					</div>
					<div className="required field">
						<label>Chọn tác giả</label>
						<button className="ui fluid button" onClick={this.onClickAuthor} id={this.id_pre+'author_id'}>
							{this.author.name}
						</button>
					</div>
				</div>
				<div className="field">
					<label>Nội dung bài thơ</label>
					<TextEditor placeholder="Bài thơ" ref="content_editor"/>
				</div>
				<div className="field">
					<label>Mô tả bài thơ</label>
					<textarea id={this.id_pre+'description'}></textarea>
				</div>
			</div>
		);
	}
});

module.exports = Form;