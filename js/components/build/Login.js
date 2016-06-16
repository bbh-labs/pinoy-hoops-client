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

var Login = function (_React$Component) {
	_inherits(Login, _React$Component);

	function Login() {
		_classCallCheck(this, Login);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Login).apply(this, arguments));
	}

	_createClass(Login, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'section',
				{ id: 'login' },
				_react2.default.createElement(
					'div',
					{ className: 'container-fluid' },
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						_react2.default.createElement(
							'div',
							{ className: '.col-xs-12 .col-sm-12 col-md-12 nopadding' },
							_react2.default.createElement(
								'div',
								{ className: 'logo' },
								_react2.default.createElement('img', { src: 'images/logo_light.png' }),
								_react2.default.createElement(
									'h3',
									null,
									'Login to join the hoops community'
								),
								_react2.default.createElement(
									'div',
									{ className: 'sociallogin' },
									_react2.default.createElement(
										'a',
										{ href: '/auth/facebook', onClick: this.login },
										_react2.default.createElement(
											'button',
											null,
											'Facebook'
										)
									)
								)
							)
						)
					)
				)
			);
		}
	}, {
		key: 'login',
		value: function login(event) {
			if (!MOCKUP) return;

			event.preventDefault();

			_API2.default.login(null, function () {
				_Dispatcher2.default.dispatch({ type: 'refresh-user', goto: '/map' });
			}, function (response) {
				alert(response.statusText + ': failed to log in!');
			});
		}
	}]);

	return Login;
}(_react2.default.Component);

module.exports = Login;