import React from 'react';
import { PostComponent } from '../components/posts';
import Error from '../components/error';
// import { withRouter } from "react-router";


export default class Post extends React.Component < { slug: string }, {} > {
  slug: string
  constructor(props: any) {
    super(props);
    this.slug = this.props.slug;
  }

  render() {
    return (
    	<div className="app-post">
	      <Error>
		  	    <PostComponent slug={this.slug} />
		  	</Error>
	  	</div>
    );
  }
}