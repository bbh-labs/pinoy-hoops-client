'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (MOCKUP) {
	var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum quis sem a tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquet sed sem quis suscipit. Maecenas viverra metus ut nisl ornare molestie et id nisi. Sed eu elementum urna. Phasellus id dui erat. Integer volutpat ut quam ut mollis.';

	var USER = {
		id: 2,
		firstname: 'Jane',
		lastname: 'Doe',
		gender: 'female',
		birthdate: '1972-03-05',
		description: LOREM_IPSUM,
		email: 'jane.doe@example.com',
		image_url: 'images/avatar.png'
	};

	var OTHER_USER = {
		id: 1,
		firstname: 'John',
		lastname: 'Doe',
		gender: 'male',
		birthdate: '1969-12-28',
		description: LOREM_IPSUM,
		email: 'john.doe@example.com',
		image_url: 'images/user01.jpg'
	};

	var STORIES = [{
		id: 1,
		hoop_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		image_url: 'images/hoop01.jpg',
		viewCount: 3 / 3
	}, {
		id: 2,
		hoop_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		image_url: 'images/hoop02.jpg',
		viewCount: 3 / 3
	}, {
		id: 3,
		hoop_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		image_url: 'images/hoop03.jpg',
		viewCount: 3 / 3
	}, {
		id: 4,
		hoop_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		image_url: 'images/hoop04.jpg',
		viewCount: 3 / 3
	}, {
		id: 5,
		hoop_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		image_url: 'images/hoop05.jpg',
		viewCount: 3 / 3
	}, {
		id: 6,
		hoop_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		image_url: 'images/hoop06.jpg',
		viewCount: 3 / 3
	}, {
		id: 7,
		hoop_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		image_url: 'images/hoop07.jpg',
		viewCount: 3 / 3
	}, {
		id: 8,
		hoop_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		image_url: 'images/hoop08.jpg',
		viewCount: 3 / 3
	}];

	var HOOPS = [{
		id: 1,
		user_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		latitude: 14.5980,
		longitude: 120.9446,
		data: {
			featured_stories: {
				hoop: STORIES[0],
				court: STORIES[0],
				crew: STORIES[0]
			}
		}
	}, {
		id: 2,
		user_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		latitude: 14.1980,
		longitude: 121.2446,
		data: {
			featured_stories: {
				hoop: STORIES[1],
				court: STORIES[0],
				crew: STORIES[0]
			}
		}
	}, {
		id: 3,
		user_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		latitude: 14.1980,
		longitude: 121.2446,
		data: {
			featured_stories: {
				hoop: STORIES[2],
				court: STORIES[0],
				crew: STORIES[0]
			}
		}
	}, {
		id: 4,
		user_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		latitude: 14.1980,
		longitude: 121.2446,
		data: {
			featured_stories: {
				hoop: STORIES[3],
				court: STORIES[0],
				crew: STORIES[0]
			}
		}
	}, {
		id: 5,
		user_id: 1,
		user: OTHER_USER,
		name: 'La Concordia',
		description: LOREM_IPSUM,
		latitude: 14.1980,
		longitude: 121.2446,
		data: {
			featured_stories: {
				hoop: STORIES[4],
				court: STORIES[0],
				crew: STORIES[0]
			}
		}
	}];

	for (var i in STORIES) {
		STORIES[i].hoop = HOOPS[0];
	}

	var COMMENTS = [{
		id: 1,
		user_id: 1,
		hoop_id: 1,
		story_id: 1,
		user: OTHER_USER,
		text: 'First comment!',
		data: {
			user: OTHER_USER
		}
	}, {
		id: 1,
		user_id: 1,
		hoop_id: 1,
		story_id: 1,
		user: OTHER_USER,
		text: 'Second comment!',
		data: {
			user: OTHER_USER
		}
	}];

	var LIKES = 40;

	var ACTIVITIES = [{
		user_id: 1,
		type: 1,
		hoop_id: 1,
		story_id: 1,
		data: {
			user: OTHER_USER,
			hoop: HOOPS[0]
		}
	}, {
		user_id: 1,
		type: 2,
		hoop_id: 1,
		story_id: 2,
		data: {
			user: OTHER_USER,
			story: STORIES[0]
		}
	}, {
		user_id: 1,
		type: 102,
		hoop_id: 1,
		story_id: 1,
		data: {
			user: OTHER_USER,
			story: STORIES[0],
			comment: COMMENTS[0]
		}
	}];

	var user = null;
}

var API = function () {
	function API() {
		_classCallCheck(this, API);
	}

	_createClass(API, null, [{
		key: 'login',
		value: function login(data, done, fail) {
			if (MOCKUP) {
				user = USER;
				done();
			} else {
				_jquery2.default.ajax({
					url: '/api/login',
					method: 'POST',
					data: data,
					processData: false,
					contentType: false
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'signup',
		value: function signup(data, done, fail) {
			if (MOCKUP) {
				user = USER;
				done();
			} else {
				_jquery2.default.ajax({
					url: '/api/signup',
					method: 'POST',
					data: data,
					processData: false,
					contentType: false
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'isLoggedIn',
		value: function isLoggedIn(done, fail) {
			if (MOCKUP) {
				done(user);
			} else {
				_jquery2.default.ajax({
					url: '/api/login',
					method: 'GET',
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'logout',
		value: function logout(done, fail) {
			if (MOCKUP) {
				user = null;
				done();
			} else {
				_jquery2.default.ajax({
					url: '/api/logout',
					method: 'POST'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'updateUser',
		value: function updateUser(data, done, fail) {
			if (MOCKUP) {
				done();
			} else {
				_jquery2.default.ajax({
					url: '/api/user',
					method: 'PATCH',
					data: data
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'addHoop',
		value: function addHoop(data, done, fail) {
			if (MOCKUP) {
				done();
			} else {
				_jquery2.default.ajax({
					url: '/api/hoop',
					method: 'POST',
					data: data,
					processData: false,
					contentType: false
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'addStory',
		value: function addStory(data, done, fail) {
			if (MOCKUP) {
				done();
			} else {
				_jquery2.default.ajax({
					url: '/api/story',
					method: 'POST',
					data: data,
					processData: false,
					contentType: false
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'getHoop',
		value: function getHoop(data, done, fail) {
			if (MOCKUP) {
				done(HOOPS[0]);
			} else {
				_jquery2.default.ajax({
					url: '/api/hoop',
					method: 'GET',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'getHoops',
		value: function getHoops(data, done, fail) {
			if (MOCKUP) {
				done(HOOPS);
			} else {
				_jquery2.default.ajax({
					url: '/api/hoops',
					method: 'GET',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'getStory',
		value: function getStory(data, done, fail) {
			if (MOCKUP) {
				done(STORIES[0]);
			} else {
				_jquery2.default.ajax({
					url: '/api/story',
					method: 'GET',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'getStories',
		value: function getStories(data, done, fail) {
			if (MOCKUP) {
				done(STORIES);
			} else {
				_jquery2.default.ajax({
					url: '/api/stories',
					method: 'GET',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'getActivities',
		value: function getActivities(done, fail) {
			if (MOCKUP) {
				done(ACTIVITIES);
			} else {
				_jquery2.default.ajax({
					url: '/api/activities',
					method: 'GET',
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'likeHoop',
		value: function likeHoop(data, done, fail) {
			if (MOCKUP) {
				done();
			} else {
				_jquery2.default.ajax({
					url: '/api/like/hoop',
					method: 'POST',
					data: data
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'likeStory',
		value: function likeStory(data, done, fail) {
			if (MOCKUP) {
				done();
			} else {
				_jquery2.default.ajax({
					url: '/api/like/story',
					method: 'POST',
					data: data
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'comment',
		value: function comment(data, done, fail) {
			if (MOCKUP) {
				done();
			} else {
				_jquery2.default.ajax({
					url: '/api/comment',
					method: 'POST',
					data: data
				}).done(done).fail(fail);
			}
		}

		// Extra

	}, {
		key: 'getNearbyHoops',
		value: function getNearbyHoops(data, done, fail) {
			if (MOCKUP) {
				done(HOOPS);
			} else {
				if (!API.geolocating) {
					if ('geolocation' in navigator) {
						navigator.geolocation.getCurrentPosition(function (position) {
							API.geolocating = false;

							_jquery2.default.ajax({
								url: '/api/hoops/nearby',
								method: 'GET',
								data: _jquery2.default.extend({
									latitude: position.coords.latitude,
									longitude: position.coords.longitude
								}, data),
								dataType: 'json'
							}).done(done).fail(fail);
						});

						API.geolocating = true;
					} else {
						alert('Sorry, your device or browser doesn\'t support geolocation!');
					}
				}
			}
		}
	}, {
		key: 'getPopularHoops',
		value: function getPopularHoops(data, done, fail) {
			if (MOCKUP) {
				done(HOOPS);
			} else {
				_jquery2.default.ajax({
					url: '/api/hoops/popular',
					method: 'GET',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'getLatestHoops',
		value: function getLatestHoops(data, done, fail) {
			if (MOCKUP) {
				done(HOOPS);
			} else {
				_jquery2.default.ajax({
					url: '/api/hoops/latest',
					method: 'GET',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'getLatestStories',
		value: function getLatestStories(data, done, fail) {
			if (MOCKUP) {
				done(STORIES);
			} else {
				_jquery2.default.ajax({
					url: '/api/stories/latest',
					method: 'GET',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'getStoryComments',
		value: function getStoryComments(data, done, fail) {
			if (MOCKUP) {
				done(COMMENTS);
			} else {
				_jquery2.default.ajax({
					url: '/api/story/comments',
					method: 'GET',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'getHoopLikes',
		value: function getHoopLikes(data, done, fail) {
			if (MOCKUP) {
				done(LIKES);
			} else {
				_jquery2.default.ajax({
					url: '/api/hoop/likes',
					method: 'GET',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'getStoryLikes',
		value: function getStoryLikes(data, done, fail) {
			if (MOCKUP) {
				done(LIKES);
			} else {
				_jquery2.default.ajax({
					url: '/api/story/likes',
					method: 'GET',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'viewHoop',
		value: function viewHoop(data, done, fail) {
			if (MOCKUP) {
				done();
			} else {
				_jquery2.default.ajax({
					url: '/api/view/hoop',
					method: 'PATCH',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'viewStory',
		value: function viewStory(data, done, fail) {
			if (MOCKUP) {} else {
				_jquery2.default.ajax({
					url: '/api/view/story',
					method: 'PATCH',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'commentStory',
		value: function commentStory(data, done, fail) {
			if (MOCKUP) {
				done();
			} else {
				_jquery2.default.ajax({
					url: '/api/comment/story',
					method: 'PATCH',
					data: data
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'getMyHoops',
		value: function getMyHoops(done, fail) {
			if (MOCKUP) {
				done(HOOPS);
			} else {
				_jquery2.default.ajax({
					url: '/api/user/myhoops',
					method: 'GET',
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'getOtherHoops',
		value: function getOtherHoops(done, fail) {
			if (MOCKUP) {
				done(HOOPS);
			} else {
				_jquery2.default.ajax({
					url: '/api/user/otherhoops',
					method: 'GET',
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'updateUserImage',
		value: function updateUserImage(data, done, fail) {
			if (MOCKUP) {
				done();
			} else {
				_jquery2.default.ajax({
					url: '/api/user/image',
					method: 'POST',
					data: data,
					processData: false,
					contentType: false
				}).done(done).fail(fail);
			}
		}
	}, {
		key: 'hasLikedHoop',
		value: function hasLikedHoop(data, done, fail) {
			if (MOCKUP) {
				done(false);
			} else {
				_jquery2.default.ajax({
					url: '/api/hoop/mylike',
					method: 'GET',
					data: data,
					dataType: 'json'
				}).done(done).fail(fail);
			}
		}
	}]);

	return API;
}();

API.geolocating = false;


module.exports = API;