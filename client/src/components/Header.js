// Stateless Component
// Referenced "React Authentication" Course/Instruction Pages
// Reference HTML files from the markup folder provided
import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
	render() {
		const { context } = this.props;
		const authUser = context.authenticatedUser;
		console.log(authUser);
		if(authUser){
			console.log(authUser.firstName);
		}
		return (
			<div className="header">
				<div className="bounds">
					<h1 className="header--logo">Courses</h1>
					<nav>
						{authUser ? (
							<React.Fragment>
							<span>Welcome, {authUser.emailAddress}, {authUser.firstName}, {authUser.lastName}!</span>
								<Link to="/signout">Sign Out</Link>
							</React.Fragment>
						) : (
							<React.Fragment>
								<Link className="signup" to="/signup">Sign Up</Link>
								<Link className="signin" to="/signin">Sign In</Link>
							</React.Fragment>
						)}
					</nav>
				</div>
			</div>
		);
	}
};