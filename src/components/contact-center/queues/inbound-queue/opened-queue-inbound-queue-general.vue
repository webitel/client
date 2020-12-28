<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
          :value="name"
          :v="v.itemInstance.name"
          :label="$t('objects.name')"
          @input="setItemProp({ prop: 'name', value: $event })"
          required
      ></wt-input>

      <wt-select
          :value="calendar"
          :v="v.itemInstance.calendar"
          :label="$tc('objects.lookups.calendars.calendars', 1)"
          :search="loadDropdownOptionsCalendarList"
          :internal-search="false"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'calendar', value: $event })"
      ></wt-select>

      <wt-select
          :value="dncList"
          :label="$tc('objects.lookups.blacklist.blacklist', 1)"
          :search="loadDropdownOptionsBlacklistList"
          :internal-search="false"
          @input="setItemProp({ prop: 'dncList', value: $event })"
      ></wt-select>

      <wt-select
          :value="priority"
          :options="dropdownOptionsPriorityList"
          :label="$t('objects.ccenter.queues.priority')"
          :track-by="null"
          @input="setItemProp({ prop: 'priority', value: $event })"
      ></wt-select>


      <wt-select
          :value="team"
          :v="v.itemInstance.team"
          :label="$tc('objects.ccenter.teams.teams', 1)"
          :search="loadDropdownOptionsTeamList"
          :internal-search="false"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'team', value: $event })"
      ></wt-select>

      <wt-select
          :value="ringtone"
          :label="$t('objects.ccenter.queues.ringtone')"
          :search="loadDropdownOptionsMediaList"
          :internal-search="false"
          @input="setItemProp({ prop: 'ringtone', value: $event })"
      ></wt-select>

      <wt-textarea
          :value="description"
          :label="$t('objects.description')"
          @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import openedTabComponentMixin from '../../../../mixins/openedTabComponentMixin';
import { getCalendarList } from '../../../../api/lookups/calendars/calendars';
import { getTeamsList } from '../../../../api/contact-center/teams/teams';
import { getBlacklistList } from '../../../../api/lookups/blacklists/blacklists';
import { getMediaList } from '../../../../api/lookups/media/media';

export default {
  name: 'opened-queue-inbound-queue-general',
  mixins: [openedTabComponentMixin],
  data: () => ({
      dropdownOptionsPriorityList: [
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '8', value: '9' },
        { name: '10', value: '10' },
      ],
  }),

  computed: {
    ...mapState('ccenter/queues', {
      name: (state) => state.itemInstance.name,
      calendar: (state) => state.itemInstance.calendar,
      dncList: (state) => state.itemInstance.dncList,
      priority: (state) => state.itemInstance.priority,
      team: (state) => state.itemInstance.team,
      ringtone: (state) => state.itemInstance.ringtone,
      description: (state) => state.itemInstance.description,
    }),
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

    async loadDropdownOptionsTeamList(search) {
      const response = await getTeamsList(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    async loadDropdownOptionsMediaList(search) {
      const response = await getMediaList(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    ...mapActions('ccenter/queues', {
      setItemProp: 'SET_ITEM_PROPERTY',
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
