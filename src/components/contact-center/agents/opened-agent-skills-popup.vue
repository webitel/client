<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $t('objects.ccenter.agents.addSkill') }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="skill"
          :v="$v.itemInstance.skill"
          :label="$tc('objects.ccenter.skills.skills', 1)"
          :search="loadDropdownOptionsList"
          :internal-search="false"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'skill', value: $event })"
        ></wt-select>
        <wt-input
          :value="capacity"
          :v="$v.itemInstance.capacity"
          :label="$t('objects.ccenter.skills.capacity')"
          :number-min="0"
          :number-max="100"
          type="number"
          required
          @input="setItemProp({ prop: 'capacity', value: +$event })"
        >
          <template slot="validation-text">
            {{ capacityValidationText }}
          </template>
        </wt-input>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="computeDisabled"
        @click="save"
      >{{ $t('objects.add') }}
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
import { mapState } from 'vuex';
import {
 maxValue, minValue, numeric, required,
} from 'vuelidate/lib/validators';
import { getAgentSkills } from '../../../api/contact-center/agents/agentSkills';
import nestedObjectMixin from '../../../mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-agent-skills-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace: 'ccenter/agents/skills',
  }),

  validations: {
    itemInstance: {
      skill: {
        required,
      },
      capacity: {
        numeric,
        minValue: minValue(0),
        maxValue: maxValue(100),
        required,
      },
    },
  },

  computed: {
    ...mapState('ccenter/agents/skills', {
      id: (state) => state.itemId,
      parentId: (state) => state.parentId,
      itemInstance: (state) => state.itemInstance,
      skill: (state) => state.itemInstance.skill,
      capacity: (state) => state.itemInstance.capacity,
    }),

    capacityValidationText() {
      const v = this.$v.itemInstance.capacity;
      if (!v.$invalid) return '';
      if (!v.required) return this.$t('validation.required');
      if (!v.numeric) return this.$t('validation.numeric');
      if (!v.minValue) return `${this.$t('validation.minValue')} ${v.$params.minValue.min}`;
      if (!v.maxValue) return `${this.$t('validation.maxValue')} ${v.$params.maxValue.max}`;
      return '';
    },
  },

  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getAgentSkills(this.parentId, 1, 10, search);
      return response.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>

<style scoped>

</style>
