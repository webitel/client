import Storage from '../enums/Storage.enum';
import defaultStorage from './defaults/defaultStorage';

const localStorageProfile = () => ({
	...defaultStorage(),
	type: Storage.LOCAL,
	properties: {
		directory: '',
	},
});

export default localStorageProfile;
