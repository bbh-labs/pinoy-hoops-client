'use strict'

import React from 'react'
import { Link } from 'react-router'
import browserHistory from './browserHistory'

import API from './API'
import Dispatcher from './Dispatcher'

class Map extends React.Component {
	render() {
		let user = this.props.user;

		return (
				<div className='map-wrapper'>
					<MapView user={ user } />
					<Overlay />
				</div>
		)
	}
}

class MapView extends React.Component {
	render() {
		return <div id='map'></div>
	}
	componentDidMount() {
		let user = this.props.user;

		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			zoom: 13,
			scrollwheel: true,
			center: new google.maps.LatLng(14.5980, 120.9446), // Manila
			styles: MAP_STYLE,
		};

		// Create the Google Map using our element and options defined above
		this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

		this.map.addListener('click', (event) => {
			if (user) {
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
			} else {
				browserHistory.push('/login');
			}
		});

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

				let image = {
					url: hoops[i].data.featured_story.image_url,
					scaledSize: new google.maps.Size(64, 64),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(0, 64),
				};

				let marker = new google.maps.Marker({
					position: new google.maps.LatLng(hoops[i].latitude, hoops[i].longitude),
					map: this.map,
					title: hoops[i].name,
					icon: image,
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
		let name = event.target.value;

		event.preventDefault();

		if (name.length > 0)
			this.getHoops({ name: name });
		else
			this.getHoops();
	}
}

class Overlay extends React.Component {
	render() {
		let latlng = this.state.latlng;
		if (latlng)
			return (
				<form id="addhoop" onSubmit={ this.submit } enctype='multipart/form-data' >
					<h2>Tell us about the hoop</h2>
					<input type='text' name='name' placeholder="Hoop Name" /><br/>
					<textarea rows="4" cols="50"  name='description' placeholder="description"/><br/>
					<div className="hoopcategory">
						<h5>Submit your hoop photos under below categories(Mininum one)</h5>
						<label className=".col-xs-12 col-md-4" htmlFor='hoop-image-input'>
							<img ref='hoopImage' src="images/hoop.jpg"/>
							<input id='hoop-image-input' type='file' name='hoop-image' accept='image/*' onChange={ this.previewImage } />
						</label>
						<label className=".col-xs-12 col-md-4" htmlFor='court-image-input'>
							<img ref='courtImage' src="images/court.jpg"/>
							<input id='court-image-input' type='file' name='court-image' accept='image/*' onChange={ this.previewImage } />
						</label>
						<label className=".col-xs-12 col-md-4" htmlFor='crew-image-input'>
							<img ref='crewImage' src="images/crew.jpg"/>
							<input id='crew-image-input' type='file' name='crew-image' accept='image/*' onChange={ this.previewImage } />
						</label>
						<button type='submit'>DONE</button>
					</div>
					<input type='hidden' name='latitude' value={ latlng.lat } />
					<input type='hidden' name='longitude' value={ latlng.lng } />
				</form>
			)
		else
			return null;
	}
	state = {
		latlng: null,
	}
	componentDidMount() {
		this.dispatcherID = Dispatcher.register((payload) => {
			switch (payload.type) {
			case 'map-click':
				let lat = payload.latlng.lat();
				let lng = payload.latlng.lng();
				this.setState({ latlng: { lat: lat, lng: lng } });
				break;
			}
		});
	}
	componentWillUnmount() {
		Dispatcher.unregister(this.dispatcherID);
	}
	previewImage = (event) => {
		let preview;
		let file = event.target.files[0];
		let reader = new FileReader();

		switch (event.target.id) {
		case 'hoop-image-input':
			preview = this.refs.hoopImage;
			break;

		case 'court-image-input':
			preview = this.refs.courtImage;
			break;

		case 'crew-image-input':
			preview = this.refs.crewImage;
			break;
		}

		reader.addEventListener('load', function() {
			preview.src = reader.result;
		});

		if (file)
			reader.readAsDataURL(file);
	}
	submit = (event) => {
		let latlng = this.state.latlng;

		event.preventDefault();

		if (!latlng) {
			alert('You must pick a location!');
			return;
		}

		API.addHoop(new FormData(event.target), () => {
			alert('Successfully added hoop!');
			this.setState({ latlng: null });
			Dispatcher.dispatch({ type: 'get-hoops' });
			Dispatcher.dispatch({ type: 'get-activities' });
			browserHistory.replace('/map');
		}, (response) => {
			this.setState({ latlng: null });
			alert(response.statusText);
		});
	}
}

module.exports = Map;
