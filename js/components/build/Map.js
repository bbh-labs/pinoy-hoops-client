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
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Map);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Map)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			latlng: null,
			address: null
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Map, [{
		key: 'render',
		value: function render() {
			var user = this.props.user;
			var latlng = this.state.latlng;
			var address = this.state.address;

			return _react2.default.createElement(
				'div',
				{ className: 'map-wrapper' },
				_react2.default.createElement(MapView, { user: user }),
				_react2.default.createElement(Overlay, { latlng: latlng, address: address })
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.dispatcherID = _Dispatcher2.default.register(function (payload) {
				switch (payload.type) {
					case 'map-click':
						_this2.setState({ latlng: payload.latlng });
						break;

					case 'set-address':
						_this2.setState({ address: payload.address });
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

	return Map;
}(_react2.default.Component);

var MapView = function (_React$Component2) {
	_inherits(MapView, _React$Component2);

	function MapView() {
		var _Object$getPrototypeO2;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, MapView);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(MapView)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.getHoops = function (data) {
			_API2.default.getHoops(data, function (hoops) {
				_this3.setHoops(hoops);
			}, function (response) {
				alert('Failed to get hoops');
			});
		}, _this3.getNearbyHoops = function (data) {
			_API2.default.getNearbyHoops(data, function (hoops) {
				_this3.setHoops(hoops);
			}, function (response) {
				alert('Failed to get hoops');
			});
		}, _this3.getPopularHoops = function (data) {
			_API2.default.getPopularHoops(data, function (hoops) {
				_this3.setHoops(hoops);
			}, function (response) {
				alert('Failed to get hoops');
			});
		}, _this3.getLatestHoops = function (data) {
			_API2.default.getLatestHoops(data, function (hoops) {
				_this3.setHoops(hoops);
			}, function (response) {
				alert('Failed to get hoops');
			});
		}, _this3.setHoops = function (hoops) {
			_this3.clearHoops();

			if (hoops) {
				var _loop = function _loop(i) {
					var hoop = hoops[i];

					var image = {
						url: hoops[i].data.featured_story.image_url,
						scaledSize: new google.maps.Size(64, 64),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(0, 64)
					};

					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(hoops[i].latitude, hoops[i].longitude),
						map: _this3.map,
						title: hoops[i].name,
						icon: image
					});

					marker.addListener('click', function () {
						_browserHistory2.default.push('/hoop/' + hoop.id);
						_Dispatcher2.default.dispatch({ type: 'view-hoop', hoop: hoop });
					});

					_this3.markers.push(marker);
				};

				for (var i in hoops) {
					_loop(i);
				}
			}
		}, _this3.clearHoops = function () {
			for (var i in _this3.markers) {
				_this3.markers[i].setMap(null);
			}_this3.markers = [];
		}, _this3.handleSearch = function (event) {
			var name = event.target.value;

			event.preventDefault();

			if (name.length > 0) _this3.getHoops({ name: name });else _this3.getHoops();
		}, _temp2), _possibleConstructorReturn(_this3, _ret2);
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

			var user = this.props.user;

			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
				zoom: 13,
				scrollwheel: true,
				center: new google.maps.LatLng(14.5980, 120.9446), // Manila
				styles: MAP_STYLE
			};

			// Create the Google Map using our element and options defined above
			this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

			// Create a reverse geocoder
			this.geocoder = new google.maps.Geocoder();

			this.map.addListener('click', function (event) {
				if (user) {
					var latlng = { lat: event.latLng.lat(), lng: event.latLng.lng() };

					_Dispatcher2.default.dispatch({ type: 'map-click', latlng: latlng });

					if (_this4.marker) {
						_this4.marker.setMap(null);
						_this4.marker = null;
					}

					_this4.marker = new google.maps.Marker({
						position: new google.maps.LatLng(latlng.lat, latlng.lng),
						map: _this4.map,
						title: 'Hoop'
					});

					_this4.geocoder.geocode({ location: latlng }, function (results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							if (results[1]) _Dispatcher2.default.dispatch({ type: 'set-address', address: results[1].formatted_address });
						}
					});
				} else {
					_browserHistory2.default.push('/login');
				}
			});

			this.getHoops();

			this.dispatcherID = _Dispatcher2.default.register(function (payload) {
				switch (payload.type) {
					case 'get-hoops':
						_this4.getHoops();
						break;

					case 'get-nearby-hoops':
						_this4.getNearbyHoops();
						break;

					case 'get-popular-hoops':
						_this4.getPopularHoops();
						break;

					case 'get-latest-hoops':
						_this4.getLatestHoops();
						break;
				}
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.map = null;
			this.geocoder = null;

			_Dispatcher2.default.unregister(this.dispatcherID);
		}
	}]);

	return MapView;
}(_react2.default.Component);

var Overlay = function (_React$Component3) {
	_inherits(Overlay, _React$Component3);

	function Overlay() {
		var _Object$getPrototypeO3;

		var _temp3, _this5, _ret4;

		_classCallCheck(this, Overlay);

		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		return _ret4 = (_temp3 = (_this5 = _possibleConstructorReturn(this, (_Object$getPrototypeO3 = Object.getPrototypeOf(Overlay)).call.apply(_Object$getPrototypeO3, [this].concat(args))), _this5), _this5.previewImage = function (event) {
			var preview = void 0;
			var file = event.target.files[0];
			var reader = new FileReader();

			switch (event.target.id) {
				case 'hoop-image-input':
					preview = _this5.refs.hoopImage;
					break;

				case 'court-image-input':
					preview = _this5.refs.courtImage;
					break;

				case 'crew-image-input':
					preview = _this5.refs.crewImage;
					break;
			}

			reader.addEventListener('load', function () {
				preview.src = reader.result;
			});

			if (file) reader.readAsDataURL(file);
		}, _this5.submit = function (event) {
			var latlng = _this5.props.latlng;

			event.preventDefault();

			if (!latlng) {
				alert('You must pick a location!');
				return;
			}

			_API2.default.addHoop(new FormData(event.target), function () {
				alert('Successfully added hoop!');
				_this5.setState({ latlng: null });
				_Dispatcher2.default.dispatch({ type: 'get-hoops' });
				_Dispatcher2.default.dispatch({ type: 'get-activities' });
				_browserHistory2.default.replace('/map');
			}, function (response) {
				_this5.setState({ latlng: null });
				alert(response.statusText);
			});
		}, _temp3), _possibleConstructorReturn(_this5, _ret4);
	}

	_createClass(Overlay, [{
		key: 'render',
		value: function render() {
			var latlng = this.props.latlng;
			var address = this.props.address;

			if (latlng) return _react2.default.createElement(
				'form',
				{ id: 'addhoop', onSubmit: this.submit, enctype: 'multipart/form-data' },
				_react2.default.createElement(
					'h2',
					null,
					'Tell us about the hoop'
				),
				address ? _react2.default.createElement(
					'p',
					null,
					address
				) : null,
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
	}]);

	return Overlay;
}(_react2.default.Component);

module.exports = Map;