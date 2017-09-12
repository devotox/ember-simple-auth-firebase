import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
	authorize(token, setHeader) {
		setHeader('accessToken', token);
	}
});
