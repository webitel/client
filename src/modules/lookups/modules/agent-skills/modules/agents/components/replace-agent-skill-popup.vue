<template>
  <wt-popup min-width="480" overflow @close="close">
    <template v-slot:title>
      {{ $t('objects.lookups.skills.changeAgentsSkill') }}
    </template>
    <template v-slot:main>
      <div class="skill-select-wrapper">
        <wt-select
          v-model="itemInstance.skill"
          :clearable="false"
          :label="$t('objects.lookups.skills.changeSkillTo')"
          :search-method="loadDropdownOptionsList"
          :v="v$.itemInstance.skill"
          required
        ></wt-select>
      </div>
      <wt-switcher
        v-model="skillState"
        :label="$t('objects.lookups.skills.state')"
        label-left
      >
      </wt-switcher>
    </template>
    <template v-slot:actions>
      <wt-button
        :disabled="computeDisabled"
        @click="change"
      >{{ $t('objects.change') }}
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
import { required } from '@vuelidate/validators';
import openedObjectValidationMixin
  from '../../../../../../../app/mixins/baseMixins/openedObjectValidationMixin/openedObjectValidationMixin';
import SkillsAPI from '../../../api/agentSkills';

export default {
  name: 'opened-skill-agent-change-popup',
  mixins: [openedObjectValidationMixin],
  props: {
    selectedAgents: {
      type: Array,
      required: true,
    },
  },
  emits: ['close', 'change'],
  data: () => ({
    namespace: 'lookups/skills',
    subNamespace: 'agents',
    itemInstance: {
      skill: {},
    },
    skillState: false,
  }),
  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      skill: { required },
    },
  },
  methods: {
    loadDropdownOptionsList(params) {
      return SkillsAPI.getLookup(params);
    },
    change() {
      const id = this.selectedAgents.map((item) => item.id);
      const changes = {
        enabled: this.skillState,
        skill: this.itemInstance.skill,
      };
      this.$emit('change', { changes, id });
      this.close();
    },
    close() {
      this.$emit('close');
    },
  },
  computed: {
    computeDisabled() {
      return this.checkValidations();
    },
  },
};
</script>

<style lang="scss" scoped>
.skill-select-wrapper {
  margin-bottom: var(--spacing-sm);
}
</style>
