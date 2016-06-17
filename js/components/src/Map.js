'use strict'

import React from 'react'
import { Link } from 'react-router'
import browserHistory from './browserHistory'

import API from './API'
import Dispatcher from './Dispatcher'

class Map extends React.Component {
	render() {
		let user = this.props.user;
		let latlng = this.state.latlng;
		let address = this.state.address;

		return (
				<div className='map-wrapper'>
					<MapView user={ user } clickMap={ this.clickMap } />
					<SearchBar />
					<AddHoop latlng={ latlng } address={ address } />
				</div>
		)
	}
	state = {
		latlng: null,
		address: null,
	}
	componentDidMount() {
		this.dispatcherID = Dispatcher.register((payload) => {
			switch (payload.type) {
			case 'map-click':
				this.setState({ latlng: payload.latlng });
				break;

			case 'set-address':
				this.setState({ address: payload.address });
				break;

			case 'close-AddHoop':
				this.setState({ latlng: null });
				break;
			}
		});
	}
	componentWillUnmount() {
		Dispatcher.unregister(this.dispatcherID);
	}
	clickMap = (latlng) => {
		this.setState({ latlng: latlng });
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

		// Create a reverse geocoder
		this.geocoder = new google.maps.Geocoder;

		this.map.addListener('click', (event) => {
			if (user) {
				let latlng = { lat: event.latLng.lat(), lng: event.latLng.lng() };

				this.props.clickMap(latlng);

				if (this.marker) {
					this.marker.setMap(null);
					this.marker = null;
				}

				this.marker = new google.maps.Marker({
					position: new google.maps.LatLng(latlng.lat, latlng.lng),
					map: this.map,
					title: 'Hoop',
				});

				this.geocoder.geocode({ location: latlng }, (results, status) => {
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[1])
							Dispatcher.dispatch({ type: 'set-address', address: results[1].formatted_address });
					}
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

			case 'search-hoops':
				this.searchHoops(payload.name);
				break;
			}
		});
	}
	componentWillUnmount() {
		this.map = null;
		this.geocoder = null;

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
				let featuredStories = hoops[i].data.featured_stories;
				let imageURL = featuredStories['hoop'] ? featuredStories['hoop'].image_url :
						featuredStories['court'] ? featuredStories['court'].image_url :
						featuredStories['crew'] ? featuredStories['crew'].image_url : null;

				let image = {
					url: imageURL,
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
	searchHoops = (name) => {
		if (name.length > 0)
			this.getHoops({ name: name });
		else
			this.getHoops();
	}
}

class SearchBar extends React.Component {
	render() {
			return (
				<div className="MapSearch">
					<img src="images/icon_locate.png"/>
					 <input type="text" placeholder="Search..." onChange={ this.handleSearch } required></input>
				</div>
			)
}
	handleSearch = (event) => {
		Dispatcher.dispatch({ type: 'search-hoops', name: event.target.value });
	}
}

class AddHoop extends React.Component {
	render() {
		let latlng = this.props.latlng;
		let address = this.props.address;

		if (latlng)
			return (
				<form id="addhoop" onSubmit={ this.submit } enctype='multipart/form-data' >
					<div className="close">
						<img src="images/close.png" onClick={ this.close } />
					</div>
					<h2>Tell us about the hoop</h2>
					{ address ? <h6>{ address }</h6> : null }
					<input type='text' name='name' placeholder="Hoop Name" /><br/>
					<textarea rows="4" cols="50"  name='description' placeholder="description"/><br/>
					<h5>Submit your hoop photos under below categories(Mininum one)</h5>
					<div className="hoopcategory">
						<label className=".col-xs-12 col-md-4" htmlFor='hoop-image-input'>
							<div ref='hoopImage' className="hoopupload"></div>
							<input id='hoop-image-input' type='file' name='hoop-image' accept='image/*' onChange={ this.previewImage } />
						</label>
						<label className=".col-xs-12 col-md-4" htmlFor='court-image-input'>
							<div ref='courtImage' className="courtupload"></div>
							<input id='court-image-input' type='file' name='court-image' accept='image/*' onChange={ this.previewImage } />
						</label>
						<label className=".col-xs-12 col-md-4" htmlFor='crew-image-input'>
							<div ref='crewImage' className="crewupload"></div>
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
			preview.style.backgroundImage = 'url(' + reader.result + ')';
		});

		if (file)
			reader.readAsDataURL(file);
	}
	submit = (event) => {
		let latlng = this.props.latlng;

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
	close = (event) => {
		Dispatcher.dispatch({ type: 'close-AddHoop' });
	}
}

module.exports = Map;
