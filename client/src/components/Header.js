// Stateless Component
// Referenced "React Authentication" Course/Instruction Pages
// Reference HTML files from the markup folder provided
import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.PureComponent {
	render() {
		const { context } = this.props;
		const authUser = context.authenticatedUser;
		console.log(authUser);
		
		// Create variable to hold the object within two arrays.
		let authUserObject = null;
		
		// If the variable authUser is not null, then set the authUserObject to the object data nested two arrays deep.
		if(authUser){
			authUserObject = authUser[0][0];
			console.log(authUserObject.firstName);
		}
		return (
			<div className="header">
				<div className="bounds">
					<h1 className="header--logo">Courses</h1>
					<nav>
						{authUser ? (
							<React.Fragment>
							<span>Welcome, {authUserObject.firstName} {authUserObject.lastName}!</span>
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

export default Header;