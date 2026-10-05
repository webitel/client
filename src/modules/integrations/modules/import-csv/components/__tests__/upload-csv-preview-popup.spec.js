import { shallowMount } from '@vue/test-utils';

import UploadCsvPreviewPopup from '../upload-csv-preview-popup.vue';

describe('UploadCsvPreviewPopup', () => {
	const props = {
		file: null,
		mappingFields: [],
	};

	it('renders a component', () => {
		const wrapper = shallowMount(UploadCsvPreviewPopup, {
			props,
		});

		expect(wrapper).toBeTruthy();
	});

	/*
	An undeclared prop falls through to $attrs, and the composable would never
	see it — the import would then close as a success without saving anything.
	 */
	it.each([
		'file',
		'mappingFields',
		'addBulkItems',
		'handlingMode',
		'fileUploadHandler',
		'skipHeaders',
		'separator',
		'charset',
	])('declares the %s prop', (prop) => {
		expect(Object.keys(UploadCsvPreviewPopup.props)).toContain(prop);
	});

	it('processes the csv instead of uploading the raw file by default', () => {
		const wrapper = shallowMount(UploadCsvPreviewPopup, {
			props,
		});

		expect(wrapper.props('handlingMode')).toBe('process');
	});
});
