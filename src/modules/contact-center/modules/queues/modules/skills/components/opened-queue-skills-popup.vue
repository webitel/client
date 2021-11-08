<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.lookups.skills.skills', 1) }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="itemInstance.skill"
          :v="$v.itemInstance.skill"
          :label="$tc('objects.lookups.skills.skills', 1)"
          :search="loadSkillsOptions"
          :internal-search="false"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'skill', value: $event })"
        ></wt-select>
        <wt-input
          :value="itemInstance.lvl"
          :v="$v.itemInstance.lvl"
          :label="$t('objects.lookups.skills.lvl')"
          type="number"
          @input="setItemProp({ prop: 'lvl', value: +$event })"
        ></wt-input>
        <div class="input-row-wrap">
          <wt-input
            :value="itemInstance.minCapacity"
            :v="$v.itemInstance.minCapacity"
            :custom-validators="minCapacityCustomValidator"
            :label="$t('objects.lookups.skills.minCapacity')"
            :number-min="0"
            :number-max="100"
            type="number"
            @input="setItemProp({ prop: 'minCapacity', value: +$event })"
          ></wt-input>
          <wt-input
            :value="itemInstance.maxCapacity"
            :v="$v.itemInstance.maxCapacity"
            :custom-validators="maxCapacityCustomValidator"
            :label="$t('objects.lookups.skills.maxCapacity')"
            :number-min="0"
            :number-max="100"
            type="number"
            @input="setItemProp({ prop: 'maxCapacity', value: +$event })"
          ></wt-input>
        </div>
        <wt-select
          :value="itemInstance.buckets"
          :label="$tc('objects.lookups.buckets.buckets', 1)"
          :search="loadBucketsOptions"
          :close-on-select="false"
          :internal-search="false"
          multiple
          @input="setItemProp({ prop: 'buckets', value: $event })"
        ></wt-select>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="computeDisabled"
        @click="save"
      >{{ $t('objects.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >{{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { required, minValue, maxValue } from 'vuelidate/lib/validators';
import { lessOrEqualTo, moreOrEqualTo } from '../../../../../../../app/utils/validators';
import { getBucketsList } from '../../../../../../lookups/modules/buckets/api/buckets';
import { getSkillsList } from '../../../../../../lookups/modules/agent-skills/api/agentSkills';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-queue-skills-popup',
  mixins: [nestedObjectMixin],
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
      return [{ name: 'lessOrEqualTo', text: this.$t('objects.lookups.skills.minCapacityLessOrEqualToMaxCapacityValidator') }];
    },
    maxCapacityCustomValidator() {
      return [{ name: 'moreOrEqualTo', text: this.$t('objects.lookups.skills.maxCapacityMoreOrEqualToMinCapacityValidator') }];
    },
  },

  methods: {
    async loadSkillsOptions(search) {
      const response = await getSkillsList({ search, size: 50 });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    async loadBucketsOptions(search) {
      const response = await getBucketsList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
.input-row-wrap {
  display: flex;
  margin-bottom: 10px;

  .wt-input {
    width: 50%;

    &:first-child {
      margin-right: 18px;
    }
  }
}
</style>
