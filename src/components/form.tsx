import React from 'react';

export default class ContactForm extends React.Component {

  render() {
  	return (
			<form>
				<div className="clearfix ContactForm__Row">
					<div className="ContactForm__Column">
						<label htmlFor="firstname">First Name</label>
						<input type="text" id="firstname" name="FirstName" placeholder="First Name*" />
					</div>
					<div className="ContactForm__Column">
						<label htmlFor="lastname">lastname</label>
						<input id="lastname" type="text" name="LastName" placeholder="Last Name*" />
					</div>
				</div>
				<div className="clearfix ContactForm__Row">
					<div className="ContactForm__Column">
						<label htmlFor="email">email</label>
						<input id="email" type="email" name="Email" placeholder="Email*" />
					</div>
					<div className="ContactForm__Column">
						<label htmlFor="subject">subject</label>
						<input id="subject" type="text" name="Subject" placeholder="Subject*" />
					</div>
				</div>
				<div className="clearfix ContactForm__Row"  style={{display: "none"}}>
					<div className="ContactForm__Column">
						<label htmlFor="spam">Spam Check</label>
						<input id="spam" type="text" name="spam" />
					</div>
				</div>
				<div className="clearfix">
					<label htmlFor="message">message</label>
					<textarea id="message" placeholder="Your message*"></textarea>
				</div>
				<button type="submit">Send</button>
			</form>
  	);
  }
}
