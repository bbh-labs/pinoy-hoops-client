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

var AddHoop = function (_React$Component) {
	_inherits(AddHoop, _React$Component);

	function AddHoop() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, AddHoop);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AddHoop)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			latlng: null
		}, _this.submit = function (event) {
			event.preventDefault();

			var latlng = _this.state.latlng;
			if (!latlng) {
				alert('You must pick a location!');
				return;
			}

			_API2.default.addHoop(new FormData(event.target), function () {
				alert('Successfully added hoop!');
				_Dispatcher2.default.dispatch({ type: 'get-hoops' });
				_Dispatcher2.default.dispatch({ type: 'get-activities' });
				_browserHistory2.default.replace('/map');
			}, function (response) {
				alert(response.statusText);
			});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(AddHoop, [{
		key: 'render',
		value: function render() {
			var latlng = this.state.latlng;

			return _react2.default.createElement(
				'div',
				{ className: 'site-wrap' },
				_react2.default.createElement(
					'form',
					{ className: 'addhoop', onSubmit: this.submit },
					_react2.default.createElement(MapView, { onDoubleClick: this.setCoordinate }),
					_react2.default.createElement(
						'div',
						{ className: 'content' },
						_react2.default.createElement(
							'h3',
							null,
							'Double tap on the map to add a hoop'
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'label',
								null,
								'Hoop name: '
							),
							_react2.default.createElement('input', { type: 'text', name: 'name' }),
							_react2.default.createElement('br', null),
							_react2.default.createElement(
								'label',
								null,
								'Hoop description: '
							),
							_react2.default.createElement('textarea', { rows: '6', cols: '20', name: 'description' }),
							_react2.default.createElement('br', null),
							_react2.default.createElement(
								'label',
								null,
								'Upload picture: '
							),
							_react2.default.createElement(
								'label',
								{ htmlFor: 'upload-image' },
								'Select file',
								_react2.default.createElement('input', { id: 'upload-image', type: 'file', name: 'image', accept: 'image/*' })
							),
							_react2.default.createElement('br', null),
							_react2.default.createElement('input', { type: 'hidden', name: 'latitude', value: latlng ? latlng.lat : 0 }),
							_react2.default.createElement('input', { type: 'hidden', name: 'longitude', value: latlng ? latlng.lng : 0 })
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'submit' },
						_react2.default.createElement(
							'button',
							{ onClick: this.cancel },
							'Cancel'
						),
						_react2.default.createElement(
							'button',
							{ type: 'submit', style: { backgroundColor: '#ff6b00' } },
							'Save'
						)
					)
				)
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.listenerID = _Dispatcher2.default.register(function (payload) {
				switch (payload.type) {
					case 'map-click':
						_this2.setState({ latlng: { lat: payload.latlng.lat(), lng: payload.latlng.lng() } });
						break;
				}
			});
		}
	}, {
		key: 'comonentWillUnmount',
		value: function comonentWillUnmount() {
			_Dispatcher2.default.unregister(this.listenerID);
		}
	}, {
		key: 'cancel',
		value: function cancel() {
			_browserHistory2.default.replace('/map');
		}
	}]);

	return AddHoop;
}(_react2.default.Component);

var MapView = function (_React$Component2) {
	_inherits(MapView, _React$Component2);

	function MapView() {
		_classCallCheck(this, MapView);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(MapView).apply(this, arguments));
	}

	_createClass(MapView, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { id: 'map' });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this4 = this;

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
			this.map.addListener('click', function (event) {
				_Dispatcher2.default.dispatch({ type: 'map-click', latlng: event.latLng });

				if (_this4.marker) {
					_this4.marker.setMap(null);
					_this4.marker = null;
				}

				_this4.marker = new google.maps.Marker({
					position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
					map: _this4.map,
					title: 'Hoop'
				});
			});

			// Let's also add a marker while we're at it
			this.marker = new google.maps.Marker({
				position: new google.maps.LatLng(14.5980, 120.9446),
				map: this.map,
				title: 'Hoop'
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.map = null;
			this.marker = null;
		}
	}]);

	return MapView;
}(_react2.default.Component);

module.exports = AddHoop;