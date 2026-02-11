import Storage from '../enums/Storage.enum';
import defaultStorage from './defaults/defaultStorage';

const driveStorage = () => ({
	...defaultStorage(),
	type: Storage.DRIVE,
	properties: {
		properties: {},
	},
});

export default driveStorage;
