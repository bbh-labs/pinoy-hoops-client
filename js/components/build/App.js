'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _API = require('./API');

var _API2 = _interopRequireDefault(_API);

var _About = require('./About');

var _About2 = _interopRequireDefault(_About);

var _Activities = require('./Activities');

var _Activities2 = _interopRequireDefault(_Activities);

var _AddHoop = require('./AddHoop');

var _AddHoop2 = _interopRequireDefault(_AddHoop);

var _Home = require('./Home');

var _Home2 = _interopRequireDefault(_Home);

var _Hoop = require('./Hoop');

var _Hoop2 = _interopRequireDefault(_Hoop);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _LoginEmail = require('./LoginEmail');

var _LoginEmail2 = _interopRequireDefault(_LoginEmail);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _Navigation = require('./Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Profile = require('./Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _Signup = require('./Signup');

var _Signup2 = _interopRequireDefault(_Signup);

var _Story = require('./Story');

var _Story2 = _interopRequireDefault(_Story);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, App);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(App)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
            user: null
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            var showNavigation = true;

            if (this.props.location.pathname == '/') {
                showNavigation = false;
            }

            return _react2.default.createElement(
                'div',
                { id: 'app' },
                showNavigation ? _react2.default.createElement(_Navigation2.default, this.state) : null,
                showNavigation ? _react2.default.createElement('input', { type: 'checkbox', id: 'nav-trigger', className: 'nav-trigger' }) : null,
                showNavigation ? _react2.default.createElement('label', { htmlFor: 'nav-trigger' }) : null,
                showNavigation ? _react2.default.createElement(_Overlay2.default, null) : null,
                this.props.children && _react2.default.cloneElement(this.props.children, this.state)
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.checkLoggedIn();

            this.dispatcherID = _Dispatcher2.default.register(function (payload) {
                switch (payload.type) {
                    case 'refresh-user':
                        _this2.checkLoggedIn();

                        if (payload.goto) _reactRouter.browserHistory.replace(payload.goto);

                        break;
                }
            });
        }
    }, {
        key: 'checkLoggedIn',
        value: function checkLoggedIn() {
            var _this3 = this;

            _API2.default.isLoggedIn(function (user) {
                _this3.setState({ user: user });
            }, function () {
                _this3.setState({ user: null });
            });
        }
    }]);

    return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.browserHistory },
    _react2.default.createElement(
        _reactRouter.Route,
        { path: '/', component: App },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/about', component: _About2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/activities', component: _Activities2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/add-hoop', component: _AddHoop2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/hoop/:hoopID', component: _Hoop2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _Login2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/login-email', component: _LoginEmail2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/map', component: _Map2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/profile', component: _Profile2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/signup', component: _Signup2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/story/:storyID', component: _Story2.default })
    )
), document.getElementById('root'));