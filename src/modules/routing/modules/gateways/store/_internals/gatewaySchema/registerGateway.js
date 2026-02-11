import defaultGateway from './defaults/defaultGateway';

const registerGateway = () => ({
	...defaultGateway(),
	register: true,
	account: '',
	username: '',
	expires: 600,
	password: '',
});

export default registerGateway;
