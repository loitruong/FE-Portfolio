import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link as RouterLink,
    // useRouteMatch,
    useParams
} from "react-router-dom";

import Home from '../views/home';
import About from '../views/about';
import Blog from '../views/blog';
import Post from '../views/post';
import NotFound from '../views/404';

/**
 * LT Router
 *
 * LT Rtouer will use React router classes and define page and status route
 * 
 * @since      03-30-2021
 * @access     public
 *
 */
export interface Link{
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

export enum PageType{
	HOME = "Home",
	ABOUT = "About",
	BLOG = "Blog",
	PROJECTS = "Projects",
	CONTACT = "Contact"
}

function PostRouterHook(){
	let {slug} = useParams() as any;
	return <Post slug={slug} />;
}

export default class LTRouter{
	links: Array<Link> = [];
	constructor(){

		this.addLInk('/', <Home />,
								PageType.HOME, 'LoiT\'s Portfolio', 'Welcome to Loi Truong\'s Portfolio!!', LinkType.PAGE);


		this.addLInk('/about', <About />,
								PageType.ABOUT,'About Me', 'Get to Know Me Better',LinkType.PAGE);


		// this.addLInk('/projects', <About />,
		// 						 PageType.PROJECTS, 'Projects', 'Look at my awesome works', LinkType.PAGE);


		this.addLInk('/blog', <Blog />,
								PageType.BLOG, 'Blog', 'Read my latest update', LinkType.PAGE);


		this.addLInk('/contact', <About />,
								PageType.CONTACT, 'Contact', 'Keep Intouch', LinkType.PAGE);


		this.addLInk('/*', <NotFound />,
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
	public getLink(page:PageType){
		return this.links.find( (link) => link.name ===  page);
	}

	public getMenuLinks(){
		return this.links.filter( (link) => link.type ===  LinkType.PAGE);
	}



	public getRouter(children:JSX.Element){

		return(
			<Router>
					{children}
			  	<div className="body-container">
						<div className="app-container">
							<Switch>
								<Route path="/blog/:slug">
									<PostRouterHook />
								</Route>
								{this.links.map((link) => {
								        return <Route key="{link.name}" exact path={link.url}>{link.element}</Route>
								})}
							</Switch>
						</div>
			    </div>
			</Router>
		)
	}
}