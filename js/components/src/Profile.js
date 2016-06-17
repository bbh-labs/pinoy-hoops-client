'use strict'

import React from 'react'
import { Link } from 'react-router'

import API from './API'
import Dispatcher from './Dispatcher'

class Profile extends React.Component {
	render() {
		let user = this.props.user;
		let tab = this.state.tab;
		let editing = this.state.editing;

		if (!user)
			return null;

		return (
				<div id="profile">
					<form ref='userImageForm' className='picture'>
						<label htmlFor='user-image'>
							<div className="userinfo">
								<img src={ contentURL(user.image_url, '/images/avatar.png') } />
								<h2>Username</h2>
							</div>
						</label>
						<div className="coverphoto">
							<button>Change cover photo</button>
						</div>
					</form>


					<div className='myhoops'>
						<div className='filter'>
							<p onClick={ this.setTab.bind(this, 'my-hoops') } style={{ color: tab == 'my-hoops' && '#ff6b00' }}>My hoops</p>
							<p onClick={ this.setTab.bind(this, 'other-hoops') } style={{ color: tab == 'other-hoops' && '#ff6b00' }}>Other hoops</p>
						</div>

						<div className='gallery'>
							{ this.hoops() }
						</div>
					</div>

				</div>
		)
	}
	state = {
		myHoops: null,
		otherHoops: null,
		tab: 'my-hoops',
		editing: false,
	}
	componentDidMount() {
	   this.getMyHoops();
	   this.getOtherHoops();
	}
	profileInfo = () => {
		let user = this.props.user;
		let editing = this.state.editing;

		if (editing) {
			return <ProfileForm user={ user } />
		} else {
			return (
				<div>
					<h3>{ user.firstname } { user.lastname }</h3>
					<p>{ user.birthdate }, { user.gender }</p>
				</div>
			)
		}
	}
	hoops = () => {
		let myHoops = this.state.myHoops;
		let otherHoops = this.state.otherHoops;
		let tab = this.state.tab;

		switch (tab) {
		case 'my-hoops':
			return myHoops ? myHoops.map(function(hoop) {
				let featuredStories = hoop.data.featured_stories;

				let story = featuredStories['hoop'] ? featuredStories['hoop'] :
						featuredStories['court'] ? featuredStories['court'] :
						featuredStories['crew'] ? featuredStories['crew'] : null;

				return (
					<Link key={ hoop.id } to={ '/hoop/' + hoop.id }>
						<img key={ story.id } src={ contentURL(story.image_url) } />
					</Link>
				)
			}) : null;

		case 'other-hoops':
			return otherHoops ? otherHoops.map(function(hoop) {
				let featuredStories = hoop.data.featured_stories;

				let story = featuredStories['hoop'] ? featuredStories['hoop'] :
						featuredStories['court'] ? featuredStories['court'] :
						featuredStories['crew'] ? featuredStories['crew'] : null;
				return (
					<Link key={ hoop.id } to={ '/hoop/' + hoop.id }>
						<img key={ story.id } src={ contentURL(story.image_url) } />
					</Link>
				)
			}) : null;
		}
	}
	getMyHoops() {
		API.getMyHoops((hoops) => {
			this.setState({ myHoops: hoops });
		}, (response) => {
			alert('Failed to get my hoops!');
		});
	}
	getOtherHoops() {
		API.getOtherHoops((hoops) => {
			this.setState({ otherHoops: hoops });
		}, (response) => {
			alert('Failed to get other hoops');
		});
	}
	setTab = (tab) => {
		this.setState({ tab: tab });
	}
	handleUserImage = (event) => {
		API.updateUserImage(new FormData(this.refs.userImageForm), () => {
			Dispatcher.dispatch({ type: 'refresh-user' });
		});
	}
	toggleEdit = () => {
		let editing = this.state.editing;

		this.setState({ editing: !editing });
	}
}

class ProfileForm extends React.Component {
	render() {
		let user = this.props.user;

		return (
			<form ref='userProfileForm'>
				<input type='text' name='name' defaultValue={ user.firstname + ' ' + user.lastname } /><br />
				<input type='date' name='birthdate' defaultValue={ user.birthdate } />
				<input type='gender' name='gender' defaultValue={ user.gender } />
			</form>
		)
	}
	componentWillUnmount() {
		let form = this.refs.userProfileForm;

		API.updateUser({
			name: form.elements['name'].value,
			birthdate: form.elements['birthdate'].value,
			gender: form.elements['gender'].value,
		}, () => {
			Dispatcher.dispatch({ type: 'refresh-user' });
		}, () => {});
	}
}

module.exports = Profile;
