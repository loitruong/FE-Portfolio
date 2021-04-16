import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Header from './components/header';
import ltConfig from './controls/lt-config';
import LTRouter from './controls/lt-router';


class App extends React.Component {
  constructor(props:any){
    super(props);
    ltConfig.myRouter = new LTRouter();
  }
  render() {
    return (
			<div id="reactApp">
					{ltConfig.myRouter.getRouter( <Header /> )}
			</div>
    );
  }
}


ReactDOM.render(
	<React.StrictMode>
		<App />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();