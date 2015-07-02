var React = require('react');
var AuthorsController = require('controllers/admin/authors.js');
var TextEditor = require('components/text_editor');

var Form = React.createClass({
	id_pre: 'admin_authors_add_',
	contextTypes: {
		router: React.PropTypes.func
	},
	onClickSubmit: function(){
		AuthorsController.onClickSubmit(this);
	},
	render: function(){
		return (
			<div className="ui form">
				<div className="field">
					<button className="ui green button" onClick={this.onClickSubmit}>Thêm tác giả</button>
				</div>
				<div className="field">
					<label>Tác giả</label>
					<input type="text" placeholder="Tác giả" id={this.id_pre+'name'}/>
				</div>
				<div className="field">
					<label>Tiểu sử</label>
					<TextEditor placeholder="Tiểu sử tác giả" ref="profile_editor"/>
				</div>
			</div>
		);
	}
});

module.exports = Form;