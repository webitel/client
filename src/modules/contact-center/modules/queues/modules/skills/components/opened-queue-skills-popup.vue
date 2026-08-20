<template>
  <wt-popup
    v-bind="$attrs"
    :shown="!!skillId"
    overflow
    size="sm"
    @close="close"
  >
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form @submit.prevent="save">
        <wt-single-select
          v-model:model-value="modelValue.skill"
          :disabled="!hasSkillsReadAccess"
          :label="t('objects.lookups.skills.skills', 1)"
          :regle-validation="validationFields?.skill"
          :search-method="loadSkillsOptions"
          :show-clear="false"
          required
        />
        <wt-input-number
          v-model:model-value="modelValue.lvl"
          :label="t('objects.lookups.skills.lvl')"
          :regle-validation="validationFields?.lvl"
        />
        <div class="input-row-wrap">
          <wt-input-number
            v-model:model-value="modelValue.minCapacity"
            :label="t('objects.lookups.skills.minCapacity')"
            :regle-validation="validationFields?.minCapacity"
          />
          <wt-input-number
            v-model:model-value="modelValue.maxCapacity"
            :label="t('objects.lookups.skills.maxCapacity')"
            :regle-validation="validationFields?.maxCapacity"
          />
        </div>
        <wt-multi-select
          v-model:model-value="modelValue.buckets"
          :disabled="!hasBucketsReadAccess"
          :label="t('objects.lookups.buckets.buckets', 1)"
          :search-method="loadBucketsOptions"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="!hasSaveActionAccess || hasValidationErrors"
        @click="save"
      >
        {{ t('objects.save') }}
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
import { BucketsAPI, SkillsAPI } from '@webitel/api-services/api';
import type { EngineQueueSkill } from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import QueuesRoutesName from '../../../router/_internals/QueuesRoutesName.enum';
import { useQueueSkillsCardStore } from '../stores';

const emit = defineEmits<{
	saved: [];
}>();

const { t } = useI18n();
const route = useRoute();

const { hasSaveActionAccess } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});
const { hasReadAccess: hasSkillsReadAccess } = useUserAccessControl(
	WtObject.Skill,
);
const { hasReadAccess: hasBucketsReadAccess } = useUserAccessControl(
	WtObject.Bucket,
);

const {
	modelValue,
	validationFields,
	isNew,
	hasValidationErrors,
	save: saveItem,
} = useNestedCardComponent<EngineQueueSkill>({
	useCardStore: useQueueSkillsCardStore,
	routeParamName: 'skillId',
	parentId: route.params.id as string,
});

const skillId = computed(() => route.params.skillId);

const popupTitle = computed(() => {
	const action = isNew.value ? t('reusable.add') : t('reusable.edit');
	return `${action} ${t('objects.lookups.skills.skills', 1).toLowerCase()}`;
});

const { close } = useClose(QueuesRoutesName.SKILLS);

const save = async () => {
	await saveItem();
	close();
	emit('saved');
};

const loadSkillsOptions = (params: unknown) => SkillsAPI.getLookup(params);
const loadBucketsOptions = (params: unknown) => BucketsAPI.getLookup(params);
</script>

<style lang="scss" scoped></style>
