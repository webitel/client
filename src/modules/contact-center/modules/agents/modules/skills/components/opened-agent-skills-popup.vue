<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $t('objects.ccenter.agents.addSkill') }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="itemInstance.skill"
          :v="$v.itemInstance.skill"
          :label="$tc('objects.lookups.skills.skills', 1)"
          :search="loadDropdownOptionsList"
          :internal-search="false"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'skill', value: $event })"
        ></wt-select>
        <wt-input
          :value="itemInstance.capacity"
          :v="$v.itemInstance.capacity"
          :label="$t('objects.lookups.skills.capacity')"
          :number-min="0"
          :number-max="100"
          type="number"
          required
          @input="setItemProp({ prop: 'capacity', value: +$event })"
        ></wt-input>
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
import {
 maxValue, minValue, numeric, required,
} from 'vuelidate/lib/validators';
import { getSkillsList } from '../../../../../../lookups/modules/agent-skills/api/agentSkills';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-agent-skills-popup',
  mixins: [nestedObjectMixin],
  data: () => ({
    namespace: 'ccenter/agents/skills',
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
    async loadDropdownOptionsList(search) {
      const response = await getSkillsList({ search });
      if (!response?.list) return [];
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>

<style scoped>

</style>
