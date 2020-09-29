// ***************************
// PLACEHOLDER USER INTERFACE
// ***************************
/*
import React from 'react';

const CourseDetails = () => (
	<div className="bounds">
		<div className="grid-33">
			<a className="course--module course--link" href="/">
				<h3 className="course--title">Home</h3>
			</a>
		</div>
	</div>
)

export default CourseDetails;
*/

// Stateful Component
// Reference HTML files from the markup folder provided

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const ReactMarkdown = require('react-markdown')

class CourseDetails extends Component{
	
	state = {
		courseId: '',
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: '',
		ownerId: '',
		ownerFirstName: '',
		ownerLastName: '',
		materialsNeededList: []
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
	
	render(){
		const { context } = this.props;
		let courseOwner = false;
		const courseId = this.state.courseId;
		let deleteCourse = null;
		
		
		if (context.authenticatedUser){
			const authUser = context.authenticatedUser;
			const authUserObject = authUser[0][0];
			const userPass = context.userPass;
			// Check to see if the current user is the course owner
			if(authUserObject.id === this.state.ownerId){
				courseOwner = true;
			} else {
				courseOwner = false;
			}
			//console.log(courseOwner);
			//console.log(authUserObject.id);
			//console.log(this.state.ownerId);
			
			deleteCourse = () => {
				// **** Searched Unit 10 Slack for "Delete" ****
				// **** Refresh code referenced from Slack: Response to "Anne B" from Slack Moderator "Marie" ****
				context.data.deleteCourse(courseId, authUserObject.emailAddress, userPass)
					.then( () => window.location.href = "/"); 
				// this.props.history.push('/'); // Deleted course still shows up until page is refreshed
			}
			// console.log(deleteCourse);
			
		}

		// Button's conditional rendering referenced from: https://reactjs.org/docs/conditional-rendering.html
		return(
			<div>
				<div className="actions--bar">
					<div className="bounds">
						<div className="grid-100">
						{ courseOwner ?
							<span>
								<Link className="button" to={`/courses/${this.state.courseId}/update`}>Update Course</Link>
								<button className="button" onClick = {deleteCourse}>Delete Course</button>
							</span> :
							<div></div>
						}
							<a className="button button-secondary" href="/">Return to List</a>
						</div>
					</div>
				</div>
				<div className="bounds course--detail">
					<div className="grid-66">
						<div className="course--header">
							<h4 className="course--label">Course</h4>
							<h3 className="course--title">{this.state.title}</h3>
							<p>By {this.state.ownerFirstName} {this.state.ownerLastName}</p>
						</div>
						<div className="course--description">
							<ReactMarkdown>{this.state.description}</ReactMarkdown>
						</div>
					</div>
					<div className="grid-25 grid-right">
						<div className="course--stats">
							<ul className="course--stats--list">
								<li className="course--stats--list--item">
									<h4>Estimated Time</h4>
									<h3>{this.state.estimatedTime}</h3>
								</li>
								<li className="course--stats--list--item">
									<h4>Materials Needed</h4>
									<ReactMarkdown>{this.state.materialsNeeded}</ReactMarkdown>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			
		)	
	}	
}

export default CourseDetails;
