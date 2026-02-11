import { shallowMount } from '@vue/test-utils';

import UploadCsvPopup from '../upload-csv-popup.vue';

describe('UploadCsvPopup', () => {
	const props = {
		file: {},
	};

	it('renders a component', () => {
		const wrapper = shallowMount(UploadCsvPopup, {
			props,
		});
		expect(wrapper).toBeTruthy();
	});
});
