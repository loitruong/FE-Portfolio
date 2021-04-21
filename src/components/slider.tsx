import React, { createRef } from 'react';
import { NavLink } from "react-router-dom";
import ltConfig from '../controls/lt-config';
import { PageType } from '../controls/lt-router';
import { ReactComponent as IconDown } from '../svg/icon-down.svg';
import { ReactComponent as IconUp } from '../svg/icon-up.svg';
import { ReactComponent as IconLeft } from '../svg/icon-leftarrow.svg';
import { ReactComponent as IconRight } from '../svg/icon-rightarrow.svg';
import { ReactComponent as IconMouse } from '../svg/icon-mouse.svg';
import { ReactComponent as IconDart } from '../svg/icon-dart.svg';
import './slider.scss';


enum Direction {
  NEXT,
  PREVIOUS
}

enum CSSANIMATION {
  CENTER2NEXT = "center2next",
    CENTER2PREV = "center2prev",
    PREV2CENTER = "prev2center",
    NEXT2CENTER = "next2center"
}

interface Banner {
  img: string;
  title: string;
  desc: string;
  linkName: string;
  link: string;
}

export default class Slider extends React.Component < {}, { slideState: Banner } > {

  banners: Array < Banner > = [];
  activeSlide: number;

  //currentWheel will track the user mouse wheel direction
  //currentWheel will trigger base on {WHEELTRIGGER}
  currentWheel: number;
  WHEELTRIGGER = 3;

  //current Element
  mRef = createRef < HTMLDivElement > ();
  mElement: HTMLDivElement | null = null;

  isChangingSlide: boolean;

  //20210406: LTCM-LOOKBACK
  // This is a total estimation animation time of a slide that needs to be swap;
  // I need to come up with a better solution to calculate the time instead of reply on hard-code for this number
  // the barrier is I'm using animation via CSS class, and it's hard to get the variable from SCSS
  // maybe I should define CSS animation duration in javascript
  slideTotalAnimationTime: number = 500


  constructor(props: any) {
    super(props);
    this.banners = [{
        img: "banner-01.jpg",
        title: 'Developing \n the Future',
        desc: 'Click to check out my works!',
        linkName: 'My Works',
        link: ltConfig.myRouter!.getLink(PageType.PROJECTS) !.url
        //link: ''
      },
      {
        img: "banner-02.jpg",
        title: 'Experienced \n Web Developer',
        desc: 'Know more about me',
        linkName: 'About Me',
        link: ltConfig.myRouter!.getLink(PageType.ABOUT) !.url
      },
      {
        img: "banner-03.jpg",
        title: 'Connecting \n the Web',
        desc: 'Tell me your concerns',
        linkName: 'Contact Me',
        link: ltConfig.myRouter!.getLink(PageType.CONTACT) !.url
      }
    ];

    this.currentWheel = 0;

    this.activeSlide = 0;

    //set default state 
    this.state = { slideState: this.banners[this.activeSlide] };

    this.isChangingSlide = false;
    this.handleWheel = this.handleWheel.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.prevClick = this.prevClick.bind(this);
  }


  changeSlide(d: Direction) {
    //before changing state let's do something fun -- ANIMATION!!! wohoooo
    //Since, i'm not sure what to use for the react animation library 
    //I decided to use pure css	
    let activeSlide = this.mElement!.querySelector(".Slider__Slide.Active");

    if (activeSlide === null) {
      throw new Error("current slide not found. hmm this shouldn't happen.");
    }

    let prevSlide = activeSlide!.previousElementSibling || this.mElement!.querySelector(".Slider__Slide:last-child");
    let nextSlide = activeSlide!.nextElementSibling || this.mElement!.querySelector(".Slider__Slide:first-child");
    let self = this;

    switch (d) {
      case Direction.NEXT:
        activeSlide!.classList.add(CSSANIMATION.CENTER2PREV);
        nextSlide!.classList.add(CSSANIMATION.NEXT2CENTER);
        break;
      case Direction.PREVIOUS:
        activeSlide!.classList.add(CSSANIMATION.CENTER2NEXT);
        prevSlide!.classList.add(CSSANIMATION.PREV2CENTER);
        break;
    }


    setTimeout(function() {
      self.setState({
        slideState: self.banners[self.activeSlide]
      });

      self.isChangingSlide = false;

    }, self.slideTotalAnimationTime) //1000 is waiting for all animation to be done


  }

