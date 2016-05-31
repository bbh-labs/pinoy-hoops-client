'use strict'

import React from 'react';
import { Link } from 'react-router';
import browserHistory from './browserHistory'

import API from './API';
import Dispatcher from './Dispatcher';

class Story extends React.Component {
    render() {
        let story = this.state.story;
        if (!story)
            return null;

        let comments = this.state.comments;
        let likes = this.state.likes;

        return (
            <div className='site-wrap'>
                 <div className='hoopstory'>
                    <div className='heroimage'>
                        <img src={ story.image_url ? INDEX + story.image_url : '/images/avatar.png' } />
                        <h2>{ story.name }</h2>
                    </div>
                    <div className='hoop-info'>
                        <div className='userprofile'>
                            <img src={ story.user.image_url ? INDEX + story.user.image_url : '/images/avatar.png' } />
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
                    <form className='comment' onSubmit={ this.comment }>
                        <input placeholder='add a comment' type='text' name='text' /><button>Send</button>
                    </form> 	
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

        API.viewStory({ 'story-id': storyID });
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
    comment = (event) => {
        event.preventDefault();

        let story = this.state.story;
        if (story) {
            let text = event.target.elements['text'].value;
            API.commentStory({ 'story-id': story.id, text: text }, () => {
                this.getComments(story.id);
            }, (response) => {
                alert('Failed to comment on the story!');
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
        if (!comments) {
            return null;
        }

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

module.exports = Story;
