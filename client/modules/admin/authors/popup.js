var React = require('react');
var AuthorsController = require('controllers/admin/authors.js');
var Config = require('config');

var Popup = React.createClass({
	propTypes: {
		onClickRow: React.PropTypes.func
	},
	contextTypes: {
		router: React.PropTypes.func
	},
	getInitialState: function(){
		return {
			list: []
		}
	},
	componentWillMount: function(){
		AuthorsController.listAuthors(this);
	},
	onClickRow: function(row, event){
		this.props.onClickRow(row);
	},
	render: function(){
		return (
			<div className="ui grid">
				<div className="row">
					<div className="column">
						<table className="ui table">
							<thead>
								<tr>
									<th>Tên tác giả</th>
									<th>Ngày tạo</th>
								</tr>
							</thead>
							<tbody>
							{
								this.state.list.map(function(row, index){
									return (
										<tr onClick={this.onClickRow.bind(this, row)} key={index} style={{cursor: 'pointer'}}>
											<td>{row.name}</td>
											<td>{moment(row.created_at).tz(Config.clientTimezone).format('DD/MM/YYYY HH:mm:ss')}</td>
										</tr>
									)
								}, this)
							}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Popup;