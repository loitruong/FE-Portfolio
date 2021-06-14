import React from 'react';
import Error from '../components/error';
import ContactForm from '../components/form';
import '../scss/contact.scss';

export default class Contact extends React.Component{
  render() {
    return (
    	<div className="app-contact">
        <div className="page-container">        
          <div className="page-title">
            <h2>Contact</h2>
            <p>Keep Intouch</p>
          </div>

          <div className="ContactInfo clearfix">
            <div className="ContactInfo__Column">
              <h2>Email</h2>
              <h4>loitruong1989@gmail.com</h4>
            </div>
          </div>
  	      <Error>
            <ContactForm />
  		  	</Error>
  	  	</div>
      </div>
    );
  }
}