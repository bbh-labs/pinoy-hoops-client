'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _API = require('./API');

var _API2 = _interopRequireDefault(_API);

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overlay = function (_React$Component) {
	_inherits(Overlay, _React$Component);

	function Overlay() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Overlay);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Overlay)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			name: null,
			data: null
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Overlay, [{
		key: 'render',
		value: function render() {
			var name = this.state.name;
			var data = this.state.data;

			switch (name) {
				case 'add-story':
					return _react2.default.createElement(AddStory, { hoopID: data.hoopID });

				case 'share-story':
					return _react2.default.createElement(ShareStory, { storyID: data.storyID });

				default:
					return null;
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.dispatcherID = _Dispatcher2.default.register(function (payload) {
				switch (payload.type) {
					case 'overlay':
						_this2.setState({ name: payload.name, data: payload.data });
						break;

					case 'overlay-close':
						_this2.setState({ name: null, data: null });
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

var AddStory = function (_React$Component2) {
	_inherits(AddStory, _React$Component2);

	function AddStory() {
		var _Object$getPrototypeO2;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, AddStory);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(AddStory)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.submit = function (event) {
			_API2.default.addStory(new FormData(event.target), function () {
				_this3.close();
			}, function () {
				alert('Failed to add story');
				_this3.close();
			});
		}, _this3.previewImage = function (event) {
			var preview = _this3.refs.image;
			var file = event.target.files[0];
			var reader = new FileReader();

			reader.addEventListener('load', function () {
				preview.src = reader.result;
			});

			if (file) reader.readAsDataURL(file);
		}, _temp2), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(AddStory, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'form',
				{ className: 'add', onSubmit: this.submit },
				_react2.default.createElement(
					'div',
					{ className: 'whitebox' },
					_react2.default.createElement(
						'p',
						{ style: { float: 'right', margin: '10px' }, onClick: this.close },
						'X'
					),
					_react2.default.createElement(
						'h4',
						null,
						'Add your story'
					),
					_react2.default.createElement('img', { src: '/images/dummy01.jpg', ref: 'image' }),
					_react2.default.createElement('input', { type: 'file', name: 'image', onChange: this.previewImage }),
					_react2.default.createElement('input', { type: 'text', placeholder: 'Title', name: 'name' }),
					_react2.default.createElement('br', null),
					_react2.default.createElement('input', { type: 'hidden', name: 'description', value: '' }),
					_react2.default.createElement('input', { type: 'hidden', name: 'hoop_id', value: this.props.hoopID }),
					_react2.default.createElement(
						'button',
						null,
						'Submit'
					)
				)
			);
		}
	}, {
		key: 'close',
		value: function close() {
			_Dispatcher2.default.dispatch({ type: 'overlay-close' });
		}
	}]);

	return AddStory;
}(_react2.default.Component);

var ShareStory = function (_React$Component3) {
	_inherits(ShareStory, _React$Component3);

	function ShareStory() {
		_classCallCheck(this, ShareStory);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ShareStory).apply(this, arguments));
	}

	_createClass(ShareStory, [{
		key: 'render',
		value: function render() {
			var shareURL = BASE_URL + '/story/' + this.props.storyID;

			return _react2.default.createElement(
				'div',
				{ className: 'sharebox' },
				_react2.default.createElement(
					'div',
					{ className: 'whitebox' },
					_react2.default.createElement(
						'p',
						{ style: { float: 'right', margin: '10px' }, onClick: this.close },
						'X'
					),
					_react2.default.createElement(
						'h4',
						null,
						'Share'
					),
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(
							'a',
							{ href: 'http://www.facebook.com/sharer.php?u=' + shareURL, target: '_blank' },
							_react2.default.createElement('img', { src: '/images/icon_fb.png', alt: 'Facebook' })
						)
					),
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(
							'a',
							{ href: 'https://twitter.com/share?url=' + shareURL, target: '_blank' },
							_react2.default.createElement('img', { src: '/images/icon_twitter.png', alt: 'Twitter' })
						)
					),
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(
							'a',
							{ href: 'https://plus.google.com/share?url=' + shareURL, target: '_blank' },
							_react2.default.createElement('img', { src: '/images/icon_gmail.png', alt: 'Google' })
						)
					)
				)
			);
		}
	}, {
		key: 'close',
		value: function close() {
			_Dispatcher2.default.dispatch({ type: 'overlay-close' });
		}
	}]);

	return ShareStory;
}(_react2.default.Component);

module.exports = Overlay;