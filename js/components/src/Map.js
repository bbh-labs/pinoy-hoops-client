'use strict'

import React from 'react'
import { Link } from 'react-router'
import browserHistory from './browserHistory'

import API from './API'
import Dispatcher from './Dispatcher'

class Map extends React.Component {
	render() {
		return (
			<div className='site-wrap'>
				<MapView />
				 <div className='map-btn'>
					<div className='bottom-left'>
						<img src='images/search.jpg' />
					</div>
					<div className='bottom-right'>
						<img src='images/location.jpg' />
					</div>
				</div>
			</div>
		)
	}
}

class MapView extends React.Component {
	render() {
		return (
			<div id='map'></div>
		)
	}
	componentDidMount() {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 13,
			scrollwheel: false,
			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(14.5980, 120.9446), // Manila

			// How you would like to style the map. 
			// This is where you would paste any style found on Snazzy Maps.
			styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#e8e7e7"},{"lightness":20}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#ff0000"},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ff0000"},{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#353537"},{"lightness":17}]}]
		};

		// Create the Google Map using our element and options defined above
		this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

		this.getHoops();

		this.dispatcherID = Dispatcher.register((payload) => {
			switch (payload.type) {
			case 'get-hoops':
				this.getHoops();
				break;

			case 'get-nearby-hoops':
				this.getNearbyHoops();
				break;

			case 'get-popular-hoops':
				this.getPopularHoops();
				break;

			case 'get-latest-hoops':
				this.getLatestHoops();
				break;
			}
		});
	}
	componentWillUnmount() {
		this.map = null;

		Dispatcher.unregister(this.dispatcherID);
	}
	getHoops = (data) => {
		API.getHoops(data, (hoops) => {
			this.setHoops(hoops);
		}, (response) => {
			alert('Failed to get hoops');
		});
	}
	getNearbyHoops = (data) => {
		API.getNearbyHoops(data, (hoops) => {
			this.setHoops(hoops);
		}, (response) => {
			alert('Failed to get hoops');
		});
	}
	getPopularHoops = (data) => {
		API.getPopularHoops(data, (hoops) => {
			this.setHoops(hoops);
		}, (response) => {
			alert('Failed to get hoops');
		});
	}
	getLatestHoops = (data) => {
		API.getLatestHoops(data, (hoops) => {
			this.setHoops(hoops);
		}, (response) => {
			alert('Failed to get hoops');
		});
	}
	setHoops = (hoops) => {
		this.clearHoops();

		if (hoops) {
			for (let i in hoops) {
				let hoop = hoops[i];

				let marker = new google.maps.Marker({
					position: new google.maps.LatLng(hoops[i].latitude, hoops[i].longitude),
					map: this.map,
					title: hoops[i].name,
				});
				marker.addListener('click', function() {
					browserHistory.push('/hoop/' + hoop.id);
					Dispatcher.dispatch({ type: 'view-hoop', hoop: hoop });
				});

				this.markers.push(marker);
			}
		}
	}
	clearHoops = () => {
		for (let i in this.markers)
			this.markers[i].setMap(null);

		this.markers = [];
	}
	handleSearch = (event) => {
		event.preventDefault();

		let name = event.target.value;
		if (name.length > 0)
			this.getHoops({ name: name });
		else
			this.getHoops();
	}
}

module.exports = Map;
