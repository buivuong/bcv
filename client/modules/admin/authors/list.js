var React = require('react');
var AuthorsController = require('controllers/admin/authors.js');

var List = React.createClass({
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
	onClickAdd: function(){
		this.context.router.transitionTo('admin_authors_add');
	},
	render: function(){
		return (
			<div className="ui grid">
				<div className="row">
					<div className="column">
						<div className="ui positive button" onClick={this.onClickAdd}>Add Author</div>
					</div>
				</div>
				<div className="row">
					<div className="column">
						<div className="ui three column grid">
							{
								this.state.list.map(function(row, index){
									return (
										<div className="column" key={index}>
											<div className="ui fluid card">
												<a className="image">
													<img src="images/bcv.jpg" title="Bùi Chí Vinh"/>
												</a>
												<div className="content">
													<a className="header">{row.name}</a>
												</div>
												<div className="extra content">
													<span className="right floated" style={{cursor: 'pointer'}}>
														<i className="star icon"></i>
														Thêm ảnh
													</span>
													<span className="left floated" style={{cursor: 'pointer'}}>
														<i className="edit icon"></i>
														Sửa
													</span>
												</div>
											</div>
										</div>
									)
								})
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = List;