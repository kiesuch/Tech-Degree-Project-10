// Stateful Component
// Reference HTML files from the markup folder provided
// Referenced the UserSignUp code

import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
// Import the form component
import Form from './Form';

class CreateCourse extends Component {
	state = {
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: '',
		errors: [],
	}

	render() {
		const {
			title,
			description,
			estimatedTime,
			materialsNeeded,
			errors,
		} = this.state;
		
		const { context } = this.props;
		const authUser = context.authenticatedUser;
		const authUserObject = authUser[0][0];
		
		return (
			<div className="bounds">
				<div className="course--detail">
					<h1>Create Course</h1>
					<Form 
						cancel={this.cancel}
						errors={errors}
						submit={this.submit}
						submitButtonText="Create Course"
						elements={() => (
							<React.Fragment>
							<div className="grid-66">
								<div className="course--header">
									<h4 className="course--label">Course</h4>
										<input 
											id="title" 
											name="title" 
											type="text"
											value={title}
											className="input-title course--title--input"
											onChange={this.change} 
											placeholder="Course Title" 
										/>
								</div>
								<p>
									By {authUserObject.firstName} {authUserObject.lastName}
								</p>
								<div className="course--description">
									<h4 className="course--label">Course Description</h4>
										<textarea 
											id="description" 
											name="description"
											type="text"
											value={description} 
											onChange={this.change} 
											placeholder="Course Description" 
										/>
								</div>
							</div>
							<div className="grid-25 grid-right">
									<div className="course--stats">
										<ul className="course--stats--list">
											<li className="course--stats--list--item">
												<h4>Estimated Time</h4>
													<input 
														id="estimatedTime"
														name="estimatedTime"
														type="text"
														className="course--time--input"
														value={estimatedTime}
														onChange={this.change}
														placeholder="Hours"
													/>
											</li>
											<li className="course--stats--list--item">
												<h4>Materials Needed</h4>	
													<textarea 
														id="materialsNeeded"
														name="materialsNeeded"
														type="text"
														value={materialsNeeded}
														onChange={this.change}
														placeholder="List Materials" 
													/>
											</li>
										</ul>
									</div>
							</div>
							</React.Fragment>
						)} 
					/>  {/*End Form*/}
				</div>
			</div>
		);
	}
	
	change = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState(() => {
			return {
				[name]: value
			};
		});
	}
	
	submit = () => {
		const { context } = this.props;
		const {
			title,
			description,
			estimatedTime,
			materialsNeeded,
		} = this.state;
		
		// Get the signed in user's id
		const authUser = context.authenticatedUser;
		const userPass = context.userPass;
		const authUserObject = authUser[0][0]; // authenticatedUser is still returning an object nested within two arrays
		const userId = authUserObject.id;
		//console.log(userId);
		//console.log(authUserObject.emailAddress);
		//console.log(userPass);
		
		// Create newCourse variable
		const newCourse = {
			title,
			description,
			estimatedTime,
			materialsNeeded,
			userId
		}
		
		console.log(newCourse);
		
		context.data.createCourse(newCourse, authUserObject.emailAddress, userPass)
			.then( errors => {
				if (errors.length) {
					this.setState({ errors });
				} else {
					console.log("New Course was created")
					this.props.history.push('/');
				}
			})
			.catch((error) => {
				console.log(error);
				this.props.history.push('/error');
			});
		
	}
	
	cancel = () => {
	// Returns the user to the main page (list of courses)
		this.props.history.push('/');
	}
	
}
export default CreateCourse;
