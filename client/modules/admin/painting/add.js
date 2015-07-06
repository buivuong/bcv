var React = require('react');
var PaintingController = require('controllers/admin/painting.js');
var Avatar = require('components/avatar');
var TextEditor = require('components/text_editor');
var Dialog = require('components/dialog');
var AuthorPopup = require('modules/admin/authors/popup');

var Form = React.createClass({
	id_pre: 'admin_painting_add_',
	author: '',
	contextTypes: {
		router: React.PropTypes.func
	},
	componentWillMount: function(){
		this.author = {id: '', name: 'Chưa có'};
	},
	onClickSubmit: function(){
		PaintingController.onClickSubmit(this);
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
			<div className="ui grid">
				<Dialog header="Chọn tác giả" ref="author_dialog">
					<AuthorPopup onClickRow={this.onClickRowAuthor}/>
				</Dialog>
				<Dialog header="Thông báo lỗi" ref="image_error_dialog">
					<p>Ảnh chưa chọn. Mời bạn chọn ảnh rồi thêm lại</p>
				</Dialog>
				<div className="row">
					<div className="column">
						<button className="ui green button" onClick={this.onClickSubmit}>Thêm tranh</button>
					</div>
				</div>
				<div className="two column row">
					<div className="column">
						<Avatar ref="avatar"/>
					</div>
					<div className="column">
						<div className="ui form">
							<div className="required field">
								<label>Tên tranh</label>
								<input type="text" placeholder="Tên bài thơ" id={this.id_pre+'name'}/>
							</div>
							<div className="required field">
								<label>Chọn tác giả</label>
								<button className="ui fluid button" onClick={this.onClickAuthor} id={this.id_pre+'author_id'}>
									{this.author.name}
								</button>
							</div>
							<div className="field">
								<label>Mô tả ngắn</label>
								<textarea placeholder="Mô tả ngắn về tranh" id={this.id_pre+'description'}/>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="column">
						<div className="ui form">
							<div className="field">
								<label>Mô tả chi tiết</label>
								<TextEditor placeholder="Mô tả chi tiết tranh vẽ" ref="content_editor"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Form;