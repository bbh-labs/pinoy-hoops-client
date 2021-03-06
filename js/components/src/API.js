'use strict'

import $ from 'jquery'

if (MOCKUP) {
	var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus mauris id tincidunt aliquam. Aenean facilisis velit ut erat vehicula, vel tincidunt quam vehicula. Nam tristique massa nec ultrices volutpat.';

	var USER = {
		id: 2,
		firstname: 'Jane',
		lastname: 'Doe',
		gender: 'female',
		birthdate: '1972-03-05',
		description: LOREM_IPSUM,
		email: 'jane.doe@example.com',
		image_url: 'images/avatar.png',
	};

	var OTHER_USER = {
		id: 1,
		firstname: 'John',
		lastname: 'Doe',
		gender: 'male',
		birthdate: '1969-12-28',
		description: LOREM_IPSUM,
		email: 'john.doe@example.com',
		image_url: 'images/user01.jpg',
	};

	var STORIES = [
		{
			id: 1,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/dummy01.jpg',
			viewCount: 3/3,
		},
		{
			id: 2,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/dummy02.jpg',
			viewCount: 3/3,
		},
		{
			id: 3,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/dummy03.jpg',
			viewCount: 3/3,
		},
		{
			id: 4,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/dummy04.jpg',
			viewCount: 3/3,
		},
		{
			id: 5,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/dummy05.jpg',
			viewCount: 3/3,
		},
		{
			id: 6,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/dummy06.jpg',
			viewCount: 3/3
		},
		{
			id: 7,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/dummy07.jpg',
			viewCount: 3/3,
		},
		{
			id: 8,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/dummy08.jpg',
			viewCount: 3/3,
		},
	];

	var HOOPS = [
		{
			id: 1,
			user_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			latitude: 14.5980,
			longitude: 120.9446,
			data: {
				featured_story: STORIES[0],
			},
		},
		{
			id: 2,
			user_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			latitude: 14.1980,
			longitude: 121.2446,
			data: {
				featured_story: STORIES[0],
			},
		},
	];

	for (var i in STORIES) {
		STORIES[i].hoop = HOOPS[0];
	}

	var COMMENTS = [
		{
			id: 1,
			user_id: 1,
			hoop_id: 1,
			story_id: 1,
			user: OTHER_USER,
			text: 'First comment!',
			data: {
				user: OTHER_USER,
			},
		},
		{
			id: 1,
			user_id: 1,
			hoop_id: 1,
			story_id: 1,
			user: OTHER_USER,
			text: 'Second comment!',
			data: {
				user: OTHER_USER,
			},
		},
	];

	var LIKES = 40;

	var ACTIVITIES = [
		{
			user_id: 1,
			type: 1,
			hoop_id: 1,
			story_id: 1,
			data: {
				user: OTHER_USER,
				hoop: HOOPS[0],
			},
		},
		{
			user_id: 1,
			type: 2,
			hoop_id: 1,
			story_id: 2,
			data: {
				user: OTHER_USER,
				story: STORIES[0],
			},
		},
		{
			user_id: 1,
			type: 102,
			hoop_id: 1,
			story_id: 1,
			data: {
				user: OTHER_USER,
				story: STORIES[0],
				comment: COMMENTS[0],
			},
		},
	];

	var user = null;
}

class API {
	static geolocating = false
	static login(data, done, fail) {
		if (MOCKUP) {
			user = USER;
			done();
		} else {
			$.ajax({
				url: '/api/login',
				method: 'POST',
				data: data,
				processData: false,
				contentType: false,
			}).done(done).fail(fail);
		}
	}
	static signup(data, done, fail) {
		if (MOCKUP) {
			user = USER;
			done();
		} else {
			$.ajax({
				url: '/api/signup',
				method: 'POST',
				data: data,
				processData: false,
				contentType: false,
			}).done(done).fail(fail);
		}
	}
	static isLoggedIn(done, fail) {
		if (MOCKUP) {
			done(user);
		} else {
			$.ajax({
				url: '/api/login',
				method: 'GET',
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static logout(done, fail) {
		if (MOCKUP) {
			user = null;
			done();
		} else {
			$.ajax({
				url: '/api/logout',
				method: 'POST',
			}).done(done).fail(fail);
		}
	}
	static updateUser(data, done, fail) {
		if (MOCKUP) {
			done();
		} else {
			$.ajax({
				url: '/api/user',
				method: 'PATCH',
				data: data,
			}).done(done).fail(fail);
		}
	}
	static addHoop(data, done, fail) {
		if (MOCKUP) {
			done();
		} else {
			$.ajax({
				url: '/api/hoop',
				method: 'POST',
				data: data,
				processData: false,
				contentType: false,
			}).done(done).fail(fail);
		}
	}
	static addStory(data, done, fail) {
		if (MOCKUP) {
			done();
		} else {
			$.ajax({
				url: '/api/story',
				method: 'POST',
				data: data,
				processData: false,
				contentType: false,
			}).done(done).fail(fail);
		}
	}
	static getHoop(data, done, fail) {
		if (MOCKUP) {
			done(HOOPS[0]);
		} else {
			$.ajax({
				url: '/api/hoop',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getHoops(data, done, fail) {
		if (MOCKUP) {
			done(HOOPS);
		} else {
			$.ajax({
				url: '/api/hoops',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getStory(data, done, fail) {
		if (MOCKUP) {
			done(STORIES[0]);
		} else {
			$.ajax({
				url: '/api/story',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getStories(data, done, fail) {
		if (MOCKUP) {
			done(STORIES);
		} else {
			$.ajax({
				url: '/api/stories',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getActivities(done, fail) {
		if (MOCKUP) {
			done(ACTIVITIES);
		} else {
			$.ajax({
				url: '/api/activities',
				method: 'GET',
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static likeHoop(data, done, fail) {
		if (MOCKUP) {
			done();
		} else {
			$.ajax({
				url: '/api/like/hoop',
				method: 'POST',
				data: data,
			}).done(done).fail(fail);
		}
	}
	static likeStory(data, done, fail) {
		if (MOCKUP) {
			done();
		} else {
			$.ajax({
				url: '/api/like/story',
				method: 'POST',
				data: data,
			}).done(done).fail(fail);
		}
	}
	static comment(data, done, fail) {
		if (MOCKUP) {
			done();
		} else {
			$.ajax({
				url: '/api/comment',
				method: 'POST',
				data: data,
			}).done(done).fail(fail);
		}
	}

	// Extra
	static getNearbyHoops(data, done, fail) {
		if (MOCKUP) {
			done(HOOPS);
		} else {
			if (!API.geolocating) {
				if ('geolocation' in navigator) {
					navigator.geolocation.getCurrentPosition(function(position) {
						API.geolocating = false;

						$.ajax({
							url: '/api/hoops/nearby',
							method: 'GET',
							data: $.extend({
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
							}, data),
							dataType: 'json',
						}).done(done).fail(fail);
					});

					API.geolocating = true;
				} else {
					alert('Sorry, your device or browser doesn\'t support geolocation!');
				}
			}
		}
	}
	static getPopularHoops(data, done, fail) {
		if (MOCKUP) {
			done(HOOPS);
		} else {
			$.ajax({
				url: '/api/hoops/popular',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getLatestHoops(data, done, fail) {
		if (MOCKUP) {
			done(HOOPS);
		} else {
			$.ajax({
				url: '/api/hoops/latest',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getMostCommentedStories(data, done, fail) {
		if (MOCKUP) {
			done(HOOPS);
		} else {
			$.ajax({
				url: '/api/stories/mostcommented',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getMostLikedStories(data, done, fail) {
		if (MOCKUP) {
			done(HOOPS);
		} else {
			$.ajax({
				url: '/api/stories/mostliked',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getMostViewedStories(data, done, fail) {
		if (MOCKUP) {
			done(STORIES);
		} else {
			$.ajax({
				url: '/api/stories/mostviewed',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getLatestStories(data, done, fail) {
		if (MOCKUP) {
			done(STORIES);
		} else {
			$.ajax({
				url: '/api/stories/latest',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getStoryComments(data, done, fail) {
		if (MOCKUP) {
			done(COMMENTS);
		} else {
			$.ajax({
				url: '/api/story/comments',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getHoopLikes(data, done, fail) {
		if (MOCKUP) {
			done(LIKES);
		} else {
			$.ajax({
				url: '/api/hoop/likes',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getStoryLikes(data, done, fail) {
		if (MOCKUP) {
			done(LIKES);
		} else {
			$.ajax({
				url: '/api/story/likes',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static viewHoop(data, done, fail) {
		if (MOCKUP) {
			done();
		} else {
			$.ajax({
				url: '/api/view/hoop',
				method: 'PATCH',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static viewStory(data, done, fail) {
		if (MOCKUP) {
		} else {
			$.ajax({
				url: '/api/view/story',
				method: 'PATCH',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static commentStory(data, done, fail) {
		if (MOCKUP) {
			done();
		} else {
			$.ajax({
				url: '/api/comment/story',
				method: 'PATCH',
				data: data,
			}).done(done).fail(fail);
		}
	}
	static updateUserLastActivityCheckTime(data, done, fail) {
		if (MOCKUP) {
			done();
		} else {
			$.ajax({
				url: '/api/user/lastactivitychecktime',
				method: 'PATCH',
				data: data,
			}).done(done).fail(fail);
		}
	}
	static getMyHoops(done, fail) {
		if (MOCKUP) {
			done(HOOPS);
		} else {
			$.ajax({
				url: '/api/user/myhoops',
				method: 'GET',
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static getOtherHoops(done, fail) {
		if (MOCKUP) {
			done(HOOPS);
		} else {
			$.ajax({
				url: '/api/user/otherhoops',
				method: 'GET',
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
	static updateUserImage(data, done, fail) {
		if (MOCKUP) {
			done();
		} else {
			$.ajax({
				url: '/api/user/image',
				method: 'POST',
				data: data,
				processData: false,
				contentType: false,
			}).done(done).fail(fail);
		}
	}
}

module.exports = API;
