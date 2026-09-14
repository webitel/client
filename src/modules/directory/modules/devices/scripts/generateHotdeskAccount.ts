/**
 * Generate a random hotdesk SIP account (`hot-` + charset).
 */
export const generateHotdeskAccount = (length = 7): string => {
	const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let value = 'hot-';
	for (let i = 0; i < length; i += 1) {
		value += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	return value;
};
