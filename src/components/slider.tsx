import React from 'react';
// I might use this to do the component transition but will see about that 
//import ReactCSSTransitionGroup from 'react-transition-group';
import { ReactComponent as IconDown } from '../svg/icon-down.svg';
import { ReactComponent as IconUp } from '../svg/icon-up.svg';
import { ReactComponent as IconLeft } from '../svg/icon-leftarrow.svg';
import { ReactComponent as IconRight } from '../svg/icon-rightarrow.svg';
import { ReactComponent as IconMouse } from '../svg/icon-mouse.svg';
import './slider.scss';

export default class Slider extends React.Component<{},{slideName:string}> {

	banners 		: Array<string> = [];
	activeSlide : number;

	//currentWheel will track the user mouse wheel direction
	//currentWheel will trigger base on {WHEELTRIGGER}
	currentWheel : number;
	WHEELTRIGGER = 3;



	constructor(props:any){
		super(props)

		this.banners = [
			"banner-01.jpg",
			"banner-02.jpg",
			"banner-03.jpg",
		];

		this.currentWheel = 0; 

		this.activeSlide = 0;

		//set default state 
		this.state = {slideName: this.banners[this.activeSlide] };
	}


	changeSlide(){
		this.setState({
			slideName: this.banners[this.activeSlide] 
		})
	}

	handleWheel(event:any, self:Slider){
		/*
			Note From LoiT:
			This slider will be base on wheel to be either change slider up/prev or down/next slide

			{WHEELTRIGGER} - when user wheel to the same direction and reach to this number and it will trigger the event
		*/
		// event.preventDefault();
		
		console.log(event.deltaY, self.currentWheel);


		if ((event.deltaY > 0 && self.currentWheel < 0) 
			|| (event.deltaY < 0 && self.currentWheel > 0)){
			self.currentWheel = 0;
		}

		self.currentWheel += event.deltaY;



		
		if(self.currentWheel%self.WHEELTRIGGER === 0 && self.currentWheel > 0){
			//Down/next slide
			console.log('hey triggering down/next slide');
			self.activeSlide++;
			if(self.activeSlide >= self.banners.length){
				self.activeSlide = 0;
			}
			self.changeSlide();
		}else if (self.currentWheel%self.WHEELTRIGGER === 0 && self.currentWheel < 0){
			//up/Prev slide
			self.activeSlide--;
			if(self.activeSlide < 0){
				self.activeSlide = self.banners.length-1;
			}
			self.changeSlide();

		}



	}


	_handleWheelWrapper (event: any){
		throw "_handleWheelWrapper need to be implement before use";		
	} 

	componentDidMount() {
		var self = this;
		
		//Note from LoiT:
		//This is an ugly or only way that I can think of to be able to pass
		//paramter into the event listener without using anonymous function
		//I cant use anoynyumous function because I need to remove the event after componenent unmount

		self._handleWheelWrapper = (event: any)=>{
			self.handleWheel(event,self);
		
		}


	  window.addEventListener('wheel', self._handleWheelWrapper, false)

	}

	componentWillUnmount() {
	  window.removeEventListener('wheel', this._handleWheelWrapper)
	}


  render() {
  	console.log(this.state)
    return (
    	<div className="Slider">
    		<Slide slideName={this.state.slideName} />
    		<div className="Slider__Controller">
    			<button  type="button"><span>Up</span><IconUp /></button>
    			<span><IconMouse /></span>
    			<button  type="button"><span>Down</span><IconDown /></button>
    		</div>
	    	<div className="Slider__MobileController">
	    	  <button className="Slider__MobileController__Previous"  type="button"><span>Previous</span><IconLeft /></button>
	    	  <button className="Slider__MobileController__Next" type="button"><span>Next</span><IconRight /></button>
	    	</div>
    	</div>
    );
  }
}

class Slide extends React.Component<{slideName:string},{}>{
	bannerPath : string =  process.env.PUBLIC_URL +"/assets/banner/";
	render(){
		let slideStyle = {
			backgroundImage: "url("+ this.bannerPath + this.props.slideName + ")"
		}
		return (
			<div className="Slider__Slide Active">
				<div className="Slider__SlideBG" style={slideStyle}>
				</div>
			</div>
		)
	}
}