import Storage from '../enums/Storage.enum';
import defaultStorage from './defaults/defaultStorage';

const dropboxStorage = () => ({
	...defaultStorage(),
	type: Storage.DROPBOX,
	properties: {
		token: '',
	},
});

export default dropboxStorage;
