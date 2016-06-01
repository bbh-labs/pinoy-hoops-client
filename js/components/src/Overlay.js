'use strict'

import React from 'react';
import { Link } from 'react-router';

import API from './API'
import Dispatcher from './Dispatcher'

class Overlay extends React.Component {
	render() {
		let name = this.state.name;
		let data = this.state.data;

		switch (name) {
		case 'add-story':
			return <AddStory hoopID={ data.hoopID } />

		case 'share-story':
			return <ShareStory storyID={ data.storyID } />

		case 'share-hoop':
			return <ShareHoop hoopID={ data.hoopID } />

		default:
			return null;
		}
	}
	state = {
		name: null,
		data: null,
	}
	componentDidMount() {
		this.dispatcherID = Dispatcher.register((payload) => {
			switch (payload.type) {
			case 'overlay':
				this.setState({ name: payload.name, data: payload.data });
				break;

			case 'overlay-close':
				this.setState({ name: null, data: null });
				break;
			}
		});
	}
	componentWillUnmount() {
		Dispatcher.unregister(this.dispatcherID);
	}
}

class AddStory extends React.Component {
	render() {
		return (
			<form className='add' onSubmit={ this.submit }>
				<div className='whitebox'>
					<p style={{ float: 'right', margin: '10px' }} onClick={ this.close }>X</p>
					<h4>Add your story</h4>
					<img src='/images/dummy01.jpg' ref='image' />
					<input type='file' name='image' onChange={ this.previewImage } accept='image/*' />
					<input type='text' placeholder='Title' name='name' /><br />
					<input type='hidden' name='description' value='' /> 
					<input type='hidden' name='hoop_id' value={ this.props.hoopID } /> 
					<button>Submit</button>
				</div>
			</form>
		)
	}
	submit = (event) => {
		event.preventDefault();

		API.addStory(new FormData(event.target), () => {
			this.close();
		}, () => {
			alert('Failed to add story');
			this.close();
		});
	}
	close() {
		Dispatcher.dispatch({ type: 'overlay-close' });
	}
	previewImage = (event) => {
		let preview = this.refs.image;
		let file = event.target.files[0];
		let reader = new FileReader();

		reader.addEventListener('load', function() {
			preview.src = reader.result;
		});

		if (file)
			reader.readAsDataURL(file);
	}
}

class ShareStory extends React.Component {
	render() {
		let shareURL = BASE_URL + '/story/' + this.props.storyID;

		return (
			<div className='sharebox'>
				<div className='whitebox'>
					<p style={{ float: 'right', margin: '10px' }} onClick={ this.close }>X</p>
					<h4>Share</h4>
					<li>
						<a href={ 'http://www.facebook.com/sharer.php?u=' + shareURL } target='_blank'>
							<img src='/images/icon_fb.png' alt='Facebook' />
						</a>
					</li>
					<li>
						<a href={ 'https://twitter.com/share?url=' + shareURL } target='_blank'>
							<img src='/images/icon_twitter.png' alt='Twitter' />
						</a>
					</li>
					<li>
						<a href={ 'https://plus.google.com/share?url=' + shareURL } target='_blank'>
							<img src='/images/icon_gmail.png' alt='Google' />
						</a>
					</li>
				</div>
			</div>
		)
	}
	close() {
		Dispatcher.dispatch({ type: 'overlay-close' });
	}
}

class ShareHoop extends React.Component {
	render() {
		let shareURL = BASE_URL + '/hoop/' + this.props.hoopID;

		return (
			<div className='sharebox'>
				<div className='whitebox'>
					<p style={{ float: 'right', margin: '10px' }} onClick={ this.close }>X</p>
					<h4>Share</h4>
					<li>
						<a href={ 'http://www.facebook.com/sharer.php?u=' + shareURL } target='_blank'>
							<img src='/images/icon_fb.png' alt='Facebook' />
						</a>
					</li>
					<li>
						<a href={ 'https://twitter.com/share?url=' + shareURL } target='_blank'>
							<img src='/images/icon_twitter.png' alt='Twitter' />
						</a>
					</li>
					<li>
						<a href={ 'https://plus.google.com/share?url=' + shareURL } target='_blank'>
							<img src='/images/icon_gmail.png' alt='Google' />
						</a>
					</li>
				</div>
			</div>
		)
	}
	close() {
		Dispatcher.dispatch({ type: 'overlay-close' });
	}
}

module.exports = Overlay;
