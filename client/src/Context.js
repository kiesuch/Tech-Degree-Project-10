// Referenced "React Authentication" Course/Instruction Pages

import React, { Component } from 'react';
// Import js-cookie 
import Cookies from 'js-cookie';
// Importing the helper class within Data.js
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

	state = {
		authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
		userPass: Cookies.getJSON('userPass') || null
	};

	// Initialized a new instance of the Data class in the constructor.
	constructor() {
		super();
		this.data = new Data();
	}

	render() {
		const { authenticatedUser, userPass } = this.state;
		
		// Created a Value object
		const value = {
			authenticatedUser,
			userPass,
			data: this.data,
			actions: {
				signIn: this.signIn,
				signOut: this.signOut,
			},
		};
		return (
			// Passing context to the provider
			<Context.Provider value={value}>
				{this.props.children}
			</Context.Provider>	
		);
	}

	// Specify the parameters needed to the signIn function
	signIn = async (emailAddress, password) => {
		const user = await this.data.getUser(emailAddress, password);
		console.log(password);
		if (user !== null) {
			this.setState(() => {
				return {
					authenticatedUser: user,
					userPass: password
				};
			});
			const cookieOptions = {
				expires: 1 // 1 day
			};
			Cookies.set('authenticatedUser', JSON.stringify(user), {cookieOptions});
			Cookies.set('userPass', JSON.stringify(this.state.userPass), {cookieOptions});
			//console.log(this.state.userPass);
		}
		return user;
	}

	signOut = () => {
		this.setState({ authenticatedUser: null });
		this.setState({ password: null });
		Cookies.remove('authenticatedUser');
		Cookies.remove('userPass');
	}	
}

export const Consumer = Context.Consumer;
 
// The higher order fucntion "withContext" is used to connect the components passed to it to all actions and context changes
export default function withContext(Component) {
	return function ContextComponent(props) {
		return (
			<Context.Consumer>
				{context => <Component {...props} context={context} />}
			</Context.Consumer>
		);
	}
}

