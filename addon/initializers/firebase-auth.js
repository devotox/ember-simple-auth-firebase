import FirebaseAuthorizer from '../authorizers/firebase';

import FirebaseAuthenticator from '../authenticators/firebase';

export function initialize(application) {
	application.register('authorizer:firebase', FirebaseAuthorizer);
	application.register('authenticator:firebase', FirebaseAuthenticator);
}

export default {
	initialize,
	name: 'firebase-auth',
	before: 'ember-simple-auth'
};
