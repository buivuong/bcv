var React = require('react');

var Map = React.createClass({
	componentDidMount: function(){
		var root = React.findDOMNode(this);

		var map = L.map(root).setView([10.798607, 106.670589], 16);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    		attribution: 'Realtime VPM',
    		maxZoom: 18,
    		id: 'buivuong.b41aed35',
    		accessToken: 'pk.eyJ1IjoiYnVpdnVvbmciLCJhIjoiNWQ2ZjRjYjFkNjFjNTQ3MDZiYjdlM2JjMzhjMWE0ZDEifQ.pLUjgncKDorsGZlAU9p_MA#4/21.03/105.85'
		}).addTo(map);

		L.control.locate({
			strings: {
				title: 'Lấy vị trí của tôi',
				popup: "Bạn nằm trong khoảng {distance} {unit} từ vị trí hiện tại",
        		outsideMapBoundsMsg: "Bạn đã ra khỏi vị trí hiện tại"
			}
		}).addTo(map);

		var marker = L.marker([10.798607, 106.670589]).addTo(map);

	},
	render: function(){
		return (
			<div style={{height: '600px'}}></div>
		)
	}
});

module.exports = Map;