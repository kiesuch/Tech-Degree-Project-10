// Referenced "React Authentication" Course/Instruction Pages
// "Helper" Class

import config from './config';

export default class Data {
	// Giving default values for requiresAuth and credentials 
	api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
		const url = config.apiBaseUrl + path;
		
		const options = {
			method,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		};

		if (body !== null) {
			options.body = JSON.stringify(body);
		}

		if (requiresAuth) {		
			// Use the btoa method to create a base-64 encoded ASCII string from a string of data.
			const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
			options.headers['Authorization'] = `Basic ${encodedCredentials}`;
		}
		return fetch(url, options);
	}

	async getUser(emailAddress, password) {
		const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
		console.log(response);
		if (response.status === 200) {
			return response.json().then(data => data);
		}
		else if (response.status === 401) {
			return null;
		}
		else {
			throw new Error();
		}
	}
	
	async createUser(user) {
		const response = await this.api(`/users`, 'POST', user);
		console.log(response);
		if (response.status === 201) {
			return [];
		}
		else if (response.status === 400) {
			return response.json().then(data => {
				return data.errors;
			});
		}
		else {
			throw new Error();
		}
	}
}