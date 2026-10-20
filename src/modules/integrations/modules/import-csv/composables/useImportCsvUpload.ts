import { QueueMembersAPI } from '@webitel/api-services/api';
import type { ImportTemplateCard } from '@webitel/api-services/validations';
import { computed, ref } from 'vue';

import { useNormalizeCsvMembers } from '../../../../contact-center/modules/queues/modules/members/composables/useNormalizeCsvMembers';
import { importCsvMemberMappings } from '../configs/importCsvMemberMappings';

/**
 * [Claude] Uploads a csv file into a template's source queue, mapped by the
 * template's columns. One instance serves the whole page: picking a file on a
 * row makes that row's template the one being uploaded.
 */
export const useImportCsvUpload = () => {
	const uploadingItem = ref<ImportTemplateCard | null>(null);
	const file = ref<File | null>(null);

	const parameters = computed(() => uploadingItem.value?.parameters);

	const parentId = computed(() => String(uploadingItem.value?.source?.id));

	const mappingFields = computed(() =>
		importCsvMemberMappings.map((mapping) => ({
			...mapping,
			csv: parameters.value?.mappings[mapping.name] ?? mapping.csv,
		})),
	);

	const { saveBulkData } = useNormalizeCsvMembers({
		parentId,
		file,
		mappingFields,
	});

	const openUpload = (item: ImportTemplateCard, files: FileList | null) => {
		const selected = files?.[0];
		if (!selected) return;
		uploadingItem.value = item;
		file.value = selected;
	};

	const closeUpload = () => {
		file.value = null;
		uploadingItem.value = null;
	};

	const clearMembersBeforeUpload = () => {
		if (!parameters.value?.clearMembers) return;
		QueueMembersAPI.deleteBulk({
			parentId: parentId.value,
			id: [],
		});
	};

	return {
		file,
		parameters,
		mappingFields,
		saveBulkData,
		openUpload,
		closeUpload,
		clearMembersBeforeUpload,
	};
};
