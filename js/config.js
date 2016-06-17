'use strict'

var MOCKUP = true;
var BASE_URL = 'http://localhost:8080';
//var BASE_URL = 'https://pinoy-hoops.bbh-labs.com.sg';

var MAP_STYLE = [

	{
			"featureType": "all",
			"elementType": "labels.text",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "administrative",
			"elementType": "all",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "administrative",
			"elementType": "labels",
			"stylers": [
					{
							"weight": "5.80"
					},
					{
							"visibility": "on"
					}
			]
	},
	{
			"featureType": "administrative.locality",
			"elementType": "geometry",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "administrative.locality",
			"elementType": "labels",
			"stylers": [
					{
							"visibility": "simplified"
					}
			]
	},
	{
			"featureType": "administrative.neighborhood",
			"elementType": "all",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "landscape",
			"elementType": "all",
			"stylers": [
					{
							"color": "#e5e8e7"
					},
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "landscape.man_made",
			"elementType": "geometry",
			"stylers": [
					{
							"visibility": "on"
					}
			]
	},
	{
			"featureType": "landscape.man_made",
			"elementType": "geometry.fill",
			"stylers": [
					{
							"color": "#ffffff"
					},
					{
							"visibility": "on"
					}
			]
	},
	{
			"featureType": "landscape.man_made",
			"elementType": "labels",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "landscape.natural",
			"elementType": "geometry",
			"stylers": [
					{
							"visibility": "on"
					}
			]
	},
	{
			"featureType": "landscape.natural",
			"elementType": "geometry.fill",
			"stylers": [
					{
							"color": "#f5f5f2"
					},
					{
							"visibility": "on"
					}
			]
	},
	{
			"featureType": "landscape.natural",
			"elementType": "labels",
			"stylers": [
					{
							"visibility": "on"
					}
			]
	},
	{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
					{
							"visibility": "on"
					}
			]
	},
	{
			"featureType": "poi",
			"elementType": "labels",
			"stylers": [
					{
							"visibility": "on"
					}
			]
	},
	{
			"featureType": "poi",
			"elementType": "labels.text",
			"stylers": [
					{
							"visibility": "on"
					}
			]
	},
	{
			"featureType": "poi",
			"elementType": "labels.icon",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "poi.attraction",
			"elementType": "all",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "poi.attraction",
			"elementType": "geometry",
			"stylers": [
					{
							"visibility": "on"
					}
			]
	},
	{
			"featureType": "poi.attraction",
			"elementType": "labels",
			"stylers": [
					{
							"visibility": "on"
					}
			]
	},
	{
			"featureType": "poi.business",
			"elementType": "all",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "poi.government",
			"elementType": "geometry",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "poi.medical",
			"elementType": "all",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "poi.park",
			"elementType": "all",
			"stylers": [
					{
							"color": "#91b65d"
					},
					{
							"gamma": 1.51
					}
			]
	},
	{
			"featureType": "poi.park",
			"elementType": "labels.icon",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "poi.place_of_worship",
			"elementType": "all",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "poi.school",
			"elementType": "all",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "poi.sports_complex",
			"elementType": "all",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "poi.sports_complex",
			"elementType": "geometry",
			"stylers": [
					{
							"color": "#c7c7c7"
					},
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "road",
			"elementType": "all",
			"stylers": [
					{
							"color": "#ffffff"
					}
			]
	},
	{
			"featureType": "road",
			"elementType": "labels",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [
					{
							"color": "#ffffff"
					},
					{
							"visibility": "simplified"
					}
			]
	},
	{
			"featureType": "road.highway",
			"elementType": "labels.icon",
			"stylers": [
					{
							"color": "#ffffff"
					},
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "road.arterial",
			"elementType": "all",
			"stylers": [
					{
							"visibility": "simplified"
					},
					{
							"color": "#ffffff"
					}
			]
	},
	{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
					{
							"visibility": "simplified"
					}
			]
	},
	{
			"featureType": "road.local",
			"elementType": "all",
			"stylers": [
					{
							"color": "#ffffff"
					},
					{
							"visibility": "simplified"
					}
			]
	},
	{
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [
					{
							"visibility": "on"
					}
			]
	},
	{
			"featureType": "transit",
			"elementType": "all",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "transit",
			"elementType": "geometry",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "transit",
			"elementType": "labels",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "transit.station",
			"elementType": "labels",
			"stylers": [
					{
							"visibility": "off"
					}
			]
	},
	{
			"featureType": "water",
			"elementType": "all",
			"stylers": [
					{
							"color": "#a0d3d3"
					}
			]
	}

];
