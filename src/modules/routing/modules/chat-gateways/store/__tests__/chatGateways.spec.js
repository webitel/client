import chatGateways from '../chatGateways';

describe('chatGateways store', () => {
	it('SET_ITEM_METADATA mutation correctly changes passed store deeply', () => {
		const state = {
			itemInstance: {
				metadata: {
					appointment: {
						prop: 'value',
					},
				},
			},
		};
		const prop = 'appointment';
		const value = {
			prop: 'newValue',
		};
		chatGateways.mutations.SET_ITEM_METADATA(state, {
			prop,
			value,
		});
		expect(state.itemInstance.metadata.appointment).toEqual(value);
	});
});
