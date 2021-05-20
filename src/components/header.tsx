import React from 'react';
import { ReactComponent as Logo } from '../svg/logo.svg';
import {
  NavLink
} from "react-router-dom";
import { Link, PageType } from '../controls/lt-router';
import ltConfig from '../controls/lt-config';

interface SocialMedia {
  href: string,
  name: string,
  fa: string
}

export default class Header extends React.Component {
  mySocialMedia: Array<SocialMedia> = []

  constructor(props:any){
    super(props)

    this.mySocialMedia.push({
      href: 'https://www.linkedin.com/in/loi-truong-367166101',
      name: 'Linkedin',
      fa: 'fa-linkedin-in'
    });


    this.mySocialMedia.push({
      href: 'https://github.com/loitruong',
      name: 'Github',
      fa: 'fa-github-alt'
    });


    this.mySocialMedia.push({
      href: 'mailto:loitruong1989@gmail.com',
      name: 'Email',
      fa: 'fa fa-envelope'
    });


  }

  _openMenu(){
    let bodyEle = document.getElementsByTagName("body")[0];

    bodyEle.classList.toggle("MenuOpen");
  }

  render() {
    return (
      <div className="header-container clearfix">
			  <header>
        <div className="MobileControls"><button id="MobileMenuButton" onClick={this._openMenu} type="button" className="MobileMenuButton"><i>Menu Toggle Button</i><span className="line line-1"></span><span className="line line-2"></span><span className="line line-3"></span></button></div>
				<div className="Logo">
					<NavLink  to={ltConfig.myRouter!.getLink(PageType.HOME)!.url}>
						<span>Home</span>
						<Logo />
					</NavLink >
				</div>
				<nav>
					<ul>
					{ltConfig.myRouter!.getMenuLinks().map((link:Link) => {
            return <li key={link.name}><NavLink data-text={link.name} exact={link.name === 'Blog' ? false: true} to={`${link.url}`}><span>{link.name}</span></NavLink></li>
					})}
					</ul>
          <div className="socialmedia">
            {this.mySocialMedia.map((x) => {
              return <SocialLink key={x.name} href={x.href} fa={x.fa} name={x.name} />
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
      <a target="_blank" key={this.props.name} rel="noreferrer" href={this.props.href}><i className={`fab ${this.props.fa}`}></i><span>{this.props.name}</span></a>
    )
  }
}