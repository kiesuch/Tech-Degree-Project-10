// Referenced "React Authentication" Course/Instruction Pages

import React from 'react';
import {
	BrowserRouter,
	Switch,
	Route
} from "react-router-dom";
import './global.css';

// Import App Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

import NotFound from './components/NotFound';
import Error from './components/Error';
import Forbidden from './components/Forbidden';

import UserSignUp from './components/UserSignUp'; // SIGN UP (clarification)
import UserSignIn from './components/UserSignIn'; // SIGN IN (clarification)
import UserSignOut from './components/UserSignOut'; // SIGN OUT (clarification)


// Import withContext  
import withContext from './Context';

// Import PrivateRoute
import PrivateRoute from './PrivateRoute';

// Initialize "withContext" variables 
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

const UserSignUpWithContext = withContext(UserSignUp); // SIGN UP (clarification)
const UserSignInWithContext = withContext(UserSignIn); // SIGN IN (clarification)
const UserSignOutWithContext = withContext(UserSignOut); // SIGN OUT (clarification)

export default () => (	
	<BrowserRouter>
		<div>
		<HeaderWithContext />	
			<Switch>
				<Route exact path = '/' component = {CoursesWithContext}></Route>
				<PrivateRoute path = "/courses/create" component = {CreateCourseWithContext} />
				<PrivateRoute path = "/courses/:id/update" component = {UpdateCourseWithContext} />
				<Route exact path = "/courses/:id" component = {CourseDetailWithContext} />
				<Route exact path = "/signin" component = {UserSignInWithContext} />
				<Route exact path = "/signup" component = {UserSignUpWithContext} />
				<Route exact path = "/signout" component = {UserSignOutWithContext} />
				<Route exact path = "/forbidden" component = {Forbidden} />
				<Route exact path = "/error" component = {Error} />
				<Route component = {NotFound} />
			</Switch>
		</div>
	</BrowserRouter>
);