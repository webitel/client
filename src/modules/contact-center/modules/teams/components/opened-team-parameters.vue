<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.ccenter.teams.parameters') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.maxNoAnswer')"
        :v="v.itemInstance.maxNoAnswer"
        :value="itemInstance.maxNoAnswer"
        required
        type="number"
        @input="setItemProp({ prop: 'maxNoAnswer', value: +$event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.noAnswerDelayTime')"
        :v="v.itemInstance.noAnswerDelayTime"
        :value="itemInstance.noAnswerDelayTime"
        required
        type="number"
        @input="setItemProp({ prop: 'noAnswerDelayTime', value: +$event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.taskAcceptTimeout')"
        :v="v.itemInstance.taskAcceptTimeout"
        :value="itemInstance.taskAcceptTimeout"
        required
        type="number"
        @input="setItemProp({ prop: 'taskAcceptTimeout', value: +$event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.callTimeout')"
        :v="v.itemInstance.callTimeout"
        :value="itemInstance.callTimeout"
        required
        type="number"
        @input="setItemProp({ prop: 'callTimeout', value: +$event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.inviteChatTimeout')"
        :v="v.itemInstance.inviteChatTimeout"
        :value="itemInstance.inviteChatTimeout"
        required
        type="number"
        @input="setItemProp({ prop: 'inviteChatTimeout', value: +$event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.wrapUpTime')"
        :v="v.itemInstance.wrapUpTime"
        :value="itemInstance.wrapUpTime"
        required
        type="number"
        @input="setItemProp({ prop: 'wrapUpTime', value: +$event })"
      />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedTeamParameters',
  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped>
</style>
