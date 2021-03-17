<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.variables') }}</h3>
      <wt-icon-btn
        v-if="!disableUserInput"
        class="icon-action"
        icon="plus"
        :tooltip="$t('iconHints.add')"
        @click="addVariable"
      ></wt-icon-btn>
    </header>
    <form class="object-input-grid">
      <div class="variables">
        <div
          class="value-pair"
          v-for="(variable, key) in variables"
          :key="key"
        >
          <wt-input
            :value="variable.key"
            :placeholder="$t('objects.ccenter.queues.varKey')"
            :disabled="disableUserInput"
            @input="setVariableProp({index: key, prop: 'key', value: $event})"
          ></wt-input>
          <wt-input
            :value="variable.value"
            :placeholder="$t('objects.ccenter.queues.varVal')"
            :disabled="disableUserInput"
            @input="setVariableProp({index: key, prop: 'value', value: $event})"
          ></wt-input>
          <wt-icon-btn
            v-if="!disableUserInput"
            icon="bucket"
            :tooltip="$t('iconHints.delete')"
            @click="deleteVariable(key)"
          ></wt-icon-btn>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import openedTabComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-queue-outbound-ivr-variables',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('ccenter/queues', {
      variables: (state) => state.itemInstance.variables,
    }),
  },

  methods: {
    ...mapActions('ccenter/queues', {
      addVariable: 'ADD_VARIABLE_PAIR',
      setVariableProp: 'SET_VARIABLE_PROP',
      deleteVariable: 'DELETE_VARIABLE_PAIR',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
