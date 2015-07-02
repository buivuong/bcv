var React = require('react');
var PoemsController = require('controllers/admin/poems.js');
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
		PoemsController.listPoems(this);
	},
	onClickAdd: function(){
		this.context.router.transitionTo('admin_poems_add');
	},
	onClickPage: function(page){
		PoemsController.onClickPage(this, page);
	},
	onEnterName: function(event){
		PoemsController.onEnterName(this, event);
	},
	goToEdit: function(poem, event){
		this.context.router.transitionTo('admin_poems_edit', {id: poem.id});
	},
	openRemoveDialog: function(row, event){
		this.undeleted_row = row;
		this.refs.remove_dialog.open();
	},
	onClickRemoveDialog: function(action){
		PoemsController.onRemove(this, action);
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
						<div className="ui positive button" onClick={this.onClickAdd}>Thêm bài thơ</div>
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
									<label>Tên bài thơ</label>
									<input type="text" placeholder="Tên bài thơ" onKeyDown={this.onEnterName}/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="column">
						<div className="ui basic segment" style={{padding: 0}} ref="table_list">
							<table className="ui table">
								<thead>
									<tr>
										<th>Tên bài thơ</th>
										<th>Ngày tạo</th>
										<th>Thao tác</th>
									</tr>
								</thead>
								<tbody>
								{
									this.state.list.map(function(row, index){
										return (
											<tr key={index}>
												<td>{row.name}</td>
												<td>{moment(row.created_at).tz(Config.clientTimezone).format('DD/MM/YYYY HH:mm:ss')}</td>
												<td>
													<a onClick={this.goToEdit.bind(this, row)}>Sửa&nbsp;|&nbsp;</a>
													<a onClick={this.openRemoveDialog.bind(this, row)}>Xóa</a>
												</td>
											</tr>
										)
									}, this)
								}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = List;