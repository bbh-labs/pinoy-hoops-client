'use strict'

import React from 'react'
import { Link } from 'react-router'

import API from './API'
import Dispatcher from './Dispatcher'

class Comment extends React.Component {
	render() {
    return (
      <div id="comment">
				<div className=".col-xs-6 .col-sm-6 col-md-6 nopadding ">
					<div className="imagegallery">
						<div className=".col-xs-4 .col-sm-4 col-md-4 nopadding ">
							<img src="images/hoop01.jpg"/>
							<img src="images/hoop02.jpg"/>
							<img src="images/hoop03.jpg"/>
							<img src="images/hoop04.jpg"/>
						</div>
						<div className=".col-xs-4 .col-sm-4 col-md-4 nopadding ">
							<img src="images/hoop05.jpg"/>
							<img src="images/hoop06.jpg"/>
							<img src="images/hoop07.jpg"/>
							<img src="images/hoop08.jpg"/>
						</div>
						<div className=".col-xs-4 .col-sm-4 col-md-4 nopadding ">
							<img src="images/hoop09.jpg"/>
							<img src="images/hoop10.jpg"/>
							<img src="images/hoop11.jpg"/>
							<img src="images/hoop12.jpg"/>
						</div>
					</div>
				</div>
				<div className=".col-xs-6 .col-sm-6 col-md-6 nopadding ">
					<div className="commentarea">
						<div className="usercomment">
							<img src="images/user01.jpg"/>
							<h3>UserName</h3>
							<p>UserComments</p>
						</div>
						<div className="mycomment">
							<textarea rows="4" cols="50" placeholder="Write something"/>
							<button>send</button>
						</div>
					</div>
				</div>
			</div>
    )
  }
}


module.exports = Comment;
