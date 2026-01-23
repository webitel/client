<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.ccenter.teams.parameters') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.maxNoAnswer')"
        :v="v.itemInstance.maxNoAnswer"
        :model-value="itemInstance.maxNoAnswer"
        required
        @update:model-value="setItemProp({ prop: 'maxNoAnswer', value: +$event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.noAnswerDelayTime')"
        :v="v.itemInstance.noAnswerDelayTime"
        :model-value="itemInstance.noAnswerDelayTime"
        required
        @update:model-value="setItemProp({ prop: 'noAnswerDelayTime', value: +$event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.taskAcceptTimeout')"
        :v="v.itemInstance.taskAcceptTimeout"
        :model-value="itemInstance.taskAcceptTimeout"
        required
        @update:model-value="setItemProp({ prop: 'taskAcceptTimeout', value: +$event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.callTimeout')"
        :v="v.itemInstance.callTimeout"
        :model-value="itemInstance.callTimeout"
        required
        @update:model-value="setItemProp({ prop: 'callTimeout', value: +$event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.inviteChatTimeout')"
        :v="v.itemInstance.inviteChatTimeout"
        :model-value="itemInstance.inviteChatTimeout"
        required
        @update:model-value="setItemProp({ prop: 'inviteChatTimeout', value: +$event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.wrapUpTime')"
        :v="v.itemInstance.wrapUpTime"
        :model-value="itemInstance.wrapUpTime"
        required
        @update:model-value="setItemProp({ prop: 'wrapUpTime', value: +$event })"
      />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedTeamParameters',
  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped>
</style>
