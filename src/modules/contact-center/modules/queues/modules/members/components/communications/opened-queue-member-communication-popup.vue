<template>
  <wt-popup
    v-bind="$attrs"
    :shown="!!communicationIndex"
    size="sm"
    @close="close"
  >
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form
        class="object-input-grid object-input-grid__1-col"
        @submit.prevent="save"
      >
        <wt-input-text
          v-model:model-value="draft.destination"
          :label="t('objects.ccenter.members.destination')"
          :regle-validation="r$.$fields.destination"
          required
        />
        <wt-single-select
          v-model:model-value="draft.type"
          :disabled="!hasCommunicationsReadAccess"
          :label="t('objects.lookups.communications.communications', 1)"
          :regle-validation="r$.$fields.type"
          :search-method="loadCommunicationTypes"
          :show-clear="false"
          required
        />
        <wt-single-select
          v-model:model-value="draft.resource"
          :disabled="!hasResourcesReadAccess"
          :label="t('objects.ccenter.res.res', 1)"
          :search-method="loadResources"
        />
        <wt-input-text
          v-model:model-value="draft.display"
          :label="t('objects.ccenter.members.display')"
        />
        <wt-input-text
          v-model:model-value="draft.dtmf"
          :label="t('objects.ccenter.members.dtmf')"
          :regle-validation="r$.$fields.dtmf"
        />
        <wt-input-number
          v-model:model-value="draft.priority"
          :label="t('objects.ccenter.members.priority')"
        />
        <wt-textarea
          v-model:model-value="draft.description"
          :label="t('objects.description')"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="r$.$invalid"
        @click="save"
      >
        {{ t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script lang="ts" setup>
import { useRegleSchema } from '@regle/schemas';
import {
	CommunicationsAPI,
	OutboundResourcesAPI as ResourcesAPI,
} from '@webitel/api-services/api';
import type { EngineMemberCommunication } from '@webitel/api-services/gen/models';
import { memberCommunicationSchema } from '@webitel/api-services/validations';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed, ref, toRaw, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../../app/composables/useUserAccessControl';
import { emptyCommunication } from '../../composables/useMemberCommunications';

/**
 * Deliberately not `useNestedCardComponent`.
 *
 * That composable needs a card store whose api can `get`/`add`/`update` an
 * entity by id, but a communication has no id and no endpoint — it is an entry
 * in the member's unsaved draft, addressed by its index. So the popup keeps its
 * own draft and validates it against the same Zod schema the member uses,
 * handing the result back to the tab.
 */
const props = defineProps<{
	communications: EngineMemberCommunication[];
}>();

const emit = defineEmits<{
	save: [
		{
			index: number | null;
			item: EngineMemberCommunication;
		},
	];
}>();

const { t } = useI18n();

const { hasReadAccess: hasCommunicationsReadAccess } = useUserAccessControl(
	WtObject.Communication,
);
const { hasReadAccess: hasResourcesReadAccess } = useUserAccessControl(
	WtObject.Resource,
);

const communicationIndex = defineModel<string | null>('communicationIndex', {
	default: null,
});

const isNew = computed(() => communicationIndex.value === 'new');

const draft = ref<EngineMemberCommunication>(emptyCommunication());

watch(
	communicationIndex,
	(index) => {
		draft.value =
			index && index !== 'new'
				? structuredClone(toRaw(props.communications[Number(index)]))
				: emptyCommunication();
	},
	{
		immediate: true,
	},
);

const { r$ } = useRegleSchema(draft, memberCommunicationSchema, {
	autoDirty: true,
	syncState: {
		onValidate: true,
	},
});

const popupTitle = computed(() => {
	const action = isNew.value ? t('reusable.add') : t('reusable.edit');
	return `${action} ${t('objects.lookups.communications.communications', 1).toLowerCase()}`;
});

const close = () => {
	communicationIndex.value = null;
};

const save = async () => {
	const { valid } = await r$.$validate();
	if (!valid) return;

	emit('save', {
		index: isNew.value ? null : Number(communicationIndex.value),
		item: draft.value,
	});
	close();
};

const loadCommunicationTypes = (params: unknown) =>
	CommunicationsAPI.getLookup(params);
const loadResources = (params: unknown) => ResourcesAPI.getLookup(params);
</script>

<style lang="scss" scoped></style>
