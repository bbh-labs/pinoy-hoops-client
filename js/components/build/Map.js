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
		}, _this.clickMap = function (latlng) {
			_this.setState({ latlng: latlng });
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
				_react2.default.createElement(MapView, { user: user, clickMap: this.clickMap }),
				_react2.default.createElement(SearchBar, null),
				_react2.default.createElement(AddHoop, { latlng: latlng, address: address })
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

					case 'close-AddHoop':
						_this2.setState({ latlng: null });
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
					var featuredStories = hoops[i].data.featured_stories;
					var imageURL = featuredStories['hoop'] ? featuredStories['hoop'].image_url : featuredStories['court'] ? featuredStories['court'].image_url : featuredStories['crew'] ? featuredStories['crew'].image_url : null;

					var image = {
						url: imageURL,
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
		}, _this3.searchHoops = function (name) {
			if (name.length > 0) _this3.getHoops({ name: name });else _this3.getHoops();
		}, _this3.gotoCurrentLocation = function () {
			navigator.geolocation.getCurrentPosition(function (position) {
				_this3.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
			});
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
				zoom: 5,
				scrollwheel: true,
				center: new google.maps.LatLng(11.5771104, 113.5495458), // Philippines
				styles: MAP_STYLE
			};

			// Create the Google Map using our element and options defined above
			this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

			// Create a reverse geocoder
			this.geocoder = new google.maps.Geocoder();

			this.map.addListener('click', function (event) {
				if (user) {
					var latlng = { lat: event.latLng.lat(), lng: event.latLng.lng() };

					_this4.props.clickMap(latlng);

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

					case 'search-hoops':
						_this4.searchHoops(payload.name);
						break;

					case 'go-to-current-location':
						_this4.gotoCurrentLocation();
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

var SearchBar = function (_React$Component3) {
	_inherits(SearchBar, _React$Component3);

	function SearchBar() {
		var _Object$getPrototypeO3;

		var _temp3, _this5, _ret4;

		_classCallCheck(this, SearchBar);

		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		return _ret4 = (_temp3 = (_this5 = _possibleConstructorReturn(this, (_Object$getPrototypeO3 = Object.getPrototypeOf(SearchBar)).call.apply(_Object$getPrototypeO3, [this].concat(args))), _this5), _this5.gotoCurrentLocation = function () {
			_Dispatcher2.default.dispatch({ type: 'go-to-current-location' });
		}, _this5.handleSearch = function (event) {
			_Dispatcher2.default.dispatch({ type: 'search-hoops', name: event.target.value });
		}, _temp3), _possibleConstructorReturn(_this5, _ret4);
	}

	_createClass(SearchBar, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'MapSearch' },
				_react2.default.createElement('img', { src: 'images/icon_locate.png', onClick: this.gotoCurrentLocation }),
				_react2.default.createElement('input', { type: 'text', placeholder: 'Search...', onChange: this.handleSearch, required: true })
			);
		}
	}]);

	return SearchBar;
}(_react2.default.Component);

var AddHoop = function (_React$Component4) {
	_inherits(AddHoop, _React$Component4);

	function AddHoop() {
		var _Object$getPrototypeO4;

		var _temp4, _this6, _ret5;

		_classCallCheck(this, AddHoop);

		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}

		return _ret5 = (_temp4 = (_this6 = _possibleConstructorReturn(this, (_Object$getPrototypeO4 = Object.getPrototypeOf(AddHoop)).call.apply(_Object$getPrototypeO4, [this].concat(args))), _this6), _this6.previewImage = function (event) {
			var preview = void 0;
			var file = event.target.files[0];
			var reader = new FileReader();

			switch (event.target.id) {
				case 'hoop-image-input':
					preview = _this6.refs.hoopImage;
					break;

				case 'court-image-input':
					preview = _this6.refs.courtImage;
					break;

				case 'crew-image-input':
					preview = _this6.refs.crewImage;
					break;
			}

			reader.addEventListener('load', function () {
				preview.style.backgroundImage = 'url(' + reader.result + ')';
			});

			if (file) reader.readAsDataURL(file);
		}, _this6.submit = function (event) {
			var latlng = _this6.props.latlng;

			event.preventDefault();

			if (!latlng) {
				alert('You must pick a location!');
				return;
			}

			_API2.default.addHoop(new FormData(event.target), function () {
				alert('Successfully added hoop!');
				_this6.setState({ latlng: null });
				_Dispatcher2.default.dispatch({ type: 'get-hoops' });
				_Dispatcher2.default.dispatch({ type: 'get-activities' });
				_browserHistory2.default.replace('/map');
			}, function (response) {
				_this6.setState({ latlng: null });
				alert(response.statusText);
			});
		}, _this6.close = function (event) {
			_Dispatcher2.default.dispatch({ type: 'close-AddHoop' });
		}, _temp4), _possibleConstructorReturn(_this6, _ret5);
	}

	_createClass(AddHoop, [{
		key: 'render',
		value: function render() {
			var latlng = this.props.latlng;
			var address = this.props.address;

			if (latlng) return _react2.default.createElement(
				'form',
				{ id: 'addhoop', onSubmit: this.submit, enctype: 'multipart/form-data' },
				_react2.default.createElement(
					'div',
					{ className: 'close' },
					_react2.default.createElement('img', { src: 'images/close.png', onClick: this.close })
				),
				_react2.default.createElement(
					'h1',
					null,
					'Tell us about the hoop'
				),
				address ? _react2.default.createElement(
					'h6',
					null,
					address
				) : null,
				_react2.default.createElement('input', { type: 'text', name: 'name', placeholder: 'Hoop Name' }),
				_react2.default.createElement('br', null),
				_react2.default.createElement('textarea', { rows: '4', cols: '50', name: 'Hoop Story', placeholder: 'Hoop Story' }),
				_react2.default.createElement('br', null),
				_react2.default.createElement(
					'h1',
					null,
					'Add your hoop photos (Mininum one)'
				),
				_react2.default.createElement(
					'div',
					{ className: 'hoopcategory' },
					_react2.default.createElement(
						'label',
						{ className: '.col-xs-12 col-md-4', htmlFor: 'hoop-image-input' },
						_react2.default.createElement('div', { ref: 'hoopImage', className: 'hoopupload' }),
						_react2.default.createElement('input', { id: 'hoop-image-input', type: 'file', name: 'hoop-image', accept: 'image/*', onChange: this.previewImage })
					),
					_react2.default.createElement(
						'label',
						{ className: '.col-xs-12 col-md-4', htmlFor: 'court-image-input' },
						_react2.default.createElement('div', { ref: 'courtImage', className: 'courtupload' }),
						_react2.default.createElement('input', { id: 'court-image-input', type: 'file', name: 'court-image', accept: 'image/*', onChange: this.previewImage })
					),
					_react2.default.createElement(
						'label',
						{ className: '.col-xs-12 col-md-4', htmlFor: 'crew-image-input' },
						_react2.default.createElement('div', { ref: 'crewImage', className: 'crewupload' }),
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

	return AddHoop;
}(_react2.default.Component);

module.exports = Map;