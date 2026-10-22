<template>
  <section>
    <div class="opened-card-input-grid">
      <wt-single-select
        v-model:model-value="modelValue.object"
        :disabled="!isNew || disableUserInput"
        :label="t('objects.system.changelogs.objects', 1)"
        :regle-validation="validationFields?.object"
        :search-method="ChangelogsAPI.getObjectsList"
        :show-clear="false"
        required
      />
      <wt-single-select
        v-model:model-value="modelValue.storage"
        :disabled="disableUserInput || !hasStorageReadAccess"
        :label="t('objects.system.changelogs.storage')"
        :search-method="BackendProfilesAPI.getLookup"
      />
      <wt-input-number
        v-model:model-value="modelValue.daysToStore"
        :disabled="disableUserInput"
        :label="t('objects.system.changelogs.daysToStore')"
        :regle-validation="validationFields?.daysToStore"
        required
      />
      <wt-single-select
        v-model:model-value="modelValue.period"
        :disabled="disableUserInput"
        :label="t('objects.system.changelogs.period.period')"
        :options="periodOptions"
        :show-clear="false"
        data-key="value"
        option-value="value"
      />
      <wt-textarea
        v-model:model-value="modelValue.description"
        :disabled="disableUserInput"
        :label="t('objects.description')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { BackendProfilesAPI, ChangelogsAPI } from '@webitel/api-services/api';
import type { ChangelogCard } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<ChangelogCard>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<ChangelogCard>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasStorageReadAccess } = useUserAccessControl(
	WtObject.Storage,
);

/** [Claude] the logged object is fixed once the changelog is saved */
const isNew = computed(() => !modelValue.value.id);

/** [Claude] how often the logs are moved to the storage, in days */
const periodOptions = [
	{
		value: 1,
		locale: 'objects.system.changelogs.period.options.daily',
	},
	{
		value: 7,
		locale: 'objects.system.changelogs.period.options.weekly',
	},
	{
		value: 14,
		locale: 'objects.system.changelogs.period.options.fortnightly',
	},
	{
		value: 30,
		locale: 'objects.system.changelogs.period.options.monthly',
	},
];
</script>
