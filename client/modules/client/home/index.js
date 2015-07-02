var React = require('react');
var Menu = require('modules/client/home/menu');
var Slideshow = require('components/slideshow');

var Home = React.createClass({
	slideshow: [],
	componentWillMount: function(){
		this.slideshow.push({title: '1', description: '1', img: '1.jpg'});
		this.slideshow.push({title: '2', description: '2', img: '2.jpg'});
		this.slideshow.push({title: '3', description: '3', img: '3.jpg'});
	},
	render: function(){
		return (
			<div className="ui page grid">
				<div className="row" style={{paddingBottom: 0}}>
					<div className="center aligned column">
						<div className="ui segment">
							<h3>Bùi Chí Vinh</h3>
							<i>Nhà thơ & Nhà văn & Họa sĩ</i>
						</div>
					</div>
				</div>
				<div className="row" style={{paddingTop: 0, paddingBottom: 0}}>
					<div className="column">
						<Menu/>
					</div>
				</div>
				<div className="row" style={{paddingTop: 0, paddingBottom: 0}}>
					<div className="column">
						<div className="ui segment" style={{padding: 0}}>
							<Slideshow content={this.slideshow}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Home;