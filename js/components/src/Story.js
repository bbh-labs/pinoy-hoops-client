'use strict'

import React from 'react';
import { Link } from 'react-router';
import browserHistory from './browserHistory'

import API from './API';
import Dispatcher from './Dispatcher';

class Story extends React.Component {
	render() {
		let user = this.props.user;
		let story = this.state.story;
		let comments = this.state.comments;
		let likes = this.state.likes;

		if (!story)
			return null;

		return (
			<div className='site-wrap'>
				 <div className='hoopstory'>
					<div className='heroimage'>
						<img src={ contentURL(story.image_url, '/images/avatar.png') } />
						<h2>{ story.name }</h2>
					</div>
					<div className='hoop-info'>
						<div className='userprofile'>
							<img src={ contentURL(story.user.image_url, '/images/avatar.png') } />
							<h6>{ story.user.firstname } { story.user.lastname }</h6>
						</div>
						<div className='icons'>
							<p>{ likes } likes</p>
							<img src='/images/icon_love.png' onClick={ this.like } />
							<img src='/images/icon_share.png' onClick={ this.share } />
						</div>
						<div className='description'>
							<p>{ story.description }</p>
						</div>
					</div>
					<hr/>
					<div className='usercomment'>
						{ this.comments() }
					</div>
					{ user ? <CommentBox story={ story } /> : null }
				 </div>
			</div>
		)
	}
	state = {
		story: null,
		comments: null,
		likes: 0,
	}
	componentDidMount() {
		let storyID = this.props.params.storyID;

		API.getStory({ storyID: storyID }, (story) => {
			this.setState({ story: story });
		}, (response) => {
			alert('Failed to get most story');
		});

		this.getLikes(storyID);
		this.getComments(storyID);

		this.dispatcherID = Dispatcher.register((payload) => {
			switch (payload.type) {
			case 'story-get-comments':
				this.getComments(storyID);
				break;
			}
		});

		API.viewStory({ 'story-id': storyID });
	}
	componentWillUnmount() {
		Dispatcher.unregister(this.dispatcherID);
	}
	like = () => {
		let story = this.state.story;

		if (story) {
			API.likeStory({ 'story-id': story.id }, () => {
				this.getLikes(story.id);
			}, (response) => {
				alert('Failed to like story');
			});
		}
	}
	getLikes = (storyID) => {
		API.getStoryLikes({ 'story-id': storyID }, (likes) => {
			this.setState({ likes: likes  });
		}, (response) => {
			alert('Failed to get likes count');
		});
	}
	getComments = (storyID) => {
		API.getStoryComments({ 'story-id': storyID }, (comments) => {
			this.setState({ comments: comments  });
		}, (response) => {
			alert('Failed to get story comments');
		});
	}
	comments = () => {
		let comments = this.state.comments;

		if (!comments)
			return null;

		return comments.map(function(comment, i) {
			return <p key={ i }><strong>{ comment.user.firstname } { comment.user.lastname }</strong> { comment.text }</p>;
		});
	}
	share = () => {
		let story = this.state.story;

		if (story)
			Dispatcher.dispatch({ type: 'overlay', name: 'share-story', data: { storyID: story.id } });
	}
}

class CommentBox extends React.Component {
	render() {
		return (
			<form className='comment' onSubmit={ this.comment }>
				<input placeholder='add a comment' type='text' name='text' /><button>Send</button>
			</form>
		)
	}
	comment = (event) => {
		event.preventDefault();

		let story = this.props.story;

		if (story) {
			let form = event.target;
			let text = form.elements['text'].value;

			API.commentStory({ 'story-id': story.id, text: text }, () => {
				form.reset();

				this.dispatchGetComments();
			}, (response) => {
				alert('Failed to comment on the story!');
			});
		}
	}
	dispatchGetComments = () => {
		Dispatcher.dispatch({ type: 'story-get-comments' });
	}
}

module.exports = Story;
