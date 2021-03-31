import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Home from './views/home';
import About from './views/about';
import NotFound from './views/404';
import Header from './components/header';
import {
	LTLinks, 
	Link as ltLink
} from './controls/lt-links';

// import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";


let ltLinks = new LTLinks();


ReactDOM.render(
	<React.StrictMode>
		<Header />
		<Router>
		  	<div className="body-container">
				<Switch>
				  <Route exact path="/">
				  	<Home />
				  </Route>
				  <Route exact path="/about">
				  	<About />
				  </Route>
				  <Route >
				  	<NotFound />
				  </Route>
				</Switch>
		    </div>
		</Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();