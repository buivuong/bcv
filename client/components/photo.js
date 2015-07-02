var React = require('react');

var Photo = React.createClass({
	id_pre: 'photo_upload',
	photos: [],
	getInitialState: function(){
		return {
			pre_photos: []
		}
	},
	componentDidMount: function(){
		var dom = React.findDOMNode(this.refs.file);

		$(dom).change(function(event){
			if(dom.files){
				this.photos = $.extend([], dom.files);

				this.photos.map(function(photo, index){
					var reader = new FileReader();
					reader.onload = function(event){
						var temp = $.extend([], this.state.pre_photos);

						temp.push(event.target.result);
						
						this.setState({pre_photos: $.extend([], temp)});
					}.bind(this)
					reader.readAsDataURL(photo);
				}, this)
			}
		}.bind(this));
	},
	render: function(){
		return (
			<div className="ui grid">
				<div className="row">
					<div className="column">
						<button className="ui green button" onClick={this.onClickSubmit}>Thêm ảnh</button>
					</div>
				</div>
				<div className="row">
					<div className="column">
						<div className="ui doubling cards">
							<div className="card">
								<input type="file" ref="file" style={{display: 'none'}} multiple={true} capture={true} accept="image/*" id={this.id_pre}/>
								<label className="image" htmlFor={this.id_pre} style={{cursor: 'pointer'}}>
						        	<img src="images/photo_upload.png" style={{height: '250px'}}/>
						      	</label>
						      	<div className="content">
									<div className="header">
										Chọn một hoặc nhiều ảnh
									</div>
								</div>
							</div>
							{
								this.state.pre_photos.map(function(photo, index){
									var html = (
										<div className="card" key={index}>
											<div className="image">
												<img src={photo} style={{height: '250px'}}/>
											</div>
											<div className="content">
												<div className="ui small fluid input">
													<input type="text" placeholder="Nhập tên"/>
												</div>
											</div>
										</div>
									);
									return html;
								})
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Photo;