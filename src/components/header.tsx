import React from 'react';
import { ReactComponent as Logo } from '../svg/logo.svg';
import {
  NavLink
} from "react-router-dom";

import { Link } from '../controls/lt-router';

interface HeaderProps {
  menuLinks : Array<Link>
}

export default class Header extends React.Component<HeaderProps> {
  mySocialMedia: Array<React.CElement<any,any>> = []

  constructor(props:HeaderProps){
    super(props)

    this.mySocialMedia.push(React.createElement(SocialLink, {
      href: 'https://www.linkedin.com/in/loi-truong-367166101',
      name: 'Linkedin',
      fa: 'fa-linkedin-in'
    }));


    this.mySocialMedia.push(React.createElement(SocialLink, {
      href: 'https://github.com/loitruong',
      name: 'Github',
      fa: 'fa-github-alt'
    }));


    this.mySocialMedia.push(React.createElement(SocialLink, {
      href: 'tel:+15858316184',
      name: 'Phone',
      fa: 'fa fa-phone'
    }));


  }
  render() {
    return (
      <div className="header-container clearfix">
			  <header>
        <div className="MobileControls"><button id="MobileMenuButton" type="button" className="MobileMenuButton"><i>Menu Toggle Button</i><span className="line line-1"></span><span className="line line-2"></span><span className="line line-3"></span></button></div>
				<div className="Logo">
					<NavLink  to="/">
						<span>Home</span>
						<Logo />
					</NavLink >

				</div>
				<nav>
					<ul>
					{this.props.menuLinks.map((link:Link) => {
	           return <li key={link.name}><NavLink data-text={link.name} exact to={`${link.url}`}><span>{link.name}</span></NavLink></li>
					})}
					</ul>
          <div className="socialmedia">
            {this.mySocialMedia.map((sl) => {
              return sl
            })}
          </div>
          <div className="Title"><h2>Loi Truong</h2> Software Engineer @ NCR</div>
				</nav>
			  </header>
			</div>
    );
  }
}


class SocialLink extends React.Component<{href: string, fa: string; name:string}> {
  render(){
    return (
      <a target="_blank" rel="noreferrer" href={this.props.href}><i className={`fab ${this.props.fa}`}></i><span>{this.props.name}</span></a>
    )
  }
}