'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _browserHistory = require('./browserHistory');

var _browserHistory2 = _interopRequireDefault(_browserHistory);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _API = require('./API');

var _API2 = _interopRequireDefault(_API);

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = function (_React$Component) {
	_inherits(Navigation, _React$Component);

	function Navigation() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Navigation);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Navigation)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			pushMenuOpen: false
		}, _this.login = function (event) {
			event.preventDefault();

			_this.props.hideMenu();
			_browserHistory2.default.replace('/login');
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Navigation, [{
		key: 'render',
		value: function render() {
			var user = this.props.user;
			var pushMenuOpen = this.state.pushMenuOpen;

			if (user) {
				return _react2.default.createElement(
					'nav',
					{ className: (0, _classnames2.default)('pushmenu pushmenu-left', pushMenuOpen && 'pushmenu-open') },
					_react2.default.createElement(
						'div',
						{ className: 'menulogo' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/map', onClick: this.props.hideMenu },
							_react2.default.createElement('img', { src: 'images/logo_light.png' })
						)
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/profile', onClick: this.props.hideMenu },
						_react2.default.createElement(
							'div',
							{ className: 'sidebar_userprofile' },
							_react2.default.createElement('img', { src: user.image_url }),
							_react2.default.createElement(
								'p',
								null,
								user.firstname
							)
						)
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/about', onClick: this.props.hideMenu },
						'About'
					),
					_react2.default.createElement(
						'a',
						{ href: 'mailto:donate@pinoyhoops.com?Subject=Donation%20for%20hoop', target: '_top', onClick: this.props.hideMenu },
						'Donate'
					),
					_react2.default.createElement(
						'a',
						_defineProperty({ href: '#', onClick: this.logout }, 'onClick', this.props.hideMenu),
						'Sign out'
					)
				);
			} else {
				return _react2.default.createElement(
					'nav',
					{ className: (0, _classnames2.default)('pushmenu pushmenu-left', pushMenuOpen && 'pushmenu-open') },
					_react2.default.createElement(
						'div',
						{ className: 'menulogo' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/map', onClick: this.props.hideMenu },
							_react2.default.createElement('img', { src: 'images/logo_light.png' })
						)
					),
					_react2.default.createElement(
						'a',
						{ href: '#', onClick: this.login },
						'Login'
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/about', onClick: this.props.hideMenu },
						'About'
					),
					_react2.default.createElement(
						'a',
						{ href: 'mailto:donate@pinoyhoops.com?Subject=Donation%20for%20hoop', target: '_top', onClick: this.props.hideMenu },
						'Donate'
					)
				);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.dispatcherID = _Dispatcher2.default.register(function (payload) {
				switch (payload.type) {
					case 'nav-list-click':
						var pushMenuOpen = _this2.state.pushMenuOpen;

						_this2.setState({ pushMenuOpen: !pushMenuOpen });
						break;

					case 'hide-sidebar':
						_this2.setState({ pushMenuOpen: false });
						break;
				}
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_Dispatcher2.default.unregister(this.dispatcherID);
		}
	}, {
		key: 'logout',
		value: function logout(event) {
			event.preventDefault();

			_API2.default.logout(function () {
				_Dispatcher2.default.dispatch({ type: 'refresh-user', goto: '/login' });

				hideSidebar();
			}, function () {
				alert('Failed to log out!');
			});
		}
	}]);

	return Navigation;
}(_react2.default.Component);

module.exports = Navigation;