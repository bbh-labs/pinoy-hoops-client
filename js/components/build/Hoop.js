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
			latestStories: null,
			tab: 'most-recent'
		}, _this.stories = function () {
			var latestStories = _this.state.latestStories;

			switch (_this.state.tab) {
				case 'most-recent':
					return latestStories ? latestStories.map(function (story) {
						return _react2.default.createElement(
							'li',
							{ key: story.id },
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/story/' + story.id },
								_react2.default.createElement('img', { src: contentURL(story.image_url) })
							)
						);
					}) : null;
			}
		}, _this.setTab = function (tab) {
			_this.setState({ tab: tab });
		}, _this.addStory = function () {
			var hoop = _this.state.hoop;

			if (hoop) _Dispatcher2.default.dispatch({ type: 'overlay', name: 'add-story', data: { hoopID: hoop.id } });
		}, _this.share = function () {
			var hoop = _this.state.hoop;

			if (hoop) _Dispatcher2.default.dispatch({ type: 'overlay', name: 'share-hoop', data: { hoopID: hoop.id } });
		}, _this.fetchData = function () {
			var hoopID = _this.props.params.hoopID;

			_API2.default.getHoop({ hoopID: hoopID }, function (hoop) {
				_this.setState({ hoop: hoop });
			}, function (response) {
				alert('Failed to get hoop');
			});

			_API2.default.getLatestStories({ hoop_id: hoopID }, function (stories) {
				_this.setState({ latestStories: stories });
			}, function (response) {
				alert('Failed to get latest stories');
			});
		}, _this.submit = function (event) {
			_API2.default.addStory(new FormData(_this.refs.storyForm), function () {
				alert('Successfully added story!');
			}, function () {
				alert('Failed to add story!');
			});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Hoop, [{
		key: 'render',
		value: function render() {
			var hoop = this.state.hoop;
			var latestStories = this.state.latestStories;
			var tab = this.state.tab;

			if (!hoop) return null;

			var featuredStories = hoop.data.featured_stories;
			var hoopImageURL = featuredStories.hoop ? featuredStories.hoop.image_url : null;
			var courtImageURL = featuredStories.court ? featuredStories.court.image_url : null;
			var crewImageURL = featuredStories.crew ? featuredStories.crew.image_url : null;

			return _react2.default.createElement(
				'div',
				{ id: 'story' },
				_react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'heroimage' },
						_react2.default.createElement(HeroImageItem, { imageURL: hoopImageURL }),
						_react2.default.createElement(HeroImageItem, { imageURL: courtImageURL }),
						_react2.default.createElement(HeroImageItem, { imageURL: crewImageURL })
					),
					_react2.default.createElement(
						'div',
						{ className: 'title' },
						_react2.default.createElement('img', { src: '/images/hoop_frame.png' }),
						_react2.default.createElement(
							'h3',
							null,
							'Hoop Name'
						),
						_react2.default.createElement(
							'div',
							{ className: 'social' },
							_react2.default.createElement(
								'a',
								{ href: '#' },
								_react2.default.createElement('img', { src: '/images/icon_share.png' })
							),
							_react2.default.createElement(
								'a',
								{ href: '#' },
								_react2.default.createElement('img', { src: '/images/icon_like.png' })
							),
							_react2.default.createElement(
								'a',
								{ href: '#' },
								_react2.default.createElement('img', { src: '/images/icon_comment.png' })
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'desciption' },
						_react2.default.createElement('div', { className: '.col-xs-6.col-sm-6 col-md-6 nopadding' }),
						_react2.default.createElement(
							'div',
							{ className: '.col-xs-6.col-sm-6 col-md-6 nopadding' },
							_react2.default.createElement(
								'h3',
								null,
								'"',
								hoop.description
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'gallery' },
						_react2.default.createElement(
							'form',
							{ ref: 'storyForm', className: '.col-xs-4.col-sm-4 col-md-4 nopadding' },
							_react2.default.createElement(
								'label',
								{ htmlFor: 'uploadhoop', className: 'uploadhoop file-label' },
								_react2.default.createElement('input', { id: 'uploadhoop', type: 'file', name: 'image', accept: 'image/*', onChange: this.submit }),
								_react2.default.createElement('img', { src: '/images/uploadimage.jpg' })
							),
							_react2.default.createElement('input', { type: 'hidden', name: 'hoop_id', value: hoop.id })
						),
						latestStories ? latestStories.map(function (story) {
							return _react2.default.createElement(Story, { story: story });
						}) : null
					)
				)
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.fetchData();

			this.dispatcherID = _Dispatcher2.default.register(function (payload) {
				switch (payload.type) {
					case 'refresh-hoop':
						_this2.fetchData();
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

	return Hoop;
}(_react2.default.Component);

var HeroImageItem = function (_React$Component2) {
	_inherits(HeroImageItem, _React$Component2);

	function HeroImageItem() {
		_classCallCheck(this, HeroImageItem);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(HeroImageItem).apply(this, arguments));
	}

	_createClass(HeroImageItem, [{
		key: 'render',
		value: function render() {
			var imageURL = this.props.imageURL;

			if (!imageURL) return null;

			return _react2.default.createElement(
				'div',
				{ className: '.col-xs-12 .col-sm-12 col-md-12 nopadding' },
				_react2.default.createElement(
					'div',
					{ className: 'left' },
					_react2.default.createElement('img', { src: contentURL(imageURL) })
				)
			);
		}
	}]);

	return HeroImageItem;
}(_react2.default.Component);

var Story = function (_React$Component3) {
	_inherits(Story, _React$Component3);

	function Story() {
		_classCallCheck(this, Story);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Story).apply(this, arguments));
	}

	_createClass(Story, [{
		key: 'render',
		value: function render() {
			var story = this.props.story;

			if (!story) return null;

			return _react2.default.createElement(
				'div',
				{ className: '.col-xs-4.col-sm-4 col-md-4 nopadding' },
				_react2.default.createElement('img', { src: contentURL(story.image_url) })
			);
		}
	}]);

	return Story;
}(_react2.default.Component);

module.exports = Hoop;