// ***************************
// PLACEHOLDER USER INTERFACE
// ***************************

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


// Stateful Component
// Reference HTML files from the markup folder provided
/*
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CourseDetails extends Component{
	
	state = {
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: ''
		
	}
	
	render(){
		const { context } = this.props;
		
		
		return(
			
		)
		
	}
	
	
}

export default CourseDetails;
*/