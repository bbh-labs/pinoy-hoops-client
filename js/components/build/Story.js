'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _browserHistory = require('./browserHistory');

var _browserHistory2 = _interopRequireDefault(_browserHistory);

var _API = require('./API');

var _API2 = _interopRequireDefault(_API);

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Story = function (_React$Component) {
	_inherits(Story, _React$Component);

	function Story() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Story);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Story)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			story: null,
			comments: null,
			likes: 0
		}, _this.like = function () {
			var story = _this.state.story;

			if (story) {
				_API2.default.likeStory({ 'story-id': story.id }, function () {
					_this.getLikes(story.id);
				}, function (response) {
					alert('Failed to like story');
				});
			}
		}, _this.getLikes = function (storyID) {
			_API2.default.getStoryLikes({ 'story-id': storyID }, function (likes) {
				_this.setState({ likes: likes });
			}, function (response) {
				alert('Failed to get likes count');
			});
		}, _this.getComments = function (storyID) {
			_API2.default.getStoryComments({ 'story-id': storyID }, function (comments) {
				_this.setState({ comments: comments });
			}, function (response) {
				alert('Failed to get story comments');
			});
		}, _this.comments = function () {
			var comments = _this.state.comments;

			if (!comments) return null;

			return comments.map(function (comment, i) {
				return _react2.default.createElement(
					'p',
					{ key: i },
					_react2.default.createElement(
						'strong',
						null,
						comment.user.firstname,
						' ',
						comment.user.lastname
					),
					' ',
					comment.text
				);
			});
		}, _this.share = function () {
			var story = _this.state.story;

			if (story) _Dispatcher2.default.dispatch({ type: 'overlay', name: 'share-story', data: { storyID: story.id } });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Story, [{
		key: 'render',
		value: function render() {
			var user = this.props.user;
			var story = this.state.story;
			var comments = this.state.comments;
			var likes = this.state.likes;

			if (!story) return null;

			return _react2.default.createElement(
				'div',
				{ className: 'site-wrap' },
				_react2.default.createElement(
					'div',
					{ className: 'hoopstory' },
					_react2.default.createElement(
						'div',
						{ className: 'heroimage' },
						_react2.default.createElement('img', { src: contentURL(story.image_url, '/images/avatar.png') }),
						_react2.default.createElement(
							'h2',
							null,
							story.name
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'hoop-info' },
						_react2.default.createElement(
							'div',
							{ className: 'userprofile' },
							_react2.default.createElement('img', { src: contentURL(story.user.image_url, '/images/avatar.png') }),
							_react2.default.createElement(
								'h6',
								null,
								story.user.firstname,
								' ',
								story.user.lastname
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'icons' },
							_react2.default.createElement(
								'p',
								null,
								likes,
								' likes'
							),
							_react2.default.createElement('img', { src: '/images/icon_love.png', onClick: this.like }),
							_react2.default.createElement('img', { src: '/images/icon_share.png', onClick: this.share })
						),
						_react2.default.createElement(
							'div',
							{ className: 'description' },
							_react2.default.createElement(
								'p',
								null,
								story.description
							)
						)
					),
					_react2.default.createElement('hr', null),
					_react2.default.createElement(
						'div',
						{ className: 'usercomment' },
						this.comments()
					),
					user ? _react2.default.createElement(CommentBox, { story: story }) : null
				)
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var storyID = this.props.params.storyID;

			_API2.default.getStory({ storyID: storyID }, function (story) {
				_this2.setState({ story: story });
			}, function (response) {
				alert('Failed to get most story');
			});

			this.getLikes(storyID);
			this.getComments(storyID);

			this.dispatcherID = _Dispatcher2.default.register(function (payload) {
				switch (payload.type) {
					case 'story-get-comments':
						_this2.getComments(storyID);
						break;
				}
			});

			_API2.default.viewStory({ 'story-id': storyID });
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_Dispatcher2.default.unregister(this.dispatcherID);
		}
	}]);

	return Story;
}(_react2.default.Component);

var CommentBox = function (_React$Component2) {
	_inherits(CommentBox, _React$Component2);

	function CommentBox() {
		var _Object$getPrototypeO2;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, CommentBox);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(CommentBox)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.comment = function (event) {
			event.preventDefault();

			var story = _this3.props.story;

			if (story) {
				(function () {
					var form = event.target;
					var text = form.elements['text'].value;

					_API2.default.commentStory({ 'story-id': story.id, text: text }, function () {
						form.reset();

						_this3.dispatchGetComments();
					}, function (response) {
						alert('Failed to comment on the story!');
					});
				})();
			}
		}, _this3.dispatchGetComments = function () {
			_Dispatcher2.default.dispatch({ type: 'story-get-comments' });
		}, _temp2), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(CommentBox, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'form',
				{ className: 'comment', onSubmit: this.comment },
				_react2.default.createElement('input', { placeholder: 'add a comment', type: 'text', name: 'text' }),
				_react2.default.createElement(
					'button',
					null,
					'Send'
				)
			);
		}
	}]);

	return CommentBox;
}(_react2.default.Component);

module.exports = Story;