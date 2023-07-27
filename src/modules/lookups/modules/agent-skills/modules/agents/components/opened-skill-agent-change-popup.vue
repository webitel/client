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
import { mapActions } from 'vuex';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import SkillsAPI from '../../../api/agentSkills';

const namespace = 'lookups/skills';
const subNamespace = 'agents';
export default {
  name: 'opened-skill-agent-change-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace,
    subNamespace,
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
    loadDropdownOptionsList(params) {
      return SkillsAPI.getLookup(params);
    },
    ...mapActions({
      patchItem(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/PATCH_ITEM_PROPERTY`, payload);
      },
    }),
    changeAgentsSkill() {
      this.selectedAgents.forEach((item, index) => {
        // TODO: Rewrite to BULK_PATCH
        this.patchItem({ item, index, prop: 'skill', value: this.itemInstance.selectedSkill });
        this.patchItem({ item, index, prop: 'enabled', value: this.selectedSkillState });
      });
      this.save();
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
  },
};
</script>

<style lang="scss" scoped>
.mb-16 {
  margin-bottom: var(--spacing-sm);
}
</style>
