<template>
  <wt-upload-csv-popup
    :file="file"
    :mapping-fields="mappingFields"
    :handling-mode="handlingMode"
    :file-upload-handler="uploadFile"
    @close="close"
  />
</template>

<script>
import {
	HandlingCSVMode,
	WtUploadCsvPopup,
} from '@webitel/ui-sdk/modules/UploadCsvPopup';

import resourceDisplayApi from '../api/resourceDisplay';

export default {
	name: 'UploadResourceNumbersPopup',
	components: {
		WtUploadCsvPopup,
	},
	props: {
		file: {
			required: true,
		},
		parentId: {
			type: [
				Number,
				String,
			],
			required: true,
		},
	},

	data: () => ({
		handlingMode: HandlingCSVMode.UPLOAD,
		mappingFields: [
			{
				name: 'number',
				locale: 'objects.ccenter.res.csvMappingFields.number',
				required: true,
				csv: '',
			},
		],
	}),

	methods: {
		close() {
			this.$emit('close');
		},
		async uploadFile() {
			const selectedColumn = this.mappingFields[0].csv;

			const payload = {
				parentId: this.parentId,
				file: this.file,
				delimiter: this.separator || ',',
				map: selectedColumn,
			};

			await resourceDisplayApi.uploadNumbers(payload);
		},
	},
};
</script>
