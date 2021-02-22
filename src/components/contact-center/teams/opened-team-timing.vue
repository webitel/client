<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.teams.timing') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="maxNoAnswer"
        :v="v.itemInstance.maxNoAnswer"
        :label="$t('objects.ccenter.teams.maxNoAnswer')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'maxNoAnswer', value: +$event })"
      ></wt-input>
      <wt-input
        :value="callTimeout"
        :v="v.itemInstance.callTimeout"
        :label="$t('objects.ccenter.teams.callTimeout')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'callTimeout', value: +$event })"
      ></wt-input>
      <wt-input
        :value="wrapUpTime"
        :v="v.itemInstance.wrapUpTime"
        :label="$t('objects.ccenter.teams.wrapUpTime')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'wrapUpTime', value: +$event })"
      ></wt-input>
      <wt-input
        :value="noAnswerDelayTime"
        :v="v.itemInstance.noAnswerDelayTime"
        :label="$t('objects.ccenter.teams.noAnswerDelayTime')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'noAnswerDelayTime', value: +$event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-team-timing',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('ccenter/teams', {
      maxNoAnswer: (state) => state.itemInstance.maxNoAnswer,
      callTimeout: (state) => state.itemInstance.callTimeout,
      wrapUpTime: (state) => state.itemInstance.wrapUpTime,
      noAnswerDelayTime: (state) => state.itemInstance.noAnswerDelayTime,
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
