'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _API = require('./API');

var _API2 = _interopRequireDefault(_API);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ACTIVITY_POST_HOOP = 1,
    ACTIVITY_POST_STORY = 2,
    ACTIVITY_POST_COMMENT_HOOP = 101,
    ACTIVITY_POST_COMMENT_STORY = 102,
    ACTIVITY_POST_LIKE_HOOP = 201,
    ACTIVITY_POST_LIKE_STORY = 202;

var Activities = function (_React$Component) {
	_inherits(Activities, _React$Component);

	function Activities() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Activities);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Activities)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			activities: null
		}, _this.getActivities = function () {
			_API2.default.getActivities(function (activities) {
				_this.setState({ activities: activities });
			}, function (response) {
				alert('Failed to get activities');
			});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Activities, [{
		key: 'render',
		value: function render() {
			var activities = this.state.activities;

			return _react2.default.createElement(
				'div',
				{ className: 'site-wrap' },
				_react2.default.createElement(
					'div',
					{ className: 'activities' },
					_react2.default.createElement(
						'ul',
						null,
						this.activities()
					)
				)
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getActivities();
		}
	}, {
		key: 'activities',
		value: function activities() {
			var activities = this.state.activities;
			if (!activities) return null;

			return activities.map(function (activity, i) {
				return _react2.default.createElement(Activity, { key: i, activity: activity });
			});
		}
	}]);

	return Activities;
}(_react2.default.Component);

var Activity = function (_React$Component2) {
	_inherits(Activity, _React$Component2);

	function Activity() {
		_classCallCheck(this, Activity);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Activity).apply(this, arguments));
	}

	_createClass(Activity, [{
		key: 'render',
		value: function render() {
			var activity = this.props.activity;
			var user = activity.data.user;
			var story = activity.data.story;
			var hoop = activity.data.hoop;

			return _react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'userprofile' },
					_react2.default.createElement(
						'span',
						{ className: 'left' },
						_react2.default.createElement('img', { src: user.image_url })
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'userfeeds' },
					_react2.default.createElement(
						'p',
						null,
						user.firstname,
						' ',
						user.lastname,
						' ',
						this.action(),
						' '
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'userstory' },
					story ? _react2.default.createElement(
						'span',
						{ className: 'right' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/story/' + story.id },
							_react2.default.createElement('img', { src: story.image_url })
						)
					) : hoop ? _react2.default.createElement(
						'span',
						{ className: 'right' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/hoop/' + hoop.id },
							_react2.default.createElement('img', { src: hoop.data.featured_story.image_url })
						)
					) : null
				)
			);
		}
	}, {
		key: 'action',
		value: function action() {
			var activity = this.props.activity;
			var hoop = activity.data.hoop;
			var story = activity.data.story;

			switch (activity.type) {
				case ACTIVITY_POST_HOOP:
					return 'posted hoop \'' + hoop.name + '\'';

				case ACTIVITY_POST_STORY:
					return 'posted story \'' + story.name + '\'';

				case ACTIVITY_POST_COMMENT_HOOP:
					return 'posted comment on \'' + hoop.name + '\'';

				case ACTIVITY_POST_COMMENT_STORY:
					return 'posted comment on \'' + story.name + '\'';

				case ACTIVITY_POST_LIKE_HOOP:
					return 'liked hoop \'' + hoop.name + '\'';

				case ACTIVITY_POST_LIKE_STORY:
					return 'liked story \'' + story.name + '\'';
			}
		}
	}]);

	return Activity;
}(_react2.default.Component);

module.exports = Activities;