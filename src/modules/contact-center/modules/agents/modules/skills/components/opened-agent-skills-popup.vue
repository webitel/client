<template>
  <wt-popup v-bind="$attrs" size="sm" :shown="!!skillId" overflow @close="close">
    <template #title>
      {{ $t('objects.ccenter.agents.addSkill') }}
    </template>
    <template #main>
      <form>
        <wt-select :clearable="false" :label="$t('objects.lookups.skills.skills', 1)"
          :search-method="loadDropdownOptionsList" :v="v$.itemInstance.skill" :value="itemInstance.skill" required
          @input="setItemProp({ prop: 'skill', value: $event })" />
        <wt-input :label="$t('objects.lookups.skills.capacity')" :number-max="100" :number-min="0"
          :v="v$.itemInstance.capacity" :value="itemInstance.capacity" required type="number"
          @input="setItemProp({ prop: 'capacity', value: +$event })" />
      </form>
    </template>
    <template #actions>
      <wt-button :disabled="disabledSave" @click="save">
        {{ $t('objects.add') }}
      </wt-button>
      <wt-button color="secondary" @click="close">
        {{ $t('objects.close') }}
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
  name: 'OpenedAgentSkillsPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    // Reasons for use $stopPropagation
    // https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
    v$: useVuelidate({ $stopPropagation: true }),
  }),
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

  computed: {
    skillId() {
      return this.$route.params.skillId;
    }
  },

  watch: {
    skillId: {
      handler(id) {
        if (id) {
          this.setId(id);
          this.loadItem();
        }
      }, immediate: true,
    }
  },

  methods: {
    loadDropdownOptionsList(params) {
      return SkillsAPI.getLookup(params);
    },
  }
};
</script>

<style scoped></style>
