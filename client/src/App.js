// Referenced "React Authentication" Course/Instruction Pages

import React, { Component } from 'react';
import {
	BrowserRouter,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import './global.css';

// Import App Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import NotFound from './components/NotFound';

import UserSignUp from './components/UserSignUp'; // SIGN UP (clarification)
import UserSignIn from './components/UserSignIn'; // SIGN IN (clarification)
import UserSignOut from './components/UserSignOut'; // SIGN OUT (clarification)


// Import withContext  
import withContext from './Context';

// Initialize "withContext" variables 
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);

const UserSignUpWithContext = withContext(UserSignUp); // SIGN UP (clarification)
const UserSignInWithContext = withContext(UserSignIn); // SIGN IN (clarification)
const UserSignOutWithContext = withContext(UserSignOut); // SIGN OUT (clarification)

export default () => (	
	<BrowserRouter>
		<div>
		<HeaderWithContext />	
			<Switch>
				<Route exact path='/' ><Redirect to='/Courses'></Redirect></Route>
				<Route path="/courses" component={CoursesWithContext} />
				<Route path ="/course-detail" component={CourseDetailWithContext} />
				<Route path="/signin" component={UserSignInWithContext} />
				<Route path="/signup" component={UserSignUpWithContext} />
				<Route path="/signout" component={UserSignOutWithContext} />
				<Route component = {NotFound} />
			</Switch>
		</div>
	</BrowserRouter>
);