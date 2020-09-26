// Stateful Component
// Reference HTML files from the markup folder provided

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Import the form component
import Form from './Form';

class CreateCourse extends Component {
	state = {
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: '',
		userId: '',
		errors: [],
	}

	render() {
		const {
			title,
			description,
			estimatedTime,
			materialsNeeded,
			userId,
			errors,
		} = this.state;
		
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
								<input 
									id="title" 
									name="title" 
									type="text"
									value={title} 
									onChange={this.change} 
									placeholder="Course Title" />
								<input 
									id="description" 
									name="description"
									type="text"
									value={description} 
									onChange={this.change} 
									placeholder="Course Description" />
								<input 
									id="estimatedTime" 
									name="estimatedTime"
									type="text"
									value={estimatedTime} 
									onChange={this.change} 
									placeholder="Estimated Course Time" />
								<input 
									id="materialsNeeded" 
									name="materialsNeeded"
									type="text"
									value={materialsNeeded} 
									onChange={this.change} 
									placeholder="Course Materials Needed" />									
							</React.Fragment>
						)} />
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
		
		
	}
	
	cancel = () => {
	// Returns the user to the main page (list of courses)
		this.props.history.push('/');
	}
	
}
export default CreateCourse;
