import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouterLink,
    useRouteMatch,
    useParams
} from "react-router-dom";

import Home from '../views/home';
import About from '../views/about';
import NotFound from '../views/404';

/**
 * LT Links. 
 *
 * LT Links will mapping all the site URLs to the components.
 * 
 * @since      03-30-2021
 * @access     public
 *
 */
interface Link{
	url : string;
	element: React.CElement<{},any>;
	name: string;
	title: string;
	desc: string;
	type: LinkType;
}

enum LinkType{
	PAGE,
	ERROR
}

export default class LTRouter{
	links: Array<Link> = [];
	constructor(){

		this.addLInk('/', React.createElement(Home),
								'Home', 'LoiT\'s Portfolio', 'Welcome to Loi Truong\'s Portfolio!!', LinkType.PAGE);


		this.addLInk('/about',React.createElement(About),
								'About','About Me', 'Get to Know Me Better',LinkType.PAGE);


		this.addLInk('/projects', React.createElement(About),
								 'Projects', 'Projects', 'Look at my awesome works', LinkType.PAGE);


		this.addLInk('/blog', React.createElement(About),
								'Blog', 'Blog', 'Read my latest update', LinkType.PAGE);


		this.addLInk('/contact', React.createElement(About),
								'Contact', 'Contact', 'Keep Intouch', LinkType.PAGE);


		this.addLInk('/*', React.createElement(NotFound),
								'404', 'ERROR! PAGE NOT FOUND', 'This page could not be found!', LinkType.ERROR);


	}
	private addLInk(url:string, el:React.CElement<{},any>, name:string, title:string, desc:string, type:LinkType):void{
		this.links.push({
			url: url,
			element: el,
			name: name,
			title: title,
			desc: desc,
			type: type
		})
	}

	//This method will return the route
	public getLinks(){
		return this.links;
	}

	public getRouter(header:React.CElement<{},any>){
		return(
			<Router>
					{header}
			  	<div className="body-container">
					<Switch>						
						{this.links.map((link) => {
						        return <Route exact path={link.url}>{link.element}</Route>
						})}
					</Switch>
			    </div>
			</Router>
		)

							//   <Route exact path="/">
					  // 	<Home />
					  // </Route>
					  // <Route exact path="/about">
					  // 	<About />
					  // </Route>
					  // <Route >
					  // 	<NotFound />
					  // </Route>
	}
}