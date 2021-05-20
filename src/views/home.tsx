import React from 'react';
import Slider from '../components/slider';

class Home extends React.Component {
	componentDidMount(){
		document.title = "Home - LoiT";
	}
  render() {
  	return (
  	  <div className="home">
  	    <Slider />
  	  </div>
  	);
  }
}


export default Home;