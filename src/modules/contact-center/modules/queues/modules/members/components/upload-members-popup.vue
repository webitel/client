<template>
  <upload-csv-popup
    v-bind="$attrs"
    v-model="mappingFields"
    :add-bulk-items="saveBulkData"
    :file="file"
    @close="close"
  />
</template>

<script>
import uploadCSVWrapperComponentMixin from '../../../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
import ImportCsvMemberMappings from '../../../../../../integrations/modules/import-csv/lookups/ImportCsvMemberMappings.lookup';
import normalizeCsvMembers from '../mixins/normalizeCsvMembers';

export default {
	name: 'UploadMembersPopup',
	mixins: [
		uploadCSVWrapperComponentMixin,
		normalizeCsvMembers,
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
		bulk: [],
		allCommunications: null,
		mappingFields: Object.entries(ImportCsvMemberMappings).map(
			([name, mapping]) => ({
				...mapping,
				name,
			}),
		),
	}),
};
</script>

<style lang="scss" scoped>
</style>
