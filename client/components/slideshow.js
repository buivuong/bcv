var React = require('react');

var Slideshow = React.createClass({
	root: null,
	propTypes: {
		content: React.PropTypes.array
	},
	componentDidMount: function(){
		var elementRoot = $(React.findDOMNode(this));

		this.root = elementRoot.slick({
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2500
		});
	},
	render: function(){
		return (
			<div>
				{
					this.props.content.map(function(row, index){
						return (
							<div className="ui two column grid" key={index} style={{marginTop: '-14px'}}>
								<div className="four wide column" style={{padding: '22px'}}>
									<h4>{row.title}</h4>
									<p>{row.description}</p>
								</div>
								<div className="twelve wide column">
									<img src={'images/slideshow/'+row.img} style={{width: '100%'}}/>
								</div>
							</div>
						);
					})
				}
			</div>
		);
	}
});

module.exports = Slideshow;