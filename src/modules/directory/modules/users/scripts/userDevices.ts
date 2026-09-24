import type { User } from '../types/User';

export const hasAssignedDevices = (user: User) =>
	!!user.device?.id || !!user.devices?.length;

export const setUserDevices = (user: User, devices: User['devices']) => {
	user.devices = devices;

	const defaultDeviceId = user.device?.id;
	if (
		defaultDeviceId &&
		!devices?.some((device) => device.id === defaultDeviceId)
	) {
		user.device = {};
	}
};

export const replaceUserDevicesWithGenerated = (user: User) => {
	user.device = {};
	user.devices = [];
	user.generateDevice = true;
};
