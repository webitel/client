<template>
  <section class="opened-import-csv-settings">
    <header class="opened-card-header">
    </header>
    <div class="opened-card-input-grid">
      <wt-single-select
        v-model:model-value="modelValue.parameters.charset"
        :label="t('objects.CSV.charSet')"
        :options="[defaultCsvCharset]"
        :show-clear="false"
        disabled
      />
      <wt-input-text
        v-model:model-value="modelValue.parameters.separator"
        :disabled="disableUserInput"
        :label="t('objects.CSV.separator')"
        :regle-validation="validationFields?.parameters?.$fields?.separator"
        required
      />
      <wt-switcher
        v-model:model-value="modelValue.parameters.skipHeaders"
        :label="t('objects.CSV.skipHeaders')"
        disabled
      />
      <wt-switcher
        v-model:model-value="modelValue.parameters.clearMembers"
        :label="t('objects.integrations.importCsv.members.clearMembers')"
      />
      <header class="opened-card-header opened-import-csv-settings__mappings-header">
        <div>
          <h3 class="opened-card-header__title">
            {{ t('objects.integrations.importCsv.mappings') }}
          </h3>
          <p>{{ t('objects.integrations.importCsv.mappingsHint') }}</p>
        </div>
      </header>
      <template
        v-for="{ name, locale, multiple, required } of importCsvMemberMappings"
        :key="name"
      >
        <wt-multi-select
          v-if="multiple"
          v-model:model-value="modelValue.parameters.mappings[name]"
          :data-key="null"
          :disabled="disableUserInput"
          :label="t('objects.integrations.importCsv.columnHeader', { name: t(locale) })"
          :options="modelValue.parameters.mappings[name]"
          :regle-validation="validationFields?.parameters?.$fields?.mappings?.$fields?.[name]"
          :required="required"
          allow-custom-values
          chips-view
        />
        <wt-input-text
          v-else
          v-model:model-value="modelValue.parameters.mappings[name]"
          :disabled="disableUserInput"
          :label="t('objects.integrations.importCsv.columnHeader', { name: t(locale) })"
          :regle-validation="validationFields?.parameters?.$fields?.mappings?.$fields?.[name]"
          :required="required"
        />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ImportTemplateCard } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { defaultCsvCharset } from '@webitel/ui-sdk/modules/UploadCsvPopup';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { importCsvMemberMappings } from '../configs/importCsvMemberMappings';

/** [Claude] a new card is seeded from the schema and a saved one comes with them, so `parameters` is always there */
const modelValue = defineModel<
	ImportTemplateCard & {
		parameters: NonNullable<ImportTemplateCard['parameters']>;
	}
>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<ImportTemplateCard>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
</script>

<style scoped>
/* [Claude] the mappings start on a row of their own */
.opened-import-csv-settings__mappings-header {
  grid-column: span 2;
}
</style>
