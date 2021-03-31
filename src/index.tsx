import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Header from './components/header';
import LTRouter from './controls/lt-router';

// import reportWebVitals from './reportWebVitals';


let ltRouter = new LTRouter();

ReactDOM.render(
	<React.StrictMode>
		{ltRouter.getRouter( React.createElement(Header, {
			menuLinks : ltRouter.getMenuLinks()
		}))}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();