import { shallowMount } from '@vue/test-utils';

import UploadUsersPopup from '../upload-users-popup.vue';

describe('UploadUsersPopup', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(UploadUsersPopup, {
			props: {
				file: {},
			},
		});

		expect(wrapper).toBeTruthy();
	});

	/*
	The popup only wires the sdk module: it owns the mapping fields and the
	saver, everything else lives in @webitel/ui-sdk/modules/UploadCsvPopup.
	 */
	it('renders the sdk popup', () => {
		const wrapper = shallowMount(UploadUsersPopup, {
			props: {
				file: {},
			},
		});

		expect(wrapper.html()).toContain('wt-upload-csv-popup');
	});
});
