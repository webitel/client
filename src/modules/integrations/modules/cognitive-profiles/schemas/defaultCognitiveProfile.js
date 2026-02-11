import CognitiveProfileServices from '../lookups/CognitiveProfileServices.lookup';

const defaultCognitiveProfile = () => ({
	name: '',
	default: false,
	enabled: true,
	provider: null,
	service: CognitiveProfileServices[0],
	description: '',
});

export default defaultCognitiveProfile;
