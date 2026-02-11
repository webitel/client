import defaultGateway from './defaults/defaultGateway';

const trunkingGateway = () => ({
	...defaultGateway(),
	register: false,
	host: '',
	ipacl: [
		// {
		//   ip: '',
		//   proto: 'any',
		//   port: null,
		// },
	],
});

export default trunkingGateway;
