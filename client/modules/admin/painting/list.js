var React = require('react');
var PaintingController = require('controllers/admin/painting.js');
var Config = require('config');
var Pagination = require('components/pagination');
var Dialog = require('components/dialog');

var List = React.createClass({
	offset: 0,
	limit: 10,
	undeleted_row: null,
	search: {
		name: null
	},
	contextTypes: {
		router: React.PropTypes.func
	},
	getInitialState: function(){
		return {
			list: [],
			count: 0
		}
	},
	componentDidMount: function(){
		PaintingController.listPainting(this);
	},
	onClickAdd: function(){
		this.context.router.transitionTo('admin_painting_add');
	},
	onClickPage: function(page){
		PaintingController.onClickPage(this, page);
	},
	onEnterName: function(event){
		PaintingController.onEnterName(this, event);
	},
	goToEdit: function(poem, event){
		this.context.router.transitionTo('admin_poems_edit', {id: poem.id});
	},
	openRemoveDialog: function(row, event){
		this.undeleted_row = row;
		this.refs.remove_dialog.open();
	},
	onClickRemoveDialog: function(action){
		PaintingController.onRemove(this, action);
	},
	render: function(){
		var paginate_display = (this.state.count > 0) ? 'block' : 'none';

		return (
			<div className="ui grid">
				<Dialog header="Thông báo" ref="remove_dialog">
					<div className="ui grid">
						<div className="sixteen wide column">
							<p>Bạn có thật sự muốn xóa bài thơ này không ?</p>
						</div>
						<div className="sixteen wide column">
							<div className="ui small positive button" onClick={this.onClickRemoveDialog.bind(this, 'yes')}>Có</div>
							<div className="ui small negative button" onClick={this.onClickRemoveDialog.bind(this, 'no')}>Không</div>
						</div>
					</div>
				</Dialog>
				<div className="row">
					<div className="column">
						<div className="ui positive button" onClick={this.onClickAdd}>Thêm tranh</div>
						<span style={{float: 'right', display: paginate_display}}>
							<Pagination count={this.state.count} 
								countData={this.state.list.length} onClickPage={this.onClickPage}/>
						</span>
					</div>
				</div>
				<div className="row">
					<div className="column">
						<div className="ui small form">
							<div className="three fields">
								<div className="field">
									<label>Tên tranh</label>
									<input type="text" placeholder="Tên tranh" onKeyDown={this.onEnterName}/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="column">
						<div className="ui basic segment" style={{padding: 0}} ref="table_list" ref="card_list">
							<div className="ui cards" ref="card_list">
								{
									this.state.list.map(function(row, index){
										return (
											<div className="card" key={index}>
												<div className="image">
													<img src={row.image}/>
												</div>
												<div className="content">
													<div className="header">
														{row.name}
													</div>
												</div>
												<div className="extra content">
											      	<div className="ui two buttons">
											        	<div className="ui green button">Sửa</div>
											        	<div className="ui red button">Xóa</div>
											      </div>
											    </div>
											</div>
										)
									}, this)
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = List;