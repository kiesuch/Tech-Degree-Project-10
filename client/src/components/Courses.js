// ***************************
// PLACEHOLDER USER INTERFACE
// ***************************

/*import React from 'react';

const Courses = () => (
	<div className="bounds">
		<div className="grid-33">
			<a className="course--module course--link" href="course-detail">
				<h4 className="course--label">Course</h4>
				<h3 className="course--title">Build a Basic Bookcase</h3>
			</a>
		</div>
		<div className="grid-33"><a className="course--module course--add--module" href="create-course">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a></div>
	</div>
)

export default Courses;*/


// Stateful Component
// Reference HTML files from the markup folder provided
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
	
	state = {
		courses: []
	};

	componentDidMount(){
		const { context } = this.props;
		// console.log("Context test: ");
		// console.log(context);
		// console.log("context.data.getCourses test: ");
		// console.log(context.data.getCourses()); // Shows the promise results has the courses in an array of objects
		
		context.data.getCourses()
			.then((retrievedCourses) =>
				this.setState({courses: retrievedCourses.courses}),
				// console.log("this.state.courses test: (.then) "), 
				// console.log(this.state.courses)
			)
			.catch((error) =>{
				// console.log("componentDidMount Error: " + error);
				// console.log("this.state.courses test: (.catch) ");
				// console.log(this.state.courses);
				this.props.history.push("/error");
			});
	}	
		
	render(){
		const coursesList = this.state.courses.map((courses) => {
			return(
				<div className="grid-33" key={courses.id}> {/* Unique key prop warning fix referenced from: https://sentry.io/answers/unique-key-prop/ */} 
					<a className="course--module course--link" href="/courses/course-detail"> {/* {pathname:`/courses/${courses.id}`} */}
						<h4 className="course--label">Course</h4>
						<h3 className="course--title">{courses.title}</h3>
					</a>
				</div>
			)
		});
		// console.log("coursesList test: ");
		// console.log(coursesList);

		return(
			<div className="bounds">
				{ coursesList }

				<div className="grid-33">
					<a className="course--module course--add--module" href="/courses/create">
						<h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
						<polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
						</svg>New Course</h3>
					</a>
				</div>
			</div>
		)
	}
}

export default Courses;
