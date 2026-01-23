<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text :disabled="disableUserInput" :label="$t('objects.name')" :v="v.itemInstance.name"
        :model-value="itemInstance.name" required @update:model-value="setItemProp({ prop: 'name', value: $event })" />
      <wt-select :clearable="true" :disabled="disableUserInput" :label="$t('objects.team')"
        :search-method="loadDropdownOptionsTeamList" :value="itemInstance.teams" multiple
        @input="setItemProp({ prop: 'teams', value: $event })" />
      <wt-textarea :disabled="disableUserInput" :label="$t('vocabulary.text')" :model-value="itemInstance.text"
        :v="v.itemInstance.text" required @update:model-value="setItemProp({ prop: 'text', value: $event })" />
      <wt-select :clearable="true" :disabled="disableUserInput" :label="$t('objects.ccenter.queues.queues', 1)"
        :search-method="loadDropdownOptionsQueueList" :value="itemInstance.queues" multiple
        @input="setItemProp({ prop: 'queues', value: $event })" />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import QueuesAPI from '../../../../contact-center/modules/queues/api/queues.js';
import TeamsAPI from '../../../../contact-center/modules/teams/api/teams.js';

export default {
  name: 'OpenedBucketGeneral',
  mixins: [openedTabComponentMixin],
  methods: {
    loadDropdownOptionsTeamList(params) {
      return TeamsAPI.getLookup(params);
    },
    loadDropdownOptionsQueueList(params) {
      return QueuesAPI.getLookup(params);
    }
  }
};
</script>

<style scoped></style>
