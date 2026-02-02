<template>
  <wt-popup
    v-bind="$attrs"
    size="sm"
    :shown="!!skillId"
    overflow
    @close="close"
  >
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form>
        <wt-select
          :clearable="false"
          :disabled="!hasSkillsReadAccess"
          :label="$t('objects.lookups.skills.skills', 1)"
          :search-method="loadSkillsOptions"
          :v="v$.itemInstance.skill"
          :value="itemInstance.skill"
          required
          @input="setItemProp({ prop: 'skill', value: $event })"
        />
        <wt-input-number
          :label="$t('objects.lookups.skills.lvl')"
          :v="v$.itemInstance.lvl"
          :model-value="itemInstance.lvl"
          @update:model-value="setItemProp({ prop: 'lvl', value: +$event })"
        />
        <div class="input-row-wrap">
          <wt-input-number
            :custom-validators="minCapacityCustomValidator"
            :label="$t('objects.lookups.skills.minCapacity')"
            :v="v$.itemInstance.minCapacity"
            :model-value="itemInstance.minCapacity"
            @update:model-value="setItemProp({ prop: 'minCapacity', value: +$event })"
          />
          <wt-input-number
            :custom-validators="maxCapacityCustomValidator"
            :label="$t('objects.lookups.skills.maxCapacity')"
            :v="v$.itemInstance.maxCapacity"
            :model-value="itemInstance.maxCapacity"
            @update:model-value="setItemProp({ prop: 'maxCapacity', value: +$event })"
          />
        </div>
        <wt-select
          :close-on-select="false"
          :disabled="!hasBucketsReadAccess"
          :label="$t('objects.lookups.buckets.buckets', 1)"
          :search-method="loadBucketsOptions"
          :value="itemInstance.buckets"
          multiple
          @input="setItemProp({ prop: 'buckets', value: $event })"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        @click="save"
      >
        {{ $t('objects.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { maxValue, minValue, required } from '@vuelidate/validators';
import { WtObject } from '@webitel/ui-sdk/enums';

import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import { lessOrEqualTo, moreOrEqualTo } from '../../../../../../../app/utils/validators';
import SkillsAPI from '../../../../../../lookups/modules/agent-skills/api/agentSkills';
import BucketsAPI from '../../../../../../lookups/modules/buckets/api/buckets';
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';

export default {
  name: 'OpenedQueueSkillsPopup',
  mixins: [nestedObjectMixin],

  setup: () => {
    // Reasons for use $stopPropagation
    // https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
    const v$ = useVuelidate({ $stopPropagation: true });
    const { hasReadAccess: hasSkillsReadAccess } = useUserAccessControl(WtObject.Skill);
    const { hasReadAccess: hasBucketsReadAccess } = useUserAccessControl(WtObject.Bucket);
    return {
      v$,
      hasSkillsReadAccess,
      hasBucketsReadAccess,
    };
  },
  data: () => ({
    namespace: 'ccenter/queues/skills',
  }),
  validations: {
    itemInstance: {
      skill: { required },
      lvl: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(1000),
      },
      minCapacity: {
        minValue: minValue(0),
        maxValue: maxValue(100),
        lessOrEqualTo: lessOrEqualTo('maxCapacity'),
      },
      maxCapacity: {
        minValue: minValue(0),
        maxValue: maxValue(100),
        moreOrEqualTo: moreOrEqualTo('minCapacity'),
      },
    },
  },
  computed: {
    minCapacityCustomValidator() {
      return [
        {
          name: 'lessOrEqualTo',
          text: this.$t('objects.lookups.skills.minCapacityLessOrEqualToMaxCapacityValidator'),
        },
      ];
    },
    maxCapacityCustomValidator() {
      return [
        {
          name: 'moreOrEqualTo',
          text: this.$t('objects.lookups.skills.maxCapacityMoreOrEqualToMinCapacityValidator'),
        },
      ];
    },
    popupTitle() {
      return this.id
        ? this.$t('objects.ccenter.queues.skills.editSkill')
        : this.$t('objects.ccenter.queues.skills.addSkill');
    },
    skillId() {
      return this.$route.params.skillId;
    }
  },
  watch: {
    skillId: {
      handler(id) {
        this.handleIdChange(id);
      }, immediate: true,
    },
  },

  methods: {
    loadSkillsOptions(params) {
      return SkillsAPI.getLookup(params);
    },

    loadBucketsOptions(params) {
      return BucketsAPI.getLookup(params);
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
.input-row-wrap {
  display: flex;
  margin-bottom: 10px;

  .wt-input-number {
    width: 50%;

    &:first-child {
      margin-right: 18px;
    }
  }
}
</style>
