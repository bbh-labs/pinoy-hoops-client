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

var Comment = function (_React$Component) {
	_inherits(Comment, _React$Component);

	function Comment() {
		_classCallCheck(this, Comment);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Comment).apply(this, arguments));
	}

	_createClass(Comment, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ id: 'comment' },
				_react2.default.createElement(
					'div',
					{ className: '.col-xs-6 .col-sm-6 col-md-6 nopadding ' },
					_react2.default.createElement(
						'div',
						{ className: 'imagegallery' },
						_react2.default.createElement(
							'div',
							{ className: '.col-xs-4 .col-sm-4 col-md-4 nopadding ' },
							_react2.default.createElement('img', { src: 'images/hoop01.jpg' }),
							_react2.default.createElement('img', { src: 'images/hoop02.jpg' }),
							_react2.default.createElement('img', { src: 'images/hoop03.jpg' }),
							_react2.default.createElement('img', { src: 'images/hoop04.jpg' })
						),
						_react2.default.createElement(
							'div',
							{ className: '.col-xs-4 .col-sm-4 col-md-4 nopadding ' },
							_react2.default.createElement('img', { src: 'images/hoop05.jpg' }),
							_react2.default.createElement('img', { src: 'images/hoop06.jpg' }),
							_react2.default.createElement('img', { src: 'images/hoop07.jpg' }),
							_react2.default.createElement('img', { src: 'images/hoop08.jpg' })
						),
						_react2.default.createElement(
							'div',
							{ className: '.col-xs-4 .col-sm-4 col-md-4 nopadding ' },
							_react2.default.createElement('img', { src: 'images/hoop09.jpg' }),
							_react2.default.createElement('img', { src: 'images/hoop10.jpg' }),
							_react2.default.createElement('img', { src: 'images/hoop11.jpg' }),
							_react2.default.createElement('img', { src: 'images/hoop12.jpg' })
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: '.col-xs-6 .col-sm-6 col-md-6 nopadding ' },
					_react2.default.createElement(
						'div',
						{ className: 'commentarea' },
						_react2.default.createElement(
							'div',
							{ className: 'usercomment' },
							_react2.default.createElement('img', { src: 'images/user01.jpg' }),
							_react2.default.createElement(
								'h3',
								null,
								'UserName'
							),
							_react2.default.createElement(
								'p',
								null,
								'UserComments'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'mycomment' },
							_react2.default.createElement('textarea', { rows: '4', cols: '50', placeholder: 'Write something' }),
							_react2.default.createElement(
								'button',
								null,
								'send'
							)
						)
					)
				)
			);
		}
	}]);

	return Comment;
}(_react2.default.Component);

module.exports = Comment;