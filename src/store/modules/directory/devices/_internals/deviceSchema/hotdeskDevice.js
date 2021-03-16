import defaultDevice from './defaults/defaultDevice';
import generateHotdeskAccount from '../scripts/generateHotdeskAccount';

const hotdeskDevice = () => ({
  ...defaultDevice(),
  account: generateHotdeskAccount(),
  hotdesk: true,
  hotdesks: [],
});

export default hotdeskDevice;
