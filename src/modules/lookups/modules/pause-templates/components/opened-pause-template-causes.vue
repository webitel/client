<template>
  <section class="opened-pause-template-causes">
    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.routing.chatGateways.templates.templates', 1) }}
      </h3>

      <div class="content-header__actions-wrap">
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="plus"
          @click="addCause"
        />
      </div>
    </header>

    <div class="table-wrapper">
      <div class="table-wrapper__visible-scroll-wrapper">
        <wt-table
          :data="itemInstance.causes"
          :grid-actions="!disableUserInput"
          :headers="headers"
          :selectable="false"
        >
          <template #name="{ item, index }">
            <wt-select
              :search-method="loadAgentPauseCause"
              :value="item.name"
              @input="setCause({ index, value: $event })"
            />
          </template>
          <template #duration="{ item, index }">
            <wt-input
              class="opened-pause-template-causes__duration"
              :disabled="disableUserInput"
              :value="item.duration"
              type="number"
              required
              @input="setCause({ prop: 'duration', index, value: +$event })"
            />
          </template>
          <template #actions="{ item, index }">
            <wt-icon-action
              action="delete"
              @click="removeCause(index)"
            />
          </template>
        </wt-table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import AgentPauseCauseAPI from '../../agent-pause-cause/api/agentPauseCause.js';
export default {
  name: 'OpenedPauseTemplateCauses',
  mixins: [openedTabComponentMixin],
  computed: {
    headers() {
      return [
        {
          value: 'name',
          text: this.$t('objects.lookups.pauseTemplates.pauseReason'),
        },
        {
          value: 'duration',
          text: this.$t('objects.lookups.pauseTemplates.duration'),
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      addCause(dispatch, payload) {
        dispatch(`${this.namespace}/ADD_CAUSE`, payload);
      },
      setCause(dispatch, payload) {
        dispatch(`${this.namespace}/SET_CAUSE`, payload);
      },
      removeCause(dispatch, payload) {
        dispatch(`${this.namespace}/REMOVE_CAUSE`, payload);
      },
    }),
    loadAgentPauseCause(params) {
      return AgentPauseCauseAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>
.opened-pause-template-causes__duration {
  width: 100%;
}
</style>
