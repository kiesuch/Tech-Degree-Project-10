// Referenced "React Authentication" Course/Instruction Pages

import React, { Component } from 'react';
// Importing the helper class within Data.js
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

	state = {
		authenticatedUser: null
	};

	// Initialized a new instance of the Data class in the constructor.
	constructor() {
		super();
		this.data = new Data();
	}

	render() {
		const { authenticatedUser } = this.state;
		
		// Created a Value object
		const value = {
			authenticatedUser,
			data: this.data,
			actions: {
				signIn: this.signIn,
				signOut: this.signOut
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
		if (user !== null) {
			this.setState(() => {
				return {
					authenticatedUser: user
				};
			});
		}
		return user;
	}

	signOut = () => {
		this.setState({ authenticatedUser: null });
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

