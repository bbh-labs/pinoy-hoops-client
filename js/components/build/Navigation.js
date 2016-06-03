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

var Navigation = function (_React$Component) {
	_inherits(Navigation, _React$Component);

	function Navigation() {
		_classCallCheck(this, Navigation);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Navigation).apply(this, arguments));
	}

	_createClass(Navigation, [{
		key: 'render',
		value: function render() {
			var user = this.props.user;

			if (user) {
				return _react2.default.createElement(
					'ul',
					{ className: 'navigation' },
					_react2.default.createElement(
						'li',
						{ className: 'nav-item' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/' },
							_react2.default.createElement('img', { src: '/images/logo_light.png' })
						)
					),
					_react2.default.createElement(
						'li',
						{ className: 'nav-item' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/profile' },
							_react2.default.createElement(
								'div',
								{ className: 'menuprofile' },
								_react2.default.createElement('img', { src: contentURL(user.image_url, '/images/avatar.png') }),
								user.firstname,
								' ',
								user.lastname
							)
						)
					),
					_react2.default.createElement(
						'li',
						{ className: 'nav-item' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/map' },
							'Map'
						)
					),
					_react2.default.createElement(
						'li',
						{ className: 'nav-item' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/add-hoop' },
							'Add a hoop'
						)
					),
					_react2.default.createElement(
						'li',
						{ className: 'nav-item' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/activities' },
							'Activity feed'
						)
					),
					_react2.default.createElement(
						'li',
						{ className: 'nav-item' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/about' },
							'About'
						)
					),
					_react2.default.createElement(
						'li',
						{ className: 'nav-item' },
						_react2.default.createElement(
							'a',
							{ href: '#', onClick: this.logout },
							'Logout'
						)
					)
				);
			} else {
				return _react2.default.createElement(
					'ul',
					{ className: 'navigation' },
					_react2.default.createElement(
						'li',
						{ className: 'nav-item' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/' },
							_react2.default.createElement('img', { src: '/images/logo_light.png' })
						)
					),
					_react2.default.createElement(
						'li',
						{ className: 'nav-item' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/about' },
							'About'
						)
					),
					_react2.default.createElement(
						'li',
						{ className: 'nav-item' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/login' },
							'Add a hoop'
						)
					)
				);
			}
		}
	}, {
		key: 'logout',
		value: function logout(event) {
			event.preventDefault();

			_API2.default.logout(function () {
				_Dispatcher2.default.dispatch({ type: 'refresh-user', goto: '/login' });
			}, function () {
				alert('Failed to log out!');
			});
		}
	}]);

	return Navigation;
}(_react2.default.Component);

module.exports = Navigation;