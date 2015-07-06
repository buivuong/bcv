var React = require('react');

var Avatar = React.createClass({
	id_pre: 'avatar_photo',
	image: '',
	getInitialState: function(){
		return {
			image: 'images/empty_gallery.png'
		}
	},
	componentDidMount: function(){
		var dom = React.findDOMNode(this.refs.file);

		$(dom).change(function(event){
			if(dom.files && dom.files[0]){
				var reader = new FileReader();
				reader.onload = function(event){
					this.setState({image: event.target.result});
				}.bind(this)
				reader.readAsDataURL(dom.files[0]);
				this.image = dom.files[0];
			}
		}.bind(this));
	},
	getAvatar: function(){
		return this.image;
	},
	render: function(){
		return (
			<div className="ui card">
				<div className="image">
					<input type="file" ref="file" style={{display: 'none'}} capture={true} accept="image/*" id={this.id_pre}/>
					<label className="image" htmlFor={this.id_pre} style={{cursor: 'pointer'}}>
			        	<img src={this.state.image} style={{height: '250px', width: '100%'}}/>
			      	</label>
				</div>
				<div className="content">
					<div className="header">
						Chọn một ảnh
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Avatar;