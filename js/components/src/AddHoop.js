'use strict'

import React from 'react';
import { Link } from 'react-router';
import browserHistory from './browserHistory'

import API from './API'
import Dispatcher from './Dispatcher'

class AddHoop extends React.Component {
	render() {
		let latlng = this.state.latlng;

		return (
			<div className='site-wrap'>
				 <form className='addhoop' onSubmit={ this.submit }>
					<MapView onDoubleClick={ this.setCoordinate } />
					<div className='content'>
						<h3>Double tap on the map to add a hoop</h3>
						<div>
							<label>Hoop name: </label><input type='text' name='name' /><br/>
							<label>Hoop description: </label><textarea rows='6' cols='20' name='description'/><br/>
							<label>Upload picture: </label>
							<label htmlFor='upload-image'>Select file
								<input id='upload-image' type='file' name='image' accept='image/*' />
							</label><br/>
							<input type='hidden' name='latitude' value={ latlng ? latlng.lat : 0 } />
							<input type='hidden' name='longitude' value={ latlng ? latlng.lng : 0 } />
						</div>
					</div>
					<div className='submit'>
						<button onClick={ this.cancel }>Cancel</button>
						<button type='submit' style={{ backgroundColor: '#ff6b00' }}>Save</button>
					</div>
				 </form>
			</div>
		)
	}
	state = {
		latlng: null,
	}
	componentDidMount() {
		this.listenerID = Dispatcher.register((payload) => {
			switch (payload.type) {
			case 'map-click':
				this.setState({ latlng: { lat: payload.latlng.lat(), lng: payload.latlng.lng() } });
				break;
			}
		});
	}
	comonentWillUnmount() {
		Dispatcher.unregister(this.listenerID);
	}
	submit = (event) => {
		event.preventDefault();

		let latlng = this.state.latlng;
		if (!latlng) {
			alert('You must pick a location!');
			return;
		}

		API.addHoop(new FormData(event.target), () => {
			alert('Successfully added hoop!');
			Dispatcher.dispatch({ type: 'get-hoops' });
			Dispatcher.dispatch({ type: 'get-activities' });
			browserHistory.replace('/map');
		}, (response) => {
			alert(response.statusText);
		});
	}
	cancel() {
		browserHistory.replace('/map');
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
		this.map.addListener('click', (event) => {
			Dispatcher.dispatch({ type: 'map-click', latlng: event.latLng });
			
			if (this.marker) {
				this.marker.setMap(null);
				this.marker = null;
			}

			this.marker = new google.maps.Marker({
				position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
				map: this.map,
				title: 'Hoop',
			});
		});

		// Let's also add a marker while we're at it
		this.marker = new google.maps.Marker({
			position: new google.maps.LatLng(14.5980, 120.9446),
			map: this.map,
			title: 'Hoop',
		});
	}
	componentWillUnmount() {
		this.map = null;
		this.marker = null;
	}
}

module.exports = AddHoop;
