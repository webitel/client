<template>
  <section>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="properties.keyId"
        :disabled="disableUserInput"
        :label="t('objects.integrations.storage.s3Key')"
        :regle-validation="propertiesFields?.keyId"
        required
      />
      <wt-input-text
        v-model:model-value="properties.accessKey"
        :disabled="disableUserInput"
        :label="t('objects.integrations.storage.s3Access')"
        :label-props="{ hint: t('objects.directory.passwordInfo'), hintPosition: 'right' }"
        :regle-validation="propertiesFields?.accessKey"
        required
      />
      <wt-input-text
        v-model:model-value="properties.bucketName"
        :disabled="disableUserInput"
        :label="t('objects.integrations.storage.bucket')"
        :regle-validation="propertiesFields?.bucketName"
        required
      />
      <wt-input-text
        v-model:model-value="properties.pathPattern"
        :disabled="disableUserInput"
        :label="t('objects.integrations.storage.pathPattern')"
      />
      <wt-single-select
        :disabled="disableUserInput || !!modelValue.id"
        :label="t('objects.service')"
        :model-value="service"
        :options="serviceOptions"
        option-label="name"
        data-key="value"
        @update:model-value="setService"
      />
      <wt-single-select
        v-if="!isCustom"
        v-model:model-value="properties.region"
        :disabled="disableUserInput"
        :label="t('objects.integrations.storage.region')"
        :options="regionOptions"
        :regle-validation="propertiesFields?.region"
        :show-clear="false"
        option-label="name"
        option-value="value"
        data-key="value"
        required
      />
      <wt-input-text
        v-if="isCustom"
        v-model:model-value="properties.endpoint"
        :disabled="disableUserInput"
        :label="t('objects.integrations.storage.s3Endpoint')"
        :regle-validation="propertiesFields?.endpoint"
        required
      />
      <wt-input-text
        v-if="isCustom"
        v-model:model-value="properties.region"
        :disabled="disableUserInput"
        :label="t('objects.integrations.storage.region')"
        :regle-validation="propertiesFields?.region"
        required
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import type { StorageBackendProfile } from '@webitel/api-services/gen/models';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import AWSRegions from '../lookups/AWSRegions.lookup';
import DigitalOceanRegions from '../lookups/DigitalOceanRegions.lookup';
import StorageService, {
	getStorageService,
} from '../lookups/StorageService.lookup';

type StorageServiceOption =
	(typeof StorageService)[keyof typeof StorageService];

const modelValue = defineModel<StorageBackendProfile>({
	required: true,
});

const props = defineProps<{
	validationFields?: CardValidationFields<StorageBackendProfile>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const properties = computed(
	() => modelValue.value.properties as Record<string, string>,
);

/** [Claude] `properties` is a loose map in the model, so regle can't infer its field names */
const propertiesFields = computed(
	() =>
		props.validationFields?.properties?.$fields as
			| Record<string, RegleSchemaFieldStatus>
			| undefined,
);

const serviceOptions = Object.values(StorageService);

const service = computed(() => getStorageService(properties.value.endpoint));

const isCustom = computed(() => service.value === StorageService.CUSTOM);

const regionOptions = computed(() => {
	if (service.value === StorageService.AWS) return AWSRegions;
	if (service.value === StorageService.DO) return DigitalOceanRegions;
	return [];
});

/** [Claude] a region belongs to its service, so it is picked again */
const setService = ({ endpoint }: StorageServiceOption) => {
	properties.value.endpoint = endpoint;
	properties.value.region = '';
};
</script>
