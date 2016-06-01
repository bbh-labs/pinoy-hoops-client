'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _browserHistory = require('./browserHistory');

var _browserHistory2 = _interopRequireDefault(_browserHistory);

var _API = require('./API');

var _API2 = _interopRequireDefault(_API);

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Map = function (_React$Component) {
	_inherits(Map, _React$Component);

	function Map() {
		_classCallCheck(this, Map);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Map).apply(this, arguments));
	}

	_createClass(Map, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'site-wrap' },
				_react2.default.createElement(MapView, null),
				_react2.default.createElement(
					'div',
					{ className: 'map-btn' },
					_react2.default.createElement(
						'div',
						{ className: 'bottom-left' },
						_react2.default.createElement('img', { src: 'images/search.jpg' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'bottom-right' },
						_react2.default.createElement('img', { src: 'images/location.jpg' })
					)
				)
			);
		}
	}]);

	return Map;
}(_react2.default.Component);

var MapView = function (_React$Component2) {
	_inherits(MapView, _React$Component2);

	function MapView() {
		var _Object$getPrototypeO;

		var _temp, _this2, _ret;

		_classCallCheck(this, MapView);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MapView)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this2), _this2.getHoops = function (data) {
			_API2.default.getHoops(data, function (hoops) {
				_this2.setHoops(hoops);
			}, function (response) {
				alert('Failed to get hoops');
			});
		}, _this2.getNearbyHoops = function (data) {
			_API2.default.getNearbyHoops(data, function (hoops) {
				_this2.setHoops(hoops);
			}, function (response) {
				alert('Failed to get hoops');
			});
		}, _this2.getPopularHoops = function (data) {
			_API2.default.getPopularHoops(data, function (hoops) {
				_this2.setHoops(hoops);
			}, function (response) {
				alert('Failed to get hoops');
			});
		}, _this2.getLatestHoops = function (data) {
			_API2.default.getLatestHoops(data, function (hoops) {
				_this2.setHoops(hoops);
			}, function (response) {
				alert('Failed to get hoops');
			});
		}, _this2.setHoops = function (hoops) {
			_this2.clearHoops();

			if (hoops) {
				var _loop = function _loop(i) {
					var hoop = hoops[i];

					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(hoops[i].latitude, hoops[i].longitude),
						map: _this2.map,
						title: hoops[i].name
					});
					marker.addListener('click', function () {
						_browserHistory2.default.push('/hoop/' + hoop.id);
						_Dispatcher2.default.dispatch({ type: 'view-hoop', hoop: hoop });
					});

					_this2.markers.push(marker);
				};

				for (var i in hoops) {
					_loop(i);
				}
			}
		}, _this2.clearHoops = function () {
			for (var i in _this2.markers) {
				_this2.markers[i].setMap(null);
			}_this2.markers = [];
		}, _this2.handleSearch = function (event) {
			event.preventDefault();

			var name = event.target.value;
			if (name.length > 0) _this2.getHoops({ name: name });else _this2.getHoops();
		}, _temp), _possibleConstructorReturn(_this2, _ret);
	}

	_createClass(MapView, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { id: 'map' });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this3 = this;

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
				styles: [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "administrative", "elementType": "labels", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "administrative.country", "elementType": "labels", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "administrative.province", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.locality", "elementType": "labels", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#e8e7e7" }, { "lightness": 20 }] }, { "featureType": "landscape", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "color": "#ff0000" }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#ff0000" }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }, { "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }, { "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#353537" }, { "lightness": 17 }] }]
			};

			// Create the Google Map using our element and options defined above
			this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

			this.getHoops();

			this.dispatcherID = _Dispatcher2.default.register(function (payload) {
				switch (payload.type) {
					case 'get-hoops':
						_this3.getHoops();
						break;

					case 'get-nearby-hoops':
						_this3.getNearbyHoops();
						break;

					case 'get-popular-hoops':
						_this3.getPopularHoops();
						break;

					case 'get-latest-hoops':
						_this3.getLatestHoops();
						break;
				}
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.map = null;

			_Dispatcher2.default.unregister(this.dispatcherID);
		}
	}]);

	return MapView;
}(_react2.default.Component);

module.exports = Map;