var React = require('react');

var Pagination = React.createClass({
	firstPage: 0,
	lastPage: 0,
	pages: 0,
	count: 0,
	currentPage: 1,
	propTypes: {
		count: React.PropTypes.number,
		countData: React.PropTypes.number,
		displayPage: React.PropTypes.number,
		onClickPage: React.PropTypes.func
	},
	getInitialState: function(){
		return {
			countArray: []
		}
	},
	getDefaultProps: function(){
		return {
			displayPage: 4,
			count: 0,
			countData: 0,
			currentPage: 1
		}
	},
	componentWillReceiveProps: function(nextProps){
		if(nextProps.count !== this.count){
			this.count = nextProps.count;
			var pages = this.pages = Math.ceil(nextProps.count/nextProps.countData);
			var countArray = [];
			
			this.firstPage = 1;
			this.currentPage = 1;

			if(pages <= this.props.displayPage){
				for(var i = 1; i <= pages; i++)
					countArray.push(i);
				this.lastPage = pages;
			}else{
				for(var i = 1; i <= this.props.displayPage; i++)
					countArray.push(i);
				countArray.push(-1);
				this.lastPage = this.props.displayPage;
			}

			this.setState({countArray: $.extend([], countArray)});
		}
	},
	onClickExtendItems: function(index, event){
		if(index === -1){
			var countArray = [];

			countArray.push(-2);

			var diff = this.pages-this.lastPage;

			if(diff < this.props.displayPage){
				this.firstPage = this.lastPage;

				for(var i = this.lastPage; i <= this.pages; i++)
					countArray.push(i);
				this.lastPage = this.pages;
			}else{
				this.firstPage = this.lastPage;
				this.lastPage = this.firstPage+this.props.displayPage-1;

				for(var i = this.firstPage; i <= this.lastPage; i++)
					countArray.push(i);
			}

			if(this.lastPage < this.pages)
				countArray.push(-1);
			
			this.setState({countArray: $.extend([], countArray)});
		}else if(index === -2){
			var countArray = [];

			this.lastPage = this.firstPage;
			this.firstPage = this.lastPage-this.props.displayPage+1;

			if(this.firstPage !== 1)
				countArray.push(-2);

			for(var i = this.firstPage; i <= this.lastPage; i++)
				countArray.push(i);

			countArray.push(-1);

			this.setState({countArray: $.extend([], countArray)});
		}
	},
	onClickPage: function(page, event){
		this.currentPage = page;
		this.forceUpdate();
		this.props.onClickPage(page);
	},
	render: function(){
		return (
			<div className="ui small pagination menu">
				{
					this.state.countArray.map(function(page, index){
						var html = null;
						if(page === -1)
							var html = (
								<a className="item" key={index} onClick={this.onClickExtendItems.bind(this, -1)}>
									...
								</a>
							)
						else if(page === -2)
							var html = (
								<a className="item" key={index} onClick={this.onClickExtendItems.bind(this, -2)}>
									...
								</a>
							)
						else{
							var className = (page === this.currentPage) ? 'active item': 'item';

							var html = (
								<a className={className} key={index} onClick={this.onClickPage.bind(this, page)}>
									{page}
								</a>
							)
						}

						return html;
					}, this)
				}
			</div>
		)
	}
});

module.exports = Pagination;