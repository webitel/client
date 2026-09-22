<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.directory.devices.hotdesk') }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <wt-multi-select
        v-model:model-value="modelValue.hotdesks"
        :custom-validators="hotDeskNameValidator"
        :disabled="disableUserInput"
        :label="t('objects.directory.devices.hostName')"
        :label-props="{ hint: t('objects.directory.devices.hotdeskInputHint') }"
        :options="modelValue.hotdesks"
        :regle-validation="validationFields?.hotdesks"
        :data-key="null"
        chips-view
        allow-custom-values
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import type { ApiDevice } from '@webitel/api-services/gen/models';
import { WtMultiSelect } from '@webitel/ui-sdk/components';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<ApiDevice>({
	required: true,
});

defineProps<{
	validationFields?: {
		[K in keyof ApiDevice]?: RegleSchemaFieldStatus<ApiDevice[K]>;
	};
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const hotDeskNameValidator = computed(() => [
	{
		name: 'hotDeskNameValidator',
		text: t('objects.directory.devices.hotdeskIncorrectInput'),
	},
]);
</script>
