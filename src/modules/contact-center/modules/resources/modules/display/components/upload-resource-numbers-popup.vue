<template>
  <upload-csv-popup
    :file="file"
    :mapping-fields="mappingFields"
    :handling-mode="handlingMode"
    :file-upload-handler="uploadFile"
    @close="close"
  />
</template>

<script>
import HandlingCSVMode from '../../../../../../_shared/upload-csv-popup/enums/HandlingCSVMode.enum.js';
import uploadCSVWrapperComponentMixin from '../../../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
import resourceDisplayApi from '../api/resourceDisplay';

export default {
	name: 'UploadResourceNumbersPopup',
	mixins: [
		uploadCSVWrapperComponentMixin,
	],
	props: {
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
