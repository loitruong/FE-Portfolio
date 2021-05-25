import React from 'react';
import axios from 'axios';
import Loader from './loader';
import ltConfig from '../controls/lt-config';
import {NavLink} from "react-router-dom";

//Adding prismjs 
import Prism from "prismjs";
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';


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
  content: string;
  constructor(id: number, title: string, excerpt: string, publishDate: Date, slug: string, content: string = "") {
    this.id = id;
    this.title = title;
    this.excerpt = excerpt;
    this.date = publishDate;
    this.slug = slug;
    this.content = content;
  }
  
  getPostDate(){
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return monthNames[this.date.getMonth()] + " " + String("00" + this.date.getDate()).slice(-2) + ", " + this.date.getFullYear();
  }


  static fromJSON(jsonObj:any): Post {
    if (jsonObj['ID'] === null){
      throw new Error('Empty Post');
    }
    
    return new Post(
      jsonObj['ID'],
      jsonObj['post_title'],
      jsonObj['post_excerpt'],
      new Date(jsonObj['post_datetime']),
      jsonObj['slug'],
      jsonObj['post_content']
    );
  }
  static fromJSONList(jsonObj: JSON): Array <Post> {
    let posts: Array < Post > = [];

    if (Array.isArray(jsonObj)) {
      jsonObj.forEach((pJson) => {
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



  componentDidMount() {
    var self = this;
    axios.get(self.postsAPI)
      .then(function(response) {
        // handle success
        self.mPosts = Post.fromJSONList(response.data);
      })
      .catch(function(error) {
        // handle error
        self.mError = error;
        self.setState({
          isError: true
        })
      })
      .then(function() {
        self._componentGotData();
      });
  }

  _componentGotData(){
    let self = this;
    self.setState({
      isLoading: false
    });

    //Adding scroll handler
    window.addEventListener('scroll', ltConfig.customEvents!.scrollHandler, false);
    (window as any).ltScrollerTopPadding= 200;
    ltConfig.customEvents!.scrollHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', ltConfig.customEvents!.scrollHandler);
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
	           	<article key={"post_"+x.id} className="PostList_Post ScrollListener">
	           	  <header><h2>{x.title}</h2><time dateTime={x.date.toISOString()}>{x.getPostDate()}</time></header>
	           	  <p className="PostList_Description">{x.excerpt}</p>
	           	  <footer><NavLink className="text-button"  to={"/blog/"+ x.slug}>Read More</NavLink></footer>
	           	</article>
	          );
					})}
	  		</section>
  	  </div>
    );
  }
}





export class PostComponent extends React.Component < {slug:string}, cState > {
  postAPI: string;
  mError: any;
  mPost: Post | null;
  slug:string;

  constructor(props: any) {
    super(props);
    this.postAPI = ltConfig.myAPIs.find(x => x.name === "api.blog") !.url;
    this.state = {
      isLoading: true,
      isError: false
    }
    this.slug = this.props.slug;
    this.mPost = null ;
  }


  componentDidMount() {
    var self = this;
    axios.get(self.postAPI+"/?slug="+self.slug)
      .then(function(response) {
        // handle success
        self.mPost = Post.fromJSON(response.data);
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
        }, function(){
          Prism.highlightAll();
          document.title = self.mPost!.title;
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

    if (this.mPost == null) {
      //This need to throw better error
      throw new Error('Empty Post');
    }

    return (
      <article className="page-container">
        <header className="page-title">
          <h2>{this.mPost!.title}</h2>
          <p><time dateTime={this.mPost!.date.toISOString()}>{this.mPost!.getPostDate()}</time></p>
        </header>
        <section id="PostContent" dangerouslySetInnerHTML={{ __html: this.mPost.content }}></section>
      </article>
    );
  }
}