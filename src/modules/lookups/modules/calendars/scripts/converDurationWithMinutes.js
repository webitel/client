const convertDurationWithMinutes = (duration) => {
	if (!duration) return "00:00";

	let hour = `${Math.floor(duration / 60)}`;
	// eslint-disable-next-line no-mixed-operators
	let min = `${Math.floor(duration % 60)}`;
	// eslint-disable-next-line no-mixed-operators

	if (hour.length === 1) hour = `0${hour}`;
	if (min.length === 1) min = `0${min}`;

	return `${hour}:${min}`;
};

export default convertDurationWithMinutes;
