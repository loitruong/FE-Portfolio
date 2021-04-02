import React from 'react';
import { ReactComponent as IconDown } from '../svg/icon-down.svg';
import { ReactComponent as IconUp } from '../svg/icon-up.svg';
import { ReactComponent as IconLeft } from '../svg/icon-leftarrow.svg';
import { ReactComponent as IconRight } from '../svg/icon-rightarrow.svg';
import { ReactComponent as IconMouse } from '../svg/icon-mouse.svg';
import './slider.scss';

export default class Slider extends React.Component {
  render() {
    return (
    	<div className="Slider">
    		<Slide />
    		<div className="Slider__Controller">
    			<button  type="button"><span>Up</span><IconUp /></button>
    			<span><IconMouse /></span>
    			<button  type="button"><span>Up</span><IconDown /></button>
    		</div>
    	</div>
    );
  }
}

// <div class="HomeSlider__Controller">
//   <button (click)="SlideUp()" [disabled]="AnimationRunning" type="button">
//     <span>Up</span>
//     <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 6 14" style="enable-background:new 0 0 6 14;" xml:space="preserve">
//       <path d="M4,14H2L2,3L0,3l3-3l3,3L4,3L4,14z"/>
//     </svg>
//   </button>
//   <span>
//     <svg height="512pt" viewBox="-105 0 512 512.00002" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m150.601562 0c-83.042968 0-150.601562 67.558594-150.601562 150.601562v210.796876c0 83.042968 67.558594 150.601562 150.601562 150.601562 83.042969 0 150.601563-67.558594 150.601563-150.601562v-210.796876c0-83.042968-67.558594-150.601562-150.601563-150.601562zm119.882813 361.398438c0 66.101562-53.78125 119.882812-119.882813 119.882812-66.101562 0-119.882812-53.78125-119.882812-119.882812v-210.796876c0-66.101562 53.78125-119.882812 119.882812-119.882812 66.101563 0 119.882813 53.78125 119.882813 119.882812zm0 0"/><path d="m150.605469 101.851562c-8.484375 0-15.359375 6.875-15.359375 15.359376v70.695312c0 8.480469 6.875 15.359375 15.359375 15.359375 8.480469 0 15.359375-6.878906 15.359375-15.359375v-70.695312c0-8.484376-6.875-15.359376-15.359375-15.359376zm0 0"/></svg>
//   </span>
//   <button (click)="SlideDown()" [disabled]="AnimationRunning" type="button">
//     <span>Down</span>
//     <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 6 14" style="enable-background:new 0 0 6 14;" xml:space="preserve">
//       <path d="M2,0l2,0l0,11h2l-3,3l-3-3h2L2,0z"/>
//     </svg>
//   </button>
// </div>
// <div class="HomeSlider__MobileController">
//   <button (click)="SlideLeft()" class="HomeSlider__MobileController__Previous"  [disabled]="AnimationRunning" type="button">
//     <span>Previous</span>
//     <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 62.2 116" style="enable-background:new 0 0 62.2 116;" xml:space="preserve"><g><path d="M55.2,114.8c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2c1.6-1.6,1.6-4.2,0-5.8L10,58L61,7c1.6-1.6,1.6-4.2,0-5.8 s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2,0,5.8L55.2,114.8z"/></g></svg>
//   </button>
//   <button (click)="SlideRight()" class="HomeSlider__MobileController__Next" [disabled]="AnimationRunning" type="button">
//     <span>Next</span>
//     <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 62.2 116" style="enable-background:new 0 0 62.2 116;" xml:space="preserve"><g><path d="M7,1.2C6.2,0.4,5.2,0,4.1,0S2,0.4,1.2,1.2c-1.6,1.6-1.6,4.2,0,5.8l51,51l-51,51c-1.6,1.6-1.6,4.2,0,5.8 c1.6,1.6,4.2,1.6,5.8,0l54-53.9c1.6-1.6,1.6-4.2,0-5.8L7,1.2z"/></g></svg>
//   </button>
// </div>

class Slide extends React.Component{
	render(){
		let slideStyle = {
			backgroundImage: "url("+ process.env.PUBLIC_URL +"/assets/banner/banner-01.jpg)"
		}
		return (
			<div className="Slider__Slide Active">
				<div className="Slider__SlideBG" style={slideStyle}>
				</div>
			</div>
		)
	}
}