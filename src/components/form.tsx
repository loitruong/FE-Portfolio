import React from 'react';
import ltConfig from '../controls/lt-config';
import axios from 'axios';


enum FormValidationType{
	REQUIRED = "REQUIRED",
	EMAIL	   = "EMAIL",
	SPAM		 = "SPAM"
}


/*
	LTCM-NOTE
	This form component is not define in a reusable way
	Need to improve this later (If I have more than 1 form on my website)
*/


export default class ContactForm extends React.Component <{}, {isSent: boolean}>{
	
	$submitBtn: HTMLButtonElement | null;
	contactAPI: string;

	constructor(props:any){
		super(props);
		this.doValidate = this.doValidate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.$submitBtn = null;
		this.contactAPI = ltConfig.myAPIs.find(x => x.name === "api.contact") !.url;

		this.state = {
		  isSent: false
		}
	}


	componentDidMount(){
		this.$submitBtn = document.getElementById("FormSubmitButton") as HTMLButtonElement;
	}


	doValidate(event: React.FocusEvent){
		let $el = event.currentTarget as HTMLInputElement;
		this._handleValidate($el);
	}

	private _handleValidate($el : HTMLInputElement): boolean{
		let validations = $el.getAttribute('data-validation') === null ? [] : $el.getAttribute('data-validation')!.split(',');
		let $controlEle = $el.closest(".ContactForm__Control") as Element;
		let $errorEle   = $controlEle.getElementsByClassName("ContactForm__ErrorText")![0] as Element;
		let isError 	= false;
		let errorMsg 	= "";


		validations.forEach((x)=>{

			if (isError) return;

			switch(x){
				case FormValidationType.REQUIRED:
					isError = $el.value.trim().length === 0;
					errorMsg = "This field is required.";
				break;
				case FormValidationType.SPAM:
					isError = $el.value.trim().length > 0;
					errorMsg = "This field is for spammer. Please leave it empty.";
				break;
				case FormValidationType.EMAIL:
					/*
						LTCM-NOTE
						According to the internet --- There isn't a perfect regex email validation without doing an actual sending test
						So I think that it should check email validation as simple as possible.
						this regex should be good enough to prevent user writing wrong email address
					*/
					isError = !(/\S+@\S+\.\S+/.test($el.value));
					errorMsg = "Please fix your email.";
				break;
				default: break;
			}
		});


		this.$submitBtn!.disabled = isError;
		$errorEle.textContent = isError ? errorMsg : "";

		return isError;
	}

	private _getFormData($form : HTMLFormElement){
		let formElements = $form.querySelectorAll(".ContactForm__Control input, .ContactForm__Control textarea");
		let data : { [key: string]: any } = {};
		formElements.forEach((x)=>{
			if (x instanceof HTMLInputElement || x instanceof HTMLTextAreaElement){
				let mInput = x as HTMLInputElement;
				let name: string = mInput.getAttribute('name') || 'noname'; 
				data[name] = mInput.value;
			}
		});
		return data;
	}

	handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let self = this;
    let mForm = event.target as HTMLFormElement;

    let isFormError = false;
    let formElements = mForm.querySelectorAll(".ContactForm__Control input, .ContactForm__Control textarea");

    formElements.forEach((x)=>{
    	if(isFormError) return;

    	isFormError = this._handleValidate(x as HTMLInputElement); 
    });

    if(isFormError) return;

    axios.post(this.contactAPI, self._getFormData(mForm))
      .then(function (response) {
      	if(response.data === "success"){
	        self.setState({
	          isSent: true
	        });
	      }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

	
  render() {
  	if(this.state.isSent){
  		return(<div className="ThankYou">
  			<h2>Thank You!</h2>
  			<h4>Thank you for contacting me. I'll get back to you as soon as possible.</h4>
  		</div>)
  	}
  	return (
  		<div className="ContactForm">
  		  <h1>Get In Touch With Me</h1>
  		  <h3>Say Hello! Don't be shy.</h3>
				<form onSubmit={this.handleSubmit}>
					<div className="clearfix ContactForm__Row">
						<div className="ContactForm__Column">
							<div className="ContactForm__Control">						
								<label htmlFor="firstname">First Name</label>
								<input onBlur={this.doValidate} data-validation={[FormValidationType.REQUIRED]} type="text" id="firstname" name="fname" placeholder="First Name*" />
								<span className="ContactForm__ErrorText"></span>
							</div>
						</div>
						<div className="ContactForm__Column">
							<div className="ContactForm__Control">
								<label htmlFor="lastname">lastname</label>
								<input onBlur={this.doValidate} data-validation={[FormValidationType.REQUIRED]} id="lastname" type="text" name="lname" placeholder="Last Name*" />
								<span className="ContactForm__ErrorText"></span>
							</div>
						</div>
					</div>
					<div className="clearfix ContactForm__Row">
						<div className="ContactForm__Column">
							<div className="ContactForm__Control">
								<label htmlFor="email">email</label>
								<input onBlur={this.doValidate} data-validation={[FormValidationType.REQUIRED,FormValidationType.EMAIL]} id="email" type="email" name="email" placeholder="Email*" />
								<span className="ContactForm__ErrorText"></span>
							</div>
						</div>
						<div className="ContactForm__Column">
							<div className="ContactForm__Control">
								<label htmlFor="subject">subject</label>
								<input onBlur={this.doValidate} data-validation={[FormValidationType.REQUIRED]} id="subject" type="text" name="subject" placeholder="Subject*" />
								<span className="ContactForm__ErrorText"></span>
							</div>
						</div>
					</div>
					<div className="clearfix ContactForm__Row" style={{display: "none"}}>
						<div className="ContactForm__Column">
							<div className="ContactForm__Control">
								<label htmlFor="spam">Spam Check</label>
								<input onBlur={this.doValidate} data-validation={[FormValidationType.SPAM]} id="spam" type="text" name="spam" />
								<span className="ContactForm__ErrorText"></span>
							</div>
						</div>
					</div>
					<div className="clearfix">
						<div className="ContactForm__Control">
							<label htmlFor="message">message</label>
							<textarea onBlur={this.doValidate} data-validation={[FormValidationType.REQUIRED]} id="message" name="message" placeholder="Your message*"></textarea>
							<span className="ContactForm__ErrorText"></span>
						</div>
					</div>
					<button id="FormSubmitButton" type="submit">Send</button>
				</form>
			</div>
  	);
  }
}
