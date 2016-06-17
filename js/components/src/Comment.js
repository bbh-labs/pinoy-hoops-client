'use strict'

import React from 'react'
import { Link } from 'react-router'

import API from './API'
import Dispatcher from './Dispatcher'

class Comment extends React.Component {
	render() {
    return (
      <div id="comment">
				<div className="commentbox">
						<input type="text" name="comment"/>
					 <button>send</button>
				</div>
      </div>
    )
  }
}

module.exports = Comment;
