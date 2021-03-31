import React from 'react';
import { ReactComponent as Logo } from '../svg/logo.svg';
import {
  NavLink,
  BrowserRouter as Router,
} from "react-router-dom";



class Header extends React.Component {
  page: Array < [String, String] > = [
    ["/", "Home"],
    ["/about", "About"],
    ["/projects", "Projects"],
    ["/blog", "Blog"],
    ["/contact", "Contact"],
  ]
  // constructor(props: any) {
  //   super(props);
  //   // Don't call this.setState() here!
  // }
  render() {
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
					{this.page.map((value:[String,String]) => {
					        return <li><NavLink data-text={value[1]} exact to={`${value[0]}`}><span>{value[1]}</span></NavLink></li>
					})}
					</ul>
				</nav>
			  </header>
			</div>
    );
  }
}


export default Header;