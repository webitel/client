<template>
  <section>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-input-text
        :model-value="modelValue.provider"
        :label="t('objects.provider')"
        disabled
        required
      />
      <wt-single-select
        v-model:model-value="modelValue.service"
        :disabled="disableUserInput || !isMicrosoft"
        :label="t('objects.service')"
        :options="serviceOptions"
        :regle-validation="validationFields?.service"
        :show-clear="false"
        option-value="value"
        data-key="value"
        required
      />

      <opened-cognitive-profile-google-key
        v-if="isGoogle"
        v-model="properties"
        :disabled="disableUserInput"
        :invalid="propertiesFields?.key?.$error"
      />
      <template v-else>
        <div v-if="isElevenLabs" />
        <wt-input-text
          v-model:model-value="properties.key"
          :disabled="disableUserInput"
          :label="t('objects.key')"
          :label-props="{ hint: t('objects.directory.passwordInfo'), hintPosition: 'right' }"
          :regle-validation="propertiesFields?.key"
          required
        />
      </template>

      <wt-single-select
        v-if="!isElevenLabs"
        v-model:model-value="properties.locale"
        :disabled="disableUserInput"
        :label="t('objects.integrations.cognitiveProfiles.properties.locale')"
        :options="languageOptions"
        :data-key="null"
        :show-clear="false"
        required
      />
      <wt-single-select
        v-if="isMicrosoft"
        v-model:model-value="properties.region"
        :disabled="disableUserInput"
        :label="t('objects.integrations.cognitiveProfiles.properties.region')"
        :options="MicrosoftRegion"
        :data-key="null"
        :regle-validation="propertiesFields?.region"
        :show-clear="false"
        required
      />
      <div v-else />

      <wt-textarea
        v-model:model-value="modelValue.description"
        :disabled="disableUserInput"
        :label="t('objects.description')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import {
	StorageProviderType,
	StorageServiceType,
} from '@webitel/api-services/gen/models';
import type { CognitiveProfileCard } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MicrosoftLanguage, MicrosoftRegion } from 'webitel-sdk/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import OpenedCognitiveProfileGoogleKey from './opened-cognitive-profile-google-key.vue';

const modelValue = defineModel<CognitiveProfileCard>({
	required: true,
});

const props = defineProps<{
	validationFields?: CardValidationFields<CognitiveProfileCard>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const languageOptions = Object.values(MicrosoftLanguage);

/** [Claude] the services a profile can be set up for, labelled the way the table shows them */
const serviceOptions = [
	StorageServiceType.Tts,
	StorageServiceType.Stt,
].map((value) => ({
	value,
	locale: `objects.${value.toLowerCase()}`,
}));

const isMicrosoft = computed(
	() => modelValue.value.provider === StorageProviderType.Microsoft,
);
const isGoogle = computed(
	() => modelValue.value.provider === StorageProviderType.Google,
);
const isElevenLabs = computed(
	() => modelValue.value.provider === StorageProviderType.ElevenLabs,
);

const properties = computed({
	get: () => modelValue.value.properties as Record<string, unknown>,
	set: (value) => {
		modelValue.value.properties = value;
	},
});

/** [Claude] `properties` is a loose map in the model, so regle can't infer its field names */
const propertiesFields = computed(
	() =>
		props.validationFields?.properties?.$fields as
			| Record<string, RegleSchemaFieldStatus>
			| undefined,
);
</script>
