<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.skills.skills', 1) }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="skill"
          :v="$v.itemInstance.skill"
          :label="$tc('objects.ccenter.skills.skills', 1)"
          :search="loadSkillsOptions"
          :internal-search="false"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'skill', value: $event })"
        ></wt-select>
        <wt-input
          :value="lvl"
          :v="$v.itemInstance.lvl"
          :label="$t('objects.ccenter.skills.lvl')"
          type="number"
          @input="setItemProp({ prop: 'lvl', value: +$event })"
        ></wt-input>
        <div class="input-row-wrap">
          <wt-input
            :value="minCapacity"
            :label="$t('objects.ccenter.skills.minCapacity')"
            :number-min="0"
            :number-max="100"
            type="number"
            @input="setItemProp({ prop: 'minCapacity', value: +$event })"
          ></wt-input>
          <wt-input
            :value="maxCapacity"
            :label="$t('objects.ccenter.skills.maxCapacity')"
            :number-min="0"
            :number-max="100"
            type="number"
            @input="setItemProp({ prop: 'maxCapacity', value: +$event })"
          ></wt-input>
        </div>
        <wt-select
          :value="buckets"
          :label="$tc('objects.ccenter.buckets.buckets', 1)"
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
import { required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import { getBucketsList } from '../../../../../api/contact-center/buckets/buckets';
import { getSkillsList } from '../../../../../api/contact-center/agentSkills/agentSkills';
import nestedObjectMixin from '../../../../../mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-queue-skills-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace: 'ccenter/queues/skills',
  }),

  validations: {
    itemInstance: {
      skill: { required },
      lvl: { required },
    },
  },
  computed: {
    ...mapState('ccenter/queues/skills', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
      skill: (state) => state.itemInstance.skill,
      lvl: (state) => state.itemInstance.lvl,
      minCapacity: (state) => state.itemInstance.minCapacity,
      maxCapacity: (state) => state.itemInstance.maxCapacity,
      buckets: (state) => state.itemInstance.buckets,
    }),
  },

  methods: {
    async loadSkillsOptions(search) {
      const response = await getSkillsList(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    async loadBucketsOptions(search) {
      const response = await getBucketsList(1, 10, search);
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
