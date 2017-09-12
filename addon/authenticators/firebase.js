import RSVP from 'rsvp';

import Firebase from 'firebase';

import { classify } from '@ember/string';

import { getOwner } from '@ember/application';

import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
	firebase: null,

	error(msg) { throw new Error(msg); },

	config() {
		let owner = getOwner(this);
		return owner.resolveRegistration('config:environment');
	},

	provider(name) {
		let ProviderFunction = Firebase.auth[classify(`${name}AuthProvider`)];
		return ProviderFunction ? new ProviderFunction() : this.error(`No Provider Function For ${name}`);
	},

	init() {
		this._super();
		let config = this.config();

		return !config.firebase
			? this.error('No Firebase Configuration Defined')
			: this.set('firebase', Firebase.initializeApp(config.firebase));
	},

	async authenticate({
		email,
		password,
		options: {
			provider = 'password',
			redirect = false
		} = {}
	} = {}) {
		let firebase = this.get('firebase');

		let params = provider !== 'password'
			? [this.provider(provider)]
			: [email, password];

		let signInFunction = provider === 'password'
			? 'signInWithEmailAndPassword'
			: redirect
				? 'signInWithRedirect'
				: 'signInWithPopup';

		let { credential, user: { displayName, photoURL } } = await firebase.auth()[signInFunction](...params);
		return { credential, user: { displayName, email, photoURL } };
	},

	async restore(credentials) {
		console.log(credentials);

		try {
			await this.authStateChanged();
		}
		catch(e) {
			return this.logout();
		}

		return credentials;
	},

	async authStateChanged() {
		return new RSVP.Promise((resolve, reject) => {
			let firebase = this.get('firebase');
			firebase.auth().onAuthStateChanged(resolve, reject);
		});
	},

	invalidate() {
		let firebase = this.get('firebase');
		return firebase.auth().signOut();
	}
});
