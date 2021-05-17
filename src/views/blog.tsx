import React from 'react';

import ltConfig from '../controls/lt-config';
import {PageType} from '../controls/lt-router';
import Posts from '../components/posts';
import Error from '../components/error';


export default class Blog extends React.Component {
	pageTitle: string;
	pageDesc: string;

	constructor(props:any){
		super(props);

		let mLink = ltConfig.myRouter!.getLink(PageType.BLOG);
		this.pageTitle = mLink!.title;
		this.pageDesc = mLink!.desc;

	}
  render() {
  	return (
  		<div className="MyBlog">			
	  	  <div className="page-container">
	  	  	<Error>
		  	  	<div className="page-title"><h2>{this.pageTitle}</h2><p>{this.pageDesc}</p></div>
		  	    <Posts />
		  	  </Error>
	  	  </div>
  		</div>
  	);
  }
}
