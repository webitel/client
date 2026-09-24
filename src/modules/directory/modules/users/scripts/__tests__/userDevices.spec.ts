import { describe, expect, it } from 'vitest';

import type { User } from '../../types/User';
import {
	hasAssignedDevices,
	replaceUserDevicesWithGenerated,
	setUserDevices,
} from '../userDevices';

const makeUser = (overrides: Partial<User> = {}) =>
	({
		device: {},
		devices: [],
		generateDevice: false,
		...overrides,
	}) as User;

describe('hasAssignedDevices', () => {
	it('is false when no device is selected', () => {
		expect(hasAssignedDevices(makeUser())).toBe(false);
	});

	it('is true when a default device is set', () => {
		expect(
			hasAssignedDevices(
				makeUser({
					device: {
						id: '1',
					},
				}),
			),
		).toBe(true);
	});

	it('is true when only devices list is filled', () => {
		expect(
			hasAssignedDevices(
				makeUser({
					devices: [
						{
							id: '1',
						},
					],
				}),
			),
		).toBe(true);
	});
});

describe('setUserDevices', () => {
	it('resets default device when it is removed from the devices list', () => {
		const user = makeUser({
			device: {
				id: '1',
			},
			devices: [
				{
					id: '1',
				},
			],
		});

		setUserDevices(user, [
			{
				id: '2',
			},
		]);

		expect(user.devices).toEqual([
			{
				id: '2',
			},
		]);
		expect(user.device).toEqual({});
	});

	it('keeps default device when it is still in the devices list', () => {
		const user = makeUser({
			device: {
				id: '1',
			},
			devices: [
				{
					id: '1',
				},
			],
		});

		setUserDevices(user, [
			{
				id: '1',
			},
			{
				id: '2',
			},
		]);

		expect(user.device).toEqual({
			id: '1',
		});
	});
});

describe('replaceUserDevicesWithGenerated', () => {
	it('clears devices and enables generation', () => {
		const user = makeUser({
			device: {
				id: '1',
			},
			devices: [
				{
					id: '1',
				},
			],
		});

		replaceUserDevicesWithGenerated(user);

		expect(user).toMatchObject({
			device: {},
			devices: [],
			generateDevice: true,
		});
	});
});
