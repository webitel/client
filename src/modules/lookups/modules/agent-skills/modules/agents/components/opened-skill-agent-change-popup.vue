<template>
  <wt-popup min-width="480" overflow @close="close">
    <template v-slot:title>
      {{ $t('objects.lookups.skills.changeAgentsSkill') }}
    </template>
    <template v-slot:main>
      {{selectedAgents}}<br>
      {{itemInstance.selectedSkill}}
      <div class="mb-16">
        <wt-select
          v-model="itemInstance.selectedSkill"
          :v="v$.itemInstance.selectedSkill"
          :label="$t('objects.lookups.skills.changeSkillTo')"
          :search-method="loadDropdownOptionsList"
          :clearable="false"
          required
        ></wt-select>
      </div>
      <wt-switcher
        v-model="selectedSkillState"
        :labelLeft="true"
        :label="$t('objects.lookups.skills.state')"
      >
      </wt-switcher>
    </template>
    <template v-slot:actions>
      <wt-button
        :disabled="computeDisabled"
        @click="changeAgentsSkill"
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
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import SkillsAPI from '../../../api/agentSkills';
import AgentSkillsAPI from '../api/skillAgents';
import openedObjectValidationMixin
  from '../../../../../../../app/mixins/baseMixins/openedObjectValidationMixin/openedObjectValidationMixin';

export default {
  name: 'opened-skill-agent-change-popup',
  mixins: [openedObjectValidationMixin],

  data: () => ({
    namespace: 'lookups/skills',
    subNamespace: 'agents',
    itemInstanceValue: {
      selectedSkill: {},
    },
    selectedSkillState: false,
  }),
  props: {
    selectedRows: {
      type: Object,
      required: true,
    },
  },
  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      selectedSkill: { required },
    },
  },
  methods: {
    ...mapActions({
      loadDataList(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/LOAD_DATA_LIST`, payload);
      },
    }),
    loadDropdownOptionsList(params) {
      return SkillsAPI.getLookup(params);
    },
    async changeAgentsSkill() {
      const id = this.selectedAgents.map((item) => item.id);
      const parentId = this.id;
      const changes = {
        enabled: this.selectedSkillState,
        skill: this.itemInstance.selectedSkill,
      };
      await AgentSkillsAPI.patch({ parentId, changes, id });
      const params = {
        page: 1,
        size: 10,
      };
      await this.loadDataList(params);
      this.close();
    },
    close() {
      this.$emit('close');
    },
  },
  computed: {
    selectedAgents() {
      return this.selectedRows;
    },
    itemInstance: {
      get() {
        return this.itemInstanceValue;
      },
      set(value) {
        this.itemInstanceValue = value;
      },
    },
    computeDisabled() {
      return this.checkValidations();
    },
    ...mapState({
      id(state) {
        return getNamespacedState(state, this.namespace).itemId;
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
.mb-16 {
  margin-bottom: var(--spacing-sm);
}
</style>
