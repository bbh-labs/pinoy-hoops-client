'use strict'

import $ from 'jquery'
import React from 'react'
import { Link } from 'react-router'

class Home extends React.Component {
	render() {
		return (
			<section id="landingpage">
		    <div class="container-fluid">
		    <div class="row">
		        <div class=".col-xs-12 .col-sm-12 col-md-12 nopadding">
		          <div class="logo">
		            <img src="images/logo_light.png"/>
		          </div>
		          <div class="fadein">
		            <img src="images/hero01.jpg"/>
		            <img src="images/hero02.jpg"/>
		            <img src="images/hero03.jpg"/>
		            <img src="images/hero04.jpg"/>
		            <img src="images/hero05.jpg"/>
		            <img src="images/hero06.jpg"/>
		            <img src="images/hero07.jpg"/>
		            <img src="images/hero08.jpg"/>
		            <img src="images/hero09.jpg"/>
		            <img src="images/hero10.jpg"/>
		          </div>
		          <a href="map.html">
		            <div class="arrow bounce">
		            </div>
		          </a>
		        </div>
		    </div>
		    </div>
		  </section>
		)
	}
	$(function(){
		 $('.fadein img:gt(0)').hide();
			setInterval(function(){$('.fadein :first-child').fadeOut().next('img').fadeIn().end().appendTo('.fadein');}, 3000);
		});

module.exports = Home;
