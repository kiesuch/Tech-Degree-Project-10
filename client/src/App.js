// Referenced "React Authentication" Course/Instruction Pages

import React from 'react';
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
import CreateCourse from './components/CreateCourse';
import NotFound from './components/NotFound';
import Authenticated from './components/Authenticated'; // Authentication Test

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
const AuthenticatedWithContext = withContext(Authenticated); // Authentication Test
const NotFoundWithContext = withContext(NotFound);

const UserSignUpWithContext = withContext(UserSignUp); // SIGN UP (clarification)
const UserSignInWithContext = withContext(UserSignIn); // SIGN IN (clarification)
const UserSignOutWithContext = withContext(UserSignOut); // SIGN OUT (clarification)

export default () => (	
	<BrowserRouter>
		<div>
		<HeaderWithContext />	
			<Switch>
				<Route exact path = '/' ><Redirect to = '/courses'></Redirect></Route>
				<Route exact path = "/courses" component = {CoursesWithContext} />
				<PrivateRoute path = "/authenticated" component = {AuthenticatedWithContext} /> {/* Private Route Test*/}
				<Route exact path = "/courses/course-detail" component = {CourseDetailWithContext} />
				<Route path = "/courses/create" component = {CreateCourseWithContext} />
				<Route exact path = "/signin" component = {UserSignInWithContext} />
				<Route exact path = "/signup" component = {UserSignUpWithContext} />
				<Route exact path = "/signout" component = {UserSignOutWithContext} />
				<Route component = {NotFoundWithContext} />
			</Switch>
		</div>
	</BrowserRouter>
);