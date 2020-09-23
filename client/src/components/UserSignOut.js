// Stateless Component
// Referenced "React Authentication" Course/Instruction Pages
// Reference HTML files from the markup folder provided

import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default ({context}) => {
	useEffect(() =>  context.actions.signOut());

	return (
		<Redirect to="/" />
	);
}
