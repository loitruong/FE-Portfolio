import React from 'react';

/**
 * LT Links. 
 *
 * LT Links will mapping all the site URLs to the components.
 * 
 * @since      03-30-2021
 * @access     public
 *
 */
export interface Link{
	url : string;
	cName: string;
	name: string;
	title: string;
	desc: string;
	type: LinkType;
}

enum LinkType{
	PAGE,
	ERROR
}

export class LTLinks{
	links: Array<Link> = [];
	constructors(){
		this.addLInk('/',					'Home' ,				'Home', 			'LoiT\'s Portfolio', 			'Welcome to Loi Truong\'s Portfolio!!', LinkType.PAGE);
		this.addLInk('/about',		'About',				'About', 			'About Me', 							'Get to Know Me Better',								LinkType.PAGE);
		this.addLInk('/projects',	'Projects',			'Projects', 	'Projects', 							'Look at my awesome works',							LinkType.PAGE);
		this.addLInk('/blog',			'Blog',					'Blog', 			'Blog', 								 	'Read my latest update',								LinkType.PAGE);
		this.addLInk('/contact',	'Contact',			'Contact', 		'Contact', 							 	'Keep Intouch',													LinkType.PAGE);
		this.addLInk('/*',			  'NotFound',			'404', 				'ERROR! PAGE NOT FOUND', 	'This page could not be found!',				LinkType.ERROR);
	}
	private addLInk(url:string, cName:string, name:string, title:string, desc:string, type:LinkType):void{
		this.links.push({
			url: url,
			cName: cName,
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
}

export default LTLinks;