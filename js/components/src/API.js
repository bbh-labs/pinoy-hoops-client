'use strict'

import $ from 'jquery'

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
			image_url: 'images/hoop01.jpg',
			viewCount: 3/3,
		},
		{
			id: 2,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/hoop02.jpg',
			viewCount: 3/3,
		},
		{
			id: 3,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/hoop03.jpg',
			viewCount: 3/3,
		},
		{
			id: 4,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/hoop04.jpg',
			viewCount: 3/3,
		},
		{
			id: 5,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/hoop05.jpg',
			viewCount: 3/3,
		},
		{
			id: 6,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/hoop06.jpg',
			viewCount: 3/3
		},
		{
			id: 7,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/hoop07.jpg',
			viewCount: 3/3,
		},
		{
			id: 8,
			hoop_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			image_url: 'images/hoop08.jpg',
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
				featured_stories: {
					hoop: STORIES[0],
					court: STORIES[0],
					crew: STORIES[0],
				},
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
				featured_stories: {
					hoop: STORIES[1],
					court: STORIES[0],
					crew: STORIES[0],
				},
			},
		},
		{
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
					crew: STORIES[0],
				},
			},
		},
		{
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
					crew: STORIES[0],
				},
			},
		},
		{
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
					crew: STORIES[0],
				},
			},
		},
		{
			id: 6,
			user_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			latitude: 14.1980,
			longitude: 121.2446,
			data: {
				featured_stories: {
					hoop: STORIES[5],
					court: STORIES[0],
					crew: STORIES[0],
				},
			},
		},
		{
			id: 7,
			user_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			latitude: 14.1980,
			longitude: 121.2446,
			data: {
				featured_stories: {
					hoop: STORIES[6],
					court: STORIES[0],
					crew: STORIES[0],
				},
			},
		},
		{
			id: 8,
			user_id: 1,
			user: OTHER_USER,
			name: 'La Concordia',
			description: LOREM_IPSUM,
			latitude: 14.1980,
			longitude: 121.2446,
			data: {
				featured_stories: {
					hoop: STORIES[7],
					court: STORIES[0],
					crew: STORIES[0],
				},
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
	static updateUserBackground(data, done, fail) {
		if (MOCKUP) {
			done();
		} else {
			$.ajax({
				url: '/api/user/background',
				method: 'POST',
				data: data,
				processData: false,
				contentType: false,
			}).done(done).fail(fail);
		}
	}
	static hasLikedHoop(data, done, fail) {
		if (MOCKUP) {
			done(false);
		} else {
			$.ajax({
				url: '/api/hoop/mylike',
				method: 'GET',
				data: data,
				dataType: 'json',
			}).done(done).fail(fail);
		}
	}
}

module.exports = API;
