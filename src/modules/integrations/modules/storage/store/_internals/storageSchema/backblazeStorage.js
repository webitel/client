import Storage from '../enums/Storage.enum';
import defaultStorage from './defaults/defaultStorage';

const backblazeStorage = () => ({
	...defaultStorage(),
	type: Storage.BACKBLAZE,
	properties: {
		directory: '',
		email: '',
		privateKey: '',
	},
});

export default backblazeStorage;
