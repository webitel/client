export default (length = 7) => {
	const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let value = 'hot-';
	for (let i = 0; i < length; i += 1) {
		value += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	return value;
};
