'use strict'

var MOCKUP = true;
var BASE_URL = 'http://localhost:8080';
//var BASE_URL = 'https://pinoy-hoops.bbh-labs.com.sg';

var MAP_STYLE = [
	{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},
	{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},
	{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
	{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},
	{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]},
	{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"simplified"}]},
	{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"simplified"}]},
	{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},
	{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"simplified"}]},
	{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},
	{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},
	{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#e8e7e7"},{"lightness":20}]},
	{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},
	{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},
	{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
	{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},
	{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},
	{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},
	{"featureType":"road","elementType":"all","stylers":[{"color":"#808080"},{"visibility":"off"}]},
	{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#808080"},{"visibility":"off"}]},
	{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"},{"weight":0.5}]},
	{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"}]},
	{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},
	{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},
	{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"visibility":"off"}]},
	{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18},{"visibility":"simplified"}]},
	{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16},{"visibility":"simplified"}]},
	{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
	{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},
	{"featureType":"water","elementType":"geometry","stylers":[{"color":"#353537"},{"lightness":17}]},
];
