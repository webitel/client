import { describe, expect, it, vi } from 'vitest';

import OpenedUserGeneral from '../opened-user-general.vue';

const { methods } = OpenedUserGeneral;

const makeCtx = (overrides = {}) => ({
	setItemProp: vi.fn(),
	isReplaceConfirmShown: false,
	itemInstance: {
		device: {},
		devices: [],
		generateDevice: false,
	},
	...overrides,
});

describe('OpenedUserGeneral — device generation', () => {
	it('enables generation immediately when no device is selected', () => {
		const ctx = makeCtx();
		methods.onToggleGenerateDevice.call(ctx, true);
		expect(ctx.setItemProp).toHaveBeenCalledWith({
			prop: 'generateDevice',
			value: true,
		});
		expect(ctx.isReplaceConfirmShown).toBe(false);
	});

	it('opens confirmation and keeps switcher off when a default device is set', () => {
		const ctx = makeCtx({
			itemInstance: {
				device: {
					id: '1',
				},
				devices: [
					{
						id: '1',
					},
				],
				generateDevice: false,
			},
		});
		methods.onToggleGenerateDevice.call(ctx, true);
		expect(ctx.isReplaceConfirmShown).toBe(true);
		expect(ctx.setItemProp).not.toHaveBeenCalled();
	});

	it('opens confirmation when only devices list is filled', () => {
		const ctx = makeCtx({
			itemInstance: {
				device: {},
				devices: [
					{
						id: '1',
					},
				],
				generateDevice: false,
			},
		});
		methods.onToggleGenerateDevice.call(ctx, true);
		expect(ctx.isReplaceConfirmShown).toBe(true);
		expect(ctx.setItemProp).not.toHaveBeenCalled();
	});

	it('clears devices, enables generation and closes confirmation on confirm', () => {
		const ctx = makeCtx({
			isReplaceConfirmShown: true,
			itemInstance: {
				device: {
					id: '1',
				},
				devices: [
					{
						id: '1',
					},
				],
			},
		});
		methods.onConfirmReplaceDevices.call(ctx);
		expect(ctx.setItemProp).toHaveBeenCalledWith({
			prop: 'device',
			value: {},
		});
		expect(ctx.setItemProp).toHaveBeenCalledWith({
			prop: 'devices',
			value: [],
		});
		expect(ctx.setItemProp).toHaveBeenCalledWith({
			prop: 'generateDevice',
			value: true,
		});
		expect(ctx.isReplaceConfirmShown).toBe(false);
	});

	it('keeps switcher off and closes confirmation on cancel', () => {
		const ctx = makeCtx({
			isReplaceConfirmShown: true,
		});
		methods.onCancelReplaceDevices.call(ctx);
		expect(ctx.setItemProp).not.toHaveBeenCalled();
		expect(ctx.isReplaceConfirmShown).toBe(false);
	});

	it('disables generation when switcher is turned off', () => {
		const ctx = makeCtx({
			itemInstance: {
				device: {
					id: '1',
				},
				devices: [
					{
						id: '1',
					},
				],
				generateDevice: true,
			},
		});
		methods.onToggleGenerateDevice.call(ctx, false);
		expect(ctx.setItemProp).toHaveBeenCalledWith({
			prop: 'generateDevice',
			value: false,
		});
	});
});

describe('OpenedUserGeneral — default device sync', () => {
	it('resets default device when it is removed from the devices list', () => {
		const ctx = makeCtx({
			itemInstance: {
				device: {
					id: '1',
				},
				devices: [
					{
						id: '1',
					},
				],
			},
		});
		methods.onDevicesChange.call(ctx, [
			{
				id: '2',
			},
		]);
		expect(ctx.setItemProp).toHaveBeenCalledWith({
			prop: 'devices',
			value: [
				{
					id: '2',
				},
			],
		});
		expect(ctx.setItemProp).toHaveBeenCalledWith({
			prop: 'device',
			value: {},
		});
	});

	it('keeps default device when it is still in the devices list', () => {
		const ctx = makeCtx({
			itemInstance: {
				device: {
					id: '1',
				},
				devices: [
					{
						id: '1',
					},
				],
			},
		});
		methods.onDevicesChange.call(ctx, [
			{
				id: '1',
			},
			{
				id: '2',
			},
		]);
		expect(ctx.setItemProp).toHaveBeenCalledWith({
			prop: 'devices',
			value: [
				{
					id: '1',
				},
				{
					id: '2',
				},
			],
		});
		expect(ctx.setItemProp).not.toHaveBeenCalledWith({
			prop: 'device',
			value: {},
		});
	});
});
