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

var Profile = function (_React$Component) {
	_inherits(Profile, _React$Component);

	function Profile() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Profile);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Profile)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			myHoops: null,
			otherHoops: null,
			tab: 'my-hoops',
			editing: false
		}, _this.profileInfo = function () {
			var user = _this.props.user;
			var editing = _this.state.editing;

			if (editing) {
				return _react2.default.createElement(ProfileForm, { user: user });
			} else {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h3',
						null,
						user.firstname,
						' ',
						user.lastname
					),
					_react2.default.createElement(
						'p',
						null,
						user.birthdate,
						', ',
						user.gender
					)
				);
			}
		}, _this.hoops = function () {
			var myHoops = _this.state.myHoops;
			var otherHoops = _this.state.otherHoops;

			switch (_this.state.tab) {
				case 'my-hoops':
					return myHoops ? myHoops.map(function (hoop) {
						return _react2.default.createElement(
							_reactRouter.Link,
							{ key: hoop.id, to: '/hoop/' + hoop.id },
							_react2.default.createElement('img', { key: hoop.data.featured_story.id, src: contentURL(hoop.data.featured_story.image_url) })
						);
					}) : null;

				case 'other-hoops':
					return otherHoops ? otherHoops.map(function (hoop) {
						return _react2.default.createElement(
							_reactRouter.Link,
							{ key: hoop.id, to: '/hoop/' + hoop.id },
							_react2.default.createElement('img', { key: hoop.data.featured_story.id, src: contentURL(hoop.data.featured_story.image_url) })
						);
					}) : null;
			}
		}, _this.setTab = function (tab) {
			_this.setState({ tab: tab });
		}, _this.handleUserImage = function (event) {
			_API2.default.updateUserImage(new FormData(_this.refs.userImageForm), function () {
				_Dispatcher2.default.dispatch({ type: 'refresh-user' });
			});
		}, _this.toggleEdit = function () {
			var editing = _this.state.editing;
			_this.setState({ editing: !editing });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Profile, [{
		key: 'render',
		value: function render() {
			var user = this.props.user;
			if (!user) return null;

			var tab = this.state.tab;

			return _react2.default.createElement(
				'div',
				{ id: 'profile' },
				_react2.default.createElement(
					'form',
					{ ref: 'userImageForm', className: 'picture' },
					_react2.default.createElement(
						'label',
						{ htmlFor: 'user-image' },
						_react2.default.createElement('img', { src: contentURL(user.image_url, '/images/avatar.png') }),
						_react2.default.createElement('input', { id: 'user-image', type: 'file', name: 'image', onChange: this.handleUserImage })
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'info' },
					this.profileInfo(),
					_react2.default.createElement(
						'button',
						{ onClick: this.toggleEdit },
						'Edit Profile'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'myhoops' },
					_react2.default.createElement(
						'div',
						{ className: 'filter' },
						_react2.default.createElement(
							'p',
							{ onClick: this.setTab.bind(this, 'my-hoops'), style: { color: tab == 'my-hoops' && '#ff6b00' } },
							'My hoops'
						),
						_react2.default.createElement(
							'p',
							{ onClick: this.setTab.bind(this, 'other-hoops'), style: { color: tab == 'other-hoops' && '#ff6b00' } },
							'Other hoops'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'gallery' },
						this.hoops()
					)
				)
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getMyHoops();
			this.getOtherHoops();
		}
	}, {
		key: 'getMyHoops',
		value: function getMyHoops() {
			var _this2 = this;

			_API2.default.getMyHoops(function (hoops) {
				_this2.setState({ myHoops: hoops });
			}, function (response) {
				alert('Failed to get my hoops!');
			});
		}
	}, {
		key: 'getOtherHoops',
		value: function getOtherHoops() {
			var _this3 = this;

			_API2.default.getOtherHoops(function (hoops) {
				_this3.setState({ otherHoops: hoops });
			}, function (response) {
				alert('Failed to get other hoops');
			});
		}
	}]);

	return Profile;
}(_react2.default.Component);

var ProfileForm = function (_React$Component2) {
	_inherits(ProfileForm, _React$Component2);

	function ProfileForm() {
		_classCallCheck(this, ProfileForm);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ProfileForm).apply(this, arguments));
	}

	_createClass(ProfileForm, [{
		key: 'render',
		value: function render() {
			var user = this.props.user;

			return _react2.default.createElement(
				'form',
				{ ref: 'userProfileForm' },
				_react2.default.createElement('input', { type: 'text', name: 'name', defaultValue: user.firstname + ' ' + user.lastname }),
				_react2.default.createElement('br', null),
				_react2.default.createElement('input', { type: 'date', name: 'birthdate', defaultValue: user.birthdate }),
				_react2.default.createElement('input', { type: 'gender', name: 'gender', defaultValue: user.gender })
			);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var form = this.refs.userProfileForm;

			_API2.default.updateUser({
				name: form.elements['name'].value,
				birthdate: form.elements['birthdate'].value,
				gender: form.elements['gender'].value
			}, function () {
				_Dispatcher2.default.dispatch({ type: 'refresh-user' });
			}, function () {});
		}
	}]);

	return ProfileForm;
}(_react2.default.Component);

module.exports = Profile;