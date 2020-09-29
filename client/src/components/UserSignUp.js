// Stateful Component
// Referenced "React Authentication" Course/Instruction Pages
// Reference HTML files from the markup folder provided

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Import the form component
import Form from './Form';

export default class UserSignUp extends Component {
	state = {
		firstName: '',
		lastName: '',
		emailAddress: '',
		password: '',
		confirmPass: '',
		errors: [],
	}

	render() {
		const {
			firstName,
			lastName,
			emailAddress,
			password,
			confirmPass,
			errors,
		} = this.state;

		return (
			<div className="bounds">
				<div className="grid-33 centered signin">
					<h1>Sign Up</h1>
					{/* Use the form component*/}
					<Form 
						cancel={this.cancel}
						errors={errors}
						submit={this.submit}
						submitButtonText="Sign Up"
						elements={() => (
							<React.Fragment>
								<input 
									id="firstName" 
									name="firstName" 
									type="text"
									value={firstName} 
									onChange={this.change} 
									placeholder="First Name" />
								<input 
									id="lastName" 
									name="lastName" 
									type="text"
									value={lastName} 
									onChange={this.change} 
									placeholder="Last Name" />
								<input 
									id="emailAddress" 
									name="emailAddress" 
									type="text"
									value={emailAddress} 
									onChange={this.change} 
									placeholder="EmailAddress" />
								<input 
									id="password" 
									name="password"
									type="password"
									value={password} 
									onChange={this.change} 
									placeholder="Password" />
								<input 
									id="confirmPass" 
									name="confirmPass"
									type="password"
									value={confirmPass} 
									onChange={this.change} 
									placeholder="Confirm Password" />
							</React.Fragment>
						)} />
					<p>
						Already have a user account? <Link to="/signin">Click here</Link> to sign in!
					</p>
				</div>
			</div>
		);
	}

	// Handles the changes to text boxes
	change = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState(() => {
			return {
				[name]: value
			};
		});
	}

	// Handles the button submits
	submit = () => {
		const { context } = this.props;
		const {
			firstName,
			lastName,
			emailAddress,
			password,
			confirmPass,
		} = this.state;
		
		// Check to see if the password and confirmPass fields are the same
		if (password === confirmPass){
			// Create user variable
			const user = {
				firstName,
				lastName,
				emailAddress,
				password,
			};

			// Call the create user function
			context.data.createUser(user)
				.then( errors => {
					if (errors.length) {
						this.setState({ errors });
					} else {
						context.actions.signIn(emailAddress, password)
							.then(() => {
								console.log(`${emailAddress} is successfully signed up and authenticated!`);
								this.props.history.push('/');		
							});
					}
				})
				.catch((error) => {
					console.log(error);
					this.props.history.push('/error');
				});
		} else {
			// Create new error to display if the passwords do not match
			let error = "The passwords do not match";
			this.setState({ errors: [error] });
			console.log("User creation failed");
		}
	}

	cancel = () => {
		// Returns the user to the main page (list of courses)
		this.props.history.push('/');
	}
}
