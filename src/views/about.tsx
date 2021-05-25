import React from 'react';
import ltConfig from '../controls/lt-config';
import '../scss/about.scss';
import {NavLink} from "react-router-dom";
import { PageType } from '../controls/lt-router';


export default class About extends React.Component {
	imgPath : string;
	ExperienceYear: string;

	constructor(props: any){
		super(props);
		this.imgPath = process.env.PUBLIC_URL + "/assets/about/";
		let NumberWord = ["zero","one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
		this.ExperienceYear = NumberWord[new Date().getFullYear() - 2014] === undefined? "twenty" :  NumberWord[new Date().getFullYear() - 2014] + "";
	}


	componentDidMount() {
	  //Adding scroll handler
	  window.addEventListener('scroll', ltConfig.customEvents!.scrollHandler, false);
	  (window as any).ltScrollerTopPadding = 0;
	  ltConfig.customEvents!.scrollHandler();
	}


	componentWillUnmount() {
	  window.removeEventListener('scroll', ltConfig.customEvents!.scrollHandler);
	}


  render() {
  	return (
  		<div className="page-container">
  			<div className="page-title">
  				<h2>About Me</h2>
  				<p>Get to Know Me Better</p>
  			</div>

  			<div className="about-banner clearfix">
  				<div className="about-banner__BG">
  					<img src={this.imgPath + "profile.jpg"} alt="Loi Truong Profile" />
  				</div>
  				<div className="about-banner__TextBox">
  					<h1>What I do</h1>
  					<h4>I provide both front-end and back-end web applications to enhance your web user experience.</h4>
  					<p>I have more than {this.ExperienceYear} years of professional experience in writing multiple programming languages.
  					I am skilled at integrating different Content Management Systems (CMS) and building interactive features for your specific project needs.
  					I am committed to deliver the best work as well as formulate strategic solutions for your business.</p>
  				</div>
  			</div>


  			<div className="about-sections">
  				<div className="about-sections__row clearfix">
  					<div className="about-section">
  						<img src={this.imgPath + "learning.jpg"} alt="Learning and Adapting" />
  						<div className="page-banner__TextBox">
  							<h2>Learning and Adapting</h2>
  							<h4>Never stop there.</h4>
  						</div>
  					</div>
  					<div className="about-section">
  						<img src={this.imgPath + "integrity.jpg"} alt="Trust" />
  						<div className="page-banner__TextBox">
  							<h2>Trust</h2>
  							<h4>Acting with Integrity.</h4>
  						</div>
  					</div>
  					<div className="about-section">
  						<img src={this.imgPath + "future.jpg"} alt="Engineer the future" />
  						<div className="page-banner__TextBox">
  							<h2>Engineer the Future</h2>
  							<h4>Deliver innovative products.</h4>
  						</div>
  					</div>
  				</div>
  			</div>

  			<div className="about-more">
  				<h2>More About Me</h2>		
  				<p className="ScrollListener">I was born in Vietnam and moved to the U.S in 2003. I started my new life with my family in Rochester, NY, the Flour City and proudly got my U.S citizenship in 2010 then graduated after couple years later. Recently I moved to Boston with my wife to get more opportunities for my career path.</p>
  				<p className="ScrollListener">After graduated from SUNY Brockport with a bachelor's degree in Computer Science, I started my career as a web developer. My current title is a Javascript Application Developer at NCR Corp, but my work has been shifted to both Fronted and Backened application. I really love what I do, and as you know, a happy developer develops happy products, and happy products lead to satisfied clients.</p>
  				<p className="ScrollListener">My favorite pastime is gaming. I Like to play strategy games because it keeps my brain active. One of my favorites is Factorio. In addition, I love movies. I'm a big fan of Marvel movies.</p>
  			</div>

  			<div className="about-skills">
  				<ul>
  					<li><img src={this.imgPath + "angular-gray.svg"} alt="AngularJS" /></li>
  					<li><img src={this.imgPath + "c-gray.svg"} alt="C Sharp" /></li>
  					<li><img src={this.imgPath + "dnn-gray.svg"} alt="Dot Net Nuke" /></li>
  					<li><img src={this.imgPath + "javascript-gray.svg"} alt="Javascript" /></li>
  					<li><img src={this.imgPath + "php-gray.svg"} alt="PHP" /></li>
  					<li><img src={this.imgPath + "sass-gray.svg"} alt="Sass" /></li>
  					<li><img src={this.imgPath + "wordpress-gray.svg"} alt="Wordpress" /></li>
  					<li><img src={this.imgPath + "sql-gray.svg"} alt="SQL" /></li>
  				</ul>
  			</div>
  			<div className="about-promotion">
  				<h2>Dream websites come to life</h2>
  				<p>
  					<span>"A dream doesn't become reality through magic; it takes sweat, determination and hard work." - <a target="_blank" rel="noreferrer" href="https://www.brainyquote.com/authors/colin-powell-quotes">Colin Powell</a> </span>
  					Creative problem solver who enjoy solving challenges. Here's some of my works.
  				</p>
  				<NavLink className="main-button"  to={ltConfig.myRouter!.getLink(PageType.PROJECTS)!.url}>View Works</NavLink>
  			</div>
  		</div>
  	);
  }
}