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
  render() {
    console.log(this.props)

    return (
      <div className="header-container clearfix">
			  <header>
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
				</nav>
			  </header>
			</div>
    );
  }
}