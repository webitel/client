<template>
  <wt-popup min-width="480" overflow @close="close">
    <template v-slot:title>
      {{ $t('objects.ccenter.agents.addSkill') }}
    </template>
    <template v-slot:main>
      <form>
        <wt-select
          :clearable="false"
          :label="$tc('objects.lookups.skills.skills', 1)"
          :search-method="loadDropdownOptionsList"
          :v="v$.itemInstance.skill"
          :value="itemInstance.skill"
          required
          @input="setItemProp({ prop: 'skill', value: $event })"
        ></wt-select>
        <wt-input
          :label="$t('objects.lookups.skills.capacity')"
          :number-max="100"
          :number-min="0"
          :v="v$.itemInstance.capacity"
          :value="itemInstance.capacity"
          required
          type="number"
          @input="setItemProp({ prop: 'capacity', value: +$event })"
        ></wt-input>
      </form>
    </template>
    <template v-slot:actions>
      <wt-button
        :disabled="disabledSave"
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
import { useVuelidate } from '@vuelidate/core';
import { maxValue, minValue, numeric, required } from '@vuelidate/validators';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import SkillsAPI from '../../../../../../lookups/modules/agent-skills/api/agentSkills';

export default {
  name: 'opened-agent-skills-popup',
  mixins: [nestedObjectMixin],
  data: () => ({
    namespace: 'ccenter/agents/skills',
  }),

  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      skill: { required },
      capacity: {
        numeric,
        minValue: minValue(0),
        maxValue: maxValue(100),
        required,
      },
    },
  },

  methods: {
    loadDropdownOptionsList(params) {
      return SkillsAPI.getLookup(params);
    },
  },
};
</script>

<style scoped>

</style>