  handleWheel(event: any) {
    /*
    	LTCM-NOTE
    	This slider will be base on wheel to be either change slider up/prev or down/next slide

    	{WHEELTRIGGER} - when user wheel to the same direction and reach to this number and it will trigger the event
    */
    var self = this;

    if (self.isChangingSlide) return;


    //this logic is to cancel the oppsoite wheel direction when it not yet to meet with WHEELTRIGGER logic
    if ((event.deltaY > 0 && self.currentWheel < 0) ||
      (event.deltaY < 0 && self.currentWheel > 0)) {
      self.currentWheel = 0;
    }


    self.currentWheel += event.deltaY;

    if (self.currentWheel % self.WHEELTRIGGER === 0 && self.currentWheel > 0) {
      //Down/next slide
      self.isChangingSlide = true;
      self.activeSlide++;
      if (self.activeSlide >= self.banners.length) {
        self.activeSlide = 0;
      }
      self.changeSlide(Direction.NEXT);
    } else if (self.currentWheel % self.WHEELTRIGGER === 0 && self.currentWheel < 0) {
      //up/Prev slide
      self.isChangingSlide = true;
      self.activeSlide--;
      if (self.activeSlide < 0) {
        self.activeSlide = self.banners.length - 1;
      }
      self.changeSlide(Direction.PREVIOUS);

    }
  }

  nextClick(event: any) {
    let self = this;
    event.preventDefault();
    if (self.isChangingSlide) return;
    self.isChangingSlide = true;
    self.activeSlide++;
    if (self.activeSlide >= self.banners.length) {
      self.activeSlide = 0;
    }
    self.changeSlide(Direction.NEXT);
  }


  prevClick(event: any) {
    let self = this;
    event.preventDefault();
    if (self.isChangingSlide) return;
    self.isChangingSlide = true;
    self.activeSlide--;
    if (self.activeSlide < 0) {
      self.activeSlide = self.banners.length - 1;
    }
    self.changeSlide(Direction.PREVIOUS);
  }



  componentDidMount() {
    this.mElement = this.mRef.current;

    window.addEventListener('wheel', this.handleWheel, false);
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleWheel)
  }


  render() {
    var self = this;
    return (
      <div ref={this.mRef} className="Slider">
    		<div>
					{this.banners.map((banner:Banner, index) => {
	           return  <Slide key={"banner_"+index} isActive={self.activeSlide === index} banner={banner} />
					})}
				</div>
    		<div className="Slider__Controller">
    			<button onClick={self.prevClick} type="button"><span>Up</span><IconUp /></button>
    			<span><IconMouse /></span>
    			<button onClick={self.nextClick} type="button"><span>Down</span><IconDown /></button>
    		</div>
	    	<div className="Slider__MobileController">
	    	  <button onClick={self.prevClick} className="Slider__MobileController__Previous" type="button"><span>Previous</span><IconLeft /></button>
	    	  <button onClick={self.nextClick} className="Slider__MobileController__Next" type="button"><span>Next</span><IconRight /></button>
	    	</div>
    	</div>
    );
  }
}

class Slide extends React.Component < { banner: Banner, isActive: boolean }, { isLoading: boolean } > {
  imgSrc: string;

  constructor(props: any) {
    super(props);
    this.imgSrc = process.env.PUBLIC_URL + "/assets/banner/" + this.props.banner.img;

    /*
    	LTCM-NOTE
    	Im using https://deelay.me to simulate the loading test for banner :) very cool tool
    */
    // this.imgSrc = "https://deelay.me/3000/https://loitruong.dev/wp-content/themes/loi-truong/fe-app/assets/home/banner-01.jpg";

    this.state = {
      isLoading: true
    };
  }
  componentDidMount(){
  	this.loading();
  }
  loading() {
    let self = this;
    let img = new Image();
    img.src = this.imgSrc;
    img.onload = function() {
      self.setState({
        isLoading: false
      })
    }
  }
  render() {
    let slideStyle = {
      backgroundImage: "url(" + this.imgSrc + ")"
    }
    let activeClass = this.props.isActive ? 'Active' : '';

    if (this.state.isLoading) {
      return (<div className={`Slider__Slide ${activeClass} Loading`}>
        		<i className="fas fa-circle-notch fa-spin"></i>
        </div>)
    }
    return (
      <div className={`Slider__Slide ${activeClass}`}>
				<div className="Slider__SlideBG" style={slideStyle}>
				</div>
				<div className="Slider__Content">
					<div className="Slider__Content__Cell">			
						<svg className="Slider__Box" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 800 600"><rect x="0" y="0" width="100%" height="100%"/></svg>
						<h2>{this.props.banner.title}</h2>
						<p>{this.props.banner.desc}</p>
						<NavLink className="Slider__Button" to={this.props.banner.link} data-text={this.props.banner.linkName}>
							<span>{this.props.banner.linkName}</span>
							<IconDart />
						</NavLink >
					</div>
				</div>
			</div>
    )
  }
}