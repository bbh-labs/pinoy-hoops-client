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
			var user = this.props.user;

			return _react2.default.createElement(
				'div',
				{ className: 'map-wrapper' },
				_react2.default.createElement(MapView, { user: user }),
				_react2.default.createElement(Overlay, null)
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
			var name = event.target.value;

			event.preventDefault();

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
			var user = this.props.user;

			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
				// How zoomed in you want the map to start at (always required)
				zoom: 13,
				scrollwheel: true,
				// The latitude and longitude to center the map (always required)
				center: new google.maps.LatLng(14.5980, 120.9446), // Manila

				// How you would like to style the map.
				// This is where you would paste any style found on Snazzy Maps.
				styles: [{ "featureType": "all", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.country", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.country", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "visibility": "on" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#e5e8e7" }, { "visibility": "off" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "visibility": "on" }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "color": "#f5f5f2" }, { "visibility": "on" }] }, { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.attraction", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.government", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.medical", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "all", "stylers": [{ "color": "#91b65d" }, { "gamma": 1.51 }] }, { "featureType": "poi.park", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.place_of_worship", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.school", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.sports_complex", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.sports_complex", "elementType": "geometry", "stylers": [{ "color": "#c7c7c7" }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "labels.icon", "stylers": [{ "color": "#ffffff" }, { "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "color": "#ffffff" }, { "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#a0d3d3" }] }]
			};

			// Create the Google Map using our element and options defined above
			this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

			var image = {
				url: 'images/dummy01.jpg',
				scaledSize: new google.maps.Size(64, 64),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(0, 64)
			};

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(14.5980, 120.9446),
				map: this.map,
				title: 'hello',
				icon: image
			});

			this.map.addListener('click', function (event) {
				if (user) _Dispatcher2.default.dispatch({ type: 'map-click', latlng: event.latLng });else _browserHistory2.default.push('/login');
			});
			/*this.getHoops();
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
   });*/
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.map = null;
		}
	}]);

	return MapView;
}(_react2.default.Component);

var Overlay = function (_React$Component3) {
	_inherits(Overlay, _React$Component3);

	function Overlay() {
		var _Object$getPrototypeO2;

		var _temp2, _this3, _ret3;

		_classCallCheck(this, Overlay);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret3 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(Overlay)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.state = {
			latlng: null
		}, _this3.previewImage = function (event) {
			var preview = void 0;
			var file = event.target.files[0];
			var reader = new FileReader();

			switch (event.target.id) {
				case 'hoop-image-input':
					preview = _this3.refs.hoopImage;
					break;

				case 'court-image-input':
					preview = _this3.refs.courtImage;
					break;

				case 'crew-image-input':
					preview = _this3.refs.crewImage;
					break;
			}

			reader.addEventListener('load', function () {
				preview.src = reader.result;
			});

			if (file) reader.readAsDataURL(file);
		}, _this3.submit = function (event) {
			var latlng = _this3.state.latlng;

			event.preventDefault();

			if (!latlng) {
				alert('You must pick a location!');
				return;
			}

			_API2.default.addHoop(new FormData(event.target), function () {
				alert('Successfully added hoop!');
				_this3.setState({ latlng: null });
				_Dispatcher2.default.dispatch({ type: 'get-hoops' });
				_Dispatcher2.default.dispatch({ type: 'get-activities' });
				_browserHistory2.default.replace('/map');
			}, function (response) {
				_this3.setState({ latlng: null });
				alert(response.statusText);
			});
		}, _temp2), _possibleConstructorReturn(_this3, _ret3);
	}

	_createClass(Overlay, [{
		key: 'render',
		value: function render() {
			var latlng = this.state.latlng;
			if (latlng) return _react2.default.createElement(
				'form',
				{ id: 'addhoop', onSubmit: this.submit, enctype: 'multipart/form-data' },
				_react2.default.createElement(
					'h2',
					null,
					'Tell us about the hoop'
				),
				_react2.default.createElement('input', { type: 'text', name: 'name', placeholder: 'Hoop Name' }),
				_react2.default.createElement('br', null),
				_react2.default.createElement('textarea', { rows: '4', cols: '50', name: 'description', placeholder: 'description' }),
				_react2.default.createElement('br', null),
				_react2.default.createElement(
					'div',
					{ className: 'hoopcategory' },
					_react2.default.createElement(
						'h5',
						null,
						'Submit your hoop photos under below categories(Mininum one)'
					),
					_react2.default.createElement(
						'label',
						{ className: '.col-xs-12 col-md-4', htmlFor: 'hoop-image-input' },
						_react2.default.createElement('img', { ref: 'hoopImage', src: 'images/hoop.jpg' }),
						_react2.default.createElement('input', { id: 'hoop-image-input', type: 'file', name: 'hoop-image', accept: 'image/*', onChange: this.previewImage })
					),
					_react2.default.createElement(
						'label',
						{ className: '.col-xs-12 col-md-4', htmlFor: 'court-image-input' },
						_react2.default.createElement('img', { ref: 'courtImage', src: 'images/court.jpg' }),
						_react2.default.createElement('input', { id: 'court-image-input', type: 'file', name: 'court-image', accept: 'image/*', onChange: this.previewImage })
					),
					_react2.default.createElement(
						'label',
						{ className: '.col-xs-12 col-md-4', htmlFor: 'crew-image-input' },
						_react2.default.createElement('img', { ref: 'crewImage', src: 'images/crew.jpg' }),
						_react2.default.createElement('input', { id: 'crew-image-input', type: 'file', name: 'crew-image', accept: 'image/*', onChange: this.previewImage })
					),
					_react2.default.createElement(
						'button',
						{ type: 'submit' },
						'DONE'
					)
				),
				_react2.default.createElement('input', { type: 'hidden', name: 'latitude', value: latlng.lat }),
				_react2.default.createElement('input', { type: 'hidden', name: 'longitude', value: latlng.lng })
			);else return null;
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this4 = this;

			this.dispatcherID = _Dispatcher2.default.register(function (payload) {
				switch (payload.type) {
					case 'map-click':
						var lat = payload.latlng.lat();
						var lng = payload.latlng.lng();
						_this4.setState({ latlng: { lat: lat, lng: lng } });
						break;
				}
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_Dispatcher2.default.unregister(this.dispatcherID);
		}
	}]);

	return Overlay;
}(_react2.default.Component);

module.exports = Map;