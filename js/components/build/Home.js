'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
	_inherits(Home, _React$Component);

	function Home() {
		_classCallCheck(this, Home);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
	}

	_createClass(Home, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'section',
				{ id: 'landingpage' },
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
								_react2.default.createElement('img', { src: 'images/logo_light.png' })
							),
							_react2.default.createElement(
								'div',
								{ className: 'fadein' },
								_react2.default.createElement('div', { className: 'background-1' }),
								_react2.default.createElement('div', { className: 'background-2' }),
								_react2.default.createElement('div', { className: 'background-3' }),
								_react2.default.createElement('div', { className: 'background-4' }),
								_react2.default.createElement('div', { className: 'background-5' }),
								_react2.default.createElement('div', { className: 'background-6' }),
								_react2.default.createElement('div', { className: 'background-7' }),
								_react2.default.createElement('div', { className: 'background-8' })
							),
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/map' },
								_react2.default.createElement('div', { className: 'arrow bounce' })
							)
						)
					)
				)
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			(0, _jquery2.default)(function () {
				(0, _jquery2.default)('.fadein div:gt(0)').hide();

				_this2.intervalID = setInterval(function () {
					(0, _jquery2.default)('.fadein :first-child').fadeOut().next('div').fadeIn().end().appendTo('.fadein');
				}, 5000);
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearInterval(this.intervalID);
		}
	}]);

	return Home;
}(_react2.default.Component);

module.exports = Home;