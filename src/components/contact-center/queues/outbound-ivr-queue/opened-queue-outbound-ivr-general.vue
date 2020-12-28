<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
          v-model="name"
          :v="v.itemInstance.name"
          :label="$t('objects.name')"
          required
      ></wt-input>

      <wt-select
          v-model="calendar"
          :v="v.itemInstance.calendar"
          :label="$tc('objects.lookups.calendars.calendars', 1)"
          :search="loadDropdownOptionsCalendarList"
          :internal-search="false"
          :clearable="false"
          required
      ></wt-select>

      <wt-select
          v-model="strategy"
          :v="v.itemInstance.strategy"
          :options="dropdownOptionsStrategyList"
          :label="$t('objects.ccenter.queues.strategy')"
          track-by="value"
          :clearable="false"
          required
      ></wt-select>

      <wt-select
          v-model="dncList"
          :label="$tc('objects.lookups.blacklist.blacklist', 1)"
          :search="loadDropdownOptionsBlacklistList"
          :internal-search="false"
      ></wt-select>

      <wt-select
          v-model="priority"
          :options="dropdownOptionsPriorityList"
          :label="$t('objects.ccenter.queues.priority')"
      ></wt-select>

      <wt-select
          v-model="schema"
          :v="v.itemInstance.schema"
          :label="$t('objects.routing.schema')"
          :search="loadDropdownOptionsSchemaList"
          :internal-search="false"
          :clearable="false"
          required
      ></wt-select>

      <wt-input
          v-model="maxCalls"
          type="number"
          :label="$t('objects.ccenter.queues.callLimit')"
      ></wt-input>

      <wt-textarea
          v-model="description"
          :label="$t('objects.description')"
      ></wt-textarea>

      <wt-switcher
          v-model="recordings"
          :label="$t('objects.ccenter.queues.recordings')"
      ></wt-switcher>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin from '../../../../mixins/openedTabComponentMixin';
import { getCalendarList } from '../../../../api/lookups/calendars/calendars';
import { getBlacklistList } from '../../../../api/lookups/blacklists/blacklists';
import { getFlowList } from '../../../../api/routing/flow/flow';

export default {
  name: 'opened-queue-outbound-ivr-general',
  mixins: [openedTabComponentMixin],

  data() {
    return {
      dropdownOptionsStrategyList: [
        { name: 'FIFO', value: 'fifo' },
        { name: 'LIFO', value: 'lifo' },
      ],
      dropdownOptionsPriorityList: [
        { name: '1', id: 1, value: '1' },
        { name: '2', id: 2, value: '2' },
        { name: '3', id: 3, value: '3' },
        { name: '4', id: 4, value: '4' },
        { name: '5', id: 5, value: '5' },
        { name: '6', id: 6, value: '6' },
        { name: '7', id: 7, value: '7' },
        { name: '8', id: 8, value: '8' },
        { name: '8', id: 9, value: '9' },
        { name: '10', id: 10, value: '10' },
      ],
    };
  },

  computed: {
    name: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.name;
      },
      set(value) {
        this.setItemProp({ prop: 'name', value });
      },
    },

    calendar: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.calendar;
      },
      set(value) {
        this.setItemProp({ prop: 'calendar', value });
      },
    },

    strategy: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.strategy;
      },
      set(value) {
        this.setItemProp({ prop: 'strategy', value });
      },
    },

    dncList: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.dncList;
      },
      set(value) {
        this.setItemProp({ prop: 'dncList', value });
      },
    },

    priority: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.priority;
      },
      set(value) {
        this.setItemProp({ prop: 'priority', value });
      },
    },

    schema: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.schema;
      },
      set(value) {
        this.setItemProp({ prop: 'schema', value });
      },
    },

    maxCalls: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.payload.maxCalls;
      },
      set(value) {
        this.setItemPayloadProp({ prop: 'maxCalls', value: +value });
      },
    },

    description: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.description;
      },
      set(value) {
        this.setItemProp({ prop: 'description', value });
      },
    },

    recordings: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.payload.recordings || false;
      },
      set(value) {
        this.setItemPayloadProp({ prop: 'recordings', value });
      },
    },
  },

  methods: {
    async loadDropdownOptionsCalendarList(search) {
      const response = await getCalendarList(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    async loadDropdownOptionsBlacklistList(search) {
      const response = await getBlacklistList(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    async loadDropdownOptionsSchemaList(search) {
      const response = await getFlowList(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    ...mapActions('ccenter/queues', {
      setItemProp: 'SET_ITEM_PROPERTY',
      setItemPayloadProp: 'SET_ITEM_PAYLOAD_PROPERTY',
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
