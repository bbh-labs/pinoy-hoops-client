'use strict'

import $ from 'jquery'
import React from 'react'
import { Link } from 'react-router'

class Home extends React.Component {
	render() {
		return (
			<section id="landingpage">
		    <div className="container-fluid">
		    <div className="row">
		        <div className=".col-xs-12 .col-sm-12 col-md-12 nopadding">
		          <div className="logo">
		            <img src="images/logo_light.png"/>
		          </div>
		          <div className="fadein">
		            <img src="images/hero01.jpg"/>
		            <img src="images/hero02.jpg"/>
		            <img src="images/hero03.jpg"/>
		            <img src="images/hero04.jpg"/>
		            <img src="images/hero05.jpg"/>
		            <img src="images/hero06.jpg"/>
		            <img src="images/hero07.jpg"/>
		            <img src="images/hero08.jpg"/>
		          </div>
		          <Link to='/map'>
		            <div className="arrow bounce">
		            </div>
		          </Link>
		        </div>
		    </div>
		    </div>
		  </section>
		)
	}
	componentDidMount(){
		$(function(){
			 $('.fadein img:gt(0)').hide();
				this.intervalID = setInterval(function(){$('.fadein :first-child').fadeOut().next('img').fadeIn().end().appendTo('.fadein');}, 3000);
			});
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}
}

module.exports = Home;
