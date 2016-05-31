'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var About = function (_React$Component) {
    _inherits(About, _React$Component);

    function About() {
        _classCallCheck(this, About);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(About).apply(this, arguments));
    }

    _createClass(About, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'site-wrap' },
                _react2.default.createElement(
                    'div',
                    { className: 'about' },
                    _react2.default.createElement(
                        'div',
                        { className: 'csslider' },
                        _react2.default.createElement('input', { type: 'radio', name: 'slides', id: 'slides_1', defaultChecked: true }),
                        _react2.default.createElement('input', { type: 'radio', name: 'slides', id: 'slides_2' }),
                        _react2.default.createElement('input', { type: 'radio', name: 'slides', id: 'slides_3' }),
                        _react2.default.createElement('input', { type: 'radio', name: 'slides', id: 'slides_4' }),
                        _react2.default.createElement('input', { type: 'radio', name: 'slides', id: 'slides_N' }),
                        _react2.default.createElement(
                            'ul',
                            null,
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement('img', { src: 'images/about01.jpg' }),
                                _react2.default.createElement(
                                    'h3',
                                    null,
                                    'About',
                                    _react2.default.createElement('br', null),
                                    ' Pinoy Hoop'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tortor mi, ultrices eu vulputate eu, bibendum et ipsum. In sed sollicitudin mi,'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement('img', { src: 'images/about02.jpg' })
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement('img', { src: 'images/about03.jpg' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'dots' },
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement('label', { htmlFor: 'slides_1' }),
                                _react2.default.createElement('label', { htmlFor: 'slides_2' }),
                                _react2.default.createElement('label', { htmlFor: 'slides_3' })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return About;
}(_react2.default.Component);

module.exports = About;