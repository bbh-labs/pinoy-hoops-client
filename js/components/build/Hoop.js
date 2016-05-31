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

var Hoop = function (_React$Component) {
    _inherits(Hoop, _React$Component);

    function Hoop() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Hoop);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Hoop)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
            hoop: null,
            mostCommentedStories: null,
            mostLikedStories: null,
            mostViewedStories: null,
            latestStories: null,
            tab: 'most-recent'
        }, _this.setTab = function (tab) {
            _this.setState({ tab: tab });
        }, _this.addStory = function () {
            var hoop = _this.state.hoop;

            if (hoop) _Dispatcher2.default.dispatch({ type: 'overlay', name: 'add-story', data: { hoopID: hoop.id } });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Hoop, [{
        key: 'render',
        value: function render() {
            var hoop = this.state.hoop;
            if (!hoop) return null;

            var latestStories = this.state.latestStories;
            var tab = this.state.tab;

            return _react2.default.createElement(
                'div',
                { className: 'site-wrap' },
                _react2.default.createElement(
                    'div',
                    { className: 'hoopstory' },
                    _react2.default.createElement(
                        'div',
                        { className: 'heroimage' },
                        _react2.default.createElement('img', { src: hoop.data.featured_story ? INDEX + hoop.data.featured_story.image_url : '' }),
                        _react2.default.createElement(
                            'h2',
                            null,
                            hoop.title
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'hoop-info' },
                        _react2.default.createElement(
                            'div',
                            { className: 'userprofile' },
                            _react2.default.createElement('img', { src: hoop.user.image_url ? INDEX + hoop.user.image_url : '/images/avatar.png' }),
                            _react2.default.createElement(
                                'h6',
                                null,
                                hoop.user.firstname,
                                ' ',
                                hoop.user.lastname
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'icons' },
                            _react2.default.createElement('img', { src: '/images/icon_share.png' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'description' },
                            _react2.default.createElement(
                                'p',
                                null,
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec enim dolor, facilisis id interdum id, gravida eget lacus. Nam congue urna massa, sit amet rutrum ipsum pellentesque eu. Praesent et '
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'filter' },
                        _react2.default.createElement(
                            'p',
                            { onClick: this.setTab.bind(this, 'most-recent'), style: { color: tab == 'most-recent' && '#ff6b00' } },
                            'Most Recent'
                        ),
                        _react2.default.createElement(
                            'p',
                            { onClick: this.setTab.bind(this, 'most-liked'), style: { color: tab == 'most-liked' && '#ff6b00' } },
                            'Most Liked'
                        ),
                        _react2.default.createElement(
                            'p',
                            { onClick: this.setTab.bind(this, 'most-viewed'), style: { color: tab == 'most-viewed' && '#ff6b00' } },
                            'Most Viewed'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'hoop-gallery' },
                        _react2.default.createElement(
                            'li',
                            { onClick: this.addStory },
                            _react2.default.createElement('img', { src: '/images/icon_plus.png' })
                        ),
                        this.stories()
                    )
                )
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var hoopID = this.props.params.hoopID;

            _API2.default.getHoop({ hoopID: hoopID }, function (hoop) {
                _this2.setState({ hoop: hoop });
            }, function (response) {
                alert('Failed to get hoop');
            });

            _API2.default.getMostCommentedStories({ hoop_id: hoopID }, function (stories) {
                _this2.setState({ mostCommentedStories: stories });
            }, function (response) {
                alert('Failed to get most commented stories');
            });

            _API2.default.getMostLikedStories({ hoop_id: hoopID }, function (stories) {
                _this2.setState({ mostLikedStories: stories });
            }, function (response) {
                alert('Failed to get most liked stories');
            });

            _API2.default.getMostViewedStories({ hoop_id: hoopID }, function (stories) {
                _this2.setState({ mostViewedStories: stories });
            }, function (response) {
                alert('Failed to get most viewed stories');
            });

            _API2.default.getLatestStories({ hoop_id: hoopID }, function (stories) {
                _this2.setState({ latestStories: stories });
            }, function (response) {
                alert('Failed to get latest stories');
            });
        }
    }, {
        key: 'stories',
        value: function stories() {
            var latestStories = this.state.latestStories;
            var mostViewedStories = this.state.mostViewedStories;
            var mostLikedStories = this.state.mostLikedStories;
            var mostCommentedStories = this.state.mostCommentedStories;

            switch (this.state.tab) {
                case 'most-recent':
                    return latestStories ? latestStories.map(function (story) {
                        return _react2.default.createElement(
                            'li',
                            { key: story.id },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/story/' + story.id },
                                _react2.default.createElement('img', { src: INDEX + story.image_url })
                            )
                        );
                    }) : null;

                case 'most-viewed':
                    return mostViewedStories ? mostViewedStories.map(function (story) {
                        return _react2.default.createElement(
                            'li',
                            { key: story.id },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/story/' + story.id },
                                _react2.default.createElement('img', { src: INDEX + story.image_url })
                            )
                        );
                    }) : null;

                case 'most-liked':
                    return mostLikedStories ? mostLikedStories.map(function (story) {
                        return _react2.default.createElement(
                            'li',
                            { key: story.id },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/story/' + story.id },
                                _react2.default.createElement('img', { src: INDEX + story.image_url })
                            )
                        );
                    }) : null;

                case 'most-commented':
                    return mostCommentedStories ? mostCommentedStories.map(function (story) {
                        return _react2.default.createElement(
                            'li',
                            { key: story.id },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/story/' + story.id },
                                _react2.default.createElement('img', { src: INDEX + story.image_url })
                            )
                        );
                    }) : null;
            }
        }
    }]);

    return Hoop;
}(_react2.default.Component);

module.exports = Hoop;