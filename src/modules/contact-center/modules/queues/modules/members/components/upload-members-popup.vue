<template>
  <wt-upload-csv-popup
    v-bind="$attrs"
    :add-bulk-items="saveBulkData"
    :file="file"
    :mapping-fields="mappingFields"
    @change-mapping-fields="mappingFields = $event"
    @close="close"
  />
</template>

<script>
import { WtUploadCsvPopup } from '@webitel/ui-sdk/modules/UploadCsvPopup';

import ImportCsvMemberMappings from '../../../../../../integrations/modules/import-csv/lookups/ImportCsvMemberMappings.lookup';
import normalizeCsvMembers from '../mixins/normalizeCsvMembers';

export default {
	name: 'UploadMembersPopup',
	components: {
		WtUploadCsvPopup,
	},
	mixins: [
		normalizeCsvMembers,
	],
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
		allCommunications: null,
		mappingFields: Object.entries(ImportCsvMemberMappings).map(
			([name, mapping]) => ({
				...mapping,
				name,
			}),
		),
	}),
	methods: {
		close() {
			this.$emit('close');
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
