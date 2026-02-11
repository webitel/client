import generateHotdeskAccount from '../scripts/generateHotdeskAccount';
import defaultDevice from './defaults/defaultDevice';

const hotdeskDevice = () => ({
	...defaultDevice(),
	account: generateHotdeskAccount(),
	hotdesk: true,
	hotdesks: [],
});

export default hotdeskDevice;
