import React from 'react';
import axios from 'axios';
import Loader from './loader';
import ltConfig from '../controls/lt-config';
import './posts.scss';

interface cState {
  isLoading: boolean,
    isError: boolean
}

class Post {
  id: Number;
  title: string;
  excerpt: string;
  date: Date;
  slug: string;
  constructor(id: number, title: string, excerpt: string, publishDate: Date, slug: string) {
    this.id = id;
    this.title = title;
    this.excerpt = excerpt;
    this.date = publishDate;
    this.slug = slug;
  }
  static fromJSON(x: string): Post {
    let mJSONObj = JSON.parse(x);
    return new Post(mJSONObj['ID'],
      mJSONObj['post_title'],
      mJSONObj['post_excerpt'],
      new Date(mJSONObj['post_datetime']),
      mJSONObj['slug']);
  }
  static fromJSONList(x: string): Array < Post > {
    let mJSONObj = JSON.parse(x);
    let posts: Array < Post > = [];

    if (Array.isArray(mJSONObj)) {
      mJSONObj.forEach((pJson) => {
        posts.push(new Post(
          pJson['ID'],
          pJson['post_title'],
          pJson['post_excerpt'],
          new Date(pJson['post_datetime']),
          pJson['slug']
        ));
      })
    }

    return posts;
  }
}

export default class Posts extends React.Component < {}, cState > {
  postsAPI: string;
  mError: any;
  mPosts: Array < Post > ;

  constructor(props: any) {
    super(props);
    this.postsAPI = ltConfig.myAPIs.find(x => x.name === "api.blog") !.url;
    this.state = {
      isLoading: true,
      isError: false
    }
    this.mPosts = [];
  }

  postDateFormater(date:Date){
  	const monthNames = ["January", "February", "March", "April", "May", "June",
  	  "July", "August", "September", "October", "November", "December"];
  	
  	
  	return monthNames[date.getMonth()] + " " + String("00" + date.getDate()).slice(-2) + ", " + date.getFullYear();
  }

  componentDidMount() {
    var self = this;
    axios.get(self.postsAPI)
      .then(function(response) {
        // handle success
        self.mPosts = Post.fromJSONList(response.data);
        console.log(self.mPosts);
      })
      .catch(function(error) {
        // handle error
        self.mError = error;
        self.setState({
          isError: true
        })
      })
      .then(function() {
        self.setState({
          isLoading: false
        })
      });
  }

  render() {

    if (this.state.isLoading) {
      return <Loader />
    }

    if (this.state.isError) {
      throw this.mError
    }

    return (
      <div className="blog">
	  		<section className="PostList">
					{this.mPosts.map((x:Post, index) => {
	          return  (
	           	<article key={"post_"+x.id} className="PostList_Post">
	           	  <header><h2>{x.title}</h2><time dateTime={x.date.toISOString()}>{this.postDateFormater(x.date)}</time></header>
	           	  <p className="PostList_Description">{x.excerpt}</p>
	           	  <footer><a className="text-button" href="/blog/a-complete-pie-chart-d3-js">Read More</a></footer>
	           	</article>
	          );
					})}
	  		</section>
  	  </div>
    );
  }
}