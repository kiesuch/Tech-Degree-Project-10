// Stateful Component
// Reference HTML files from the markup folder provided
import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
// Import the form component
import Form from './Form';

class UpdateCourse extends Component {

	state = {
		courseId: '',
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: '',
		ownerId: '',
		ownerFirstName: '',
		ownerLastName: '',
		errors: []
	}

	componentDidMount(){
		const { context } = this.props;
		const courseId = this.props.match.params;
		this.setState({courseId: courseId.id});
		// console.log(courseId.id);
		// console.log(context.data.getCourse(courseId.id));
		
		context.data.getCourse(courseId.id)
			.then((courseInfo) =>
				this.setState({	title: courseInfo.course.title,
								description: courseInfo.course.description,
								estimatedTime: courseInfo.course.estimatedTime,
								materialsNeeded: courseInfo.course.materialsNeeded,
								ownerId: courseInfo.course.userId,
								ownerFirstName: courseInfo.course.user.firstName,
								ownerLastName: courseInfo.course.user.lastName
				}), 
			)
			.catch((error) =>{
				console.log("componentDidMount Error: " + error);
				console.log("this.state.courses test: (.catch) ");
				this.props.history.push("/");
			});
		
		this.setState({
			materialsNeededList: this.state.materialsNeeded.split("*")
		})
	}
	
	render() {
		const {
		title,
		description,
		estimatedTime,
		materialsNeeded,
		errors
		} = this.state;	

		return (
			<div className="bounds">
				<div className="course--detail">
					<h1>Update Course</h1>
					<Form 
						cancel={this.cancel}
						errors={errors}
						submit={this.submit}
						submitButtonText="Update Course"
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
									By {this.state.ownerFirstName} {this.state.ownerLastName}
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
		
		// Create updatedCourse variable
		const updatedCourse = {
			title,
			description,
			estimatedTime,
			materialsNeeded
		}
		
		console.log(updatedCourse);
	
		if(this.state.ownerId === authUserObject.id){
			context.data.updateCourse(this.state.courseId, updatedCourse, authUserObject.emailAddress, userPass)
				.then( errors => {
					if (errors.length) {
						this.setState({ errors });
					} else {
						console.log("Course was Updated")
						this.props.history.push('/');
					}
				})
				.catch((error) => {
					console.log(error);
					this.props.history.push('/error');
				});
			
		} else {
			// Prevent the unauthorized user from modifying the course
				console.log("Course Update has failed");
				this.props.history.push('/forbidden');
		}
	}
	
	cancel = () => {
	// Returns the user to the main page (list of courses)
		this.props.history.push('/');
	}
		
}
export default UpdateCourse;