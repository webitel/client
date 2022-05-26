<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.teams.timing') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="itemInstance.maxNoAnswer"
        :v="v.itemInstance.maxNoAnswer"
        :label="$t('objects.ccenter.teams.maxNoAnswer')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'maxNoAnswer', value: +$event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.noAnswerDelayTime"
        :v="v.itemInstance.noAnswerDelayTime"
        :label="$t('objects.ccenter.teams.noAnswerDelayTime')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'noAnswerDelayTime', value: +$event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.callTimeout"
        :v="v.itemInstance.callTimeout"
        :label="$t('objects.ccenter.teams.callTimeout')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'callTimeout', value: +$event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.inviteChatTimeout"
        :v="v.itemInstance.inviteChatTimeout"
        :label="$t('objects.ccenter.teams.inviteChatTimeout')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'inviteChatTimeout', value: +$event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.wrapUpTime"
        :v="v.itemInstance.wrapUpTime"
        :label="$t('objects.ccenter.teams.wrapUpTime')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'wrapUpTime', value: +$event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-team-timing',
  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped>
</style>
