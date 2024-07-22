<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import {
  timerangeNotIntersect,
  timerangeStartLessThanEnd,
} from '../../../../../app/utils/validators';
import General from './opened-calendar-general.vue';
import Holidays from './opened-calendar-holidays.vue';
import WorkWeek from './opened-calendar-work-week.vue';

export default {
  name: 'OpenedCalendar',
  components: { General, WorkWeek, Holidays },
  mixins: [openedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'lookups/calendars',
  }),
  validations: {
    itemInstance: {
      name: { required },
      timezone: { required },
      accepts: {
        timerangeNotIntersect,
        $each: helpers.forEach({
          timerangeStartLessThanEnd,
        }),
      },
    },
  },

  computed: {
    tabs() {
      const tabs = [
        {
          value: 'general',
          text: this.$t('objects.general'),
        },
        {
          value: 'work-week',
          text: this.$t('objects.lookups.calendars.workWeek'),
        },
        {
          value: 'holidays',
          text: this.$tc('objects.lookups.calendars.holidays', 2),
        },
      ];

      if (this.id) tabs.push(this.permissionsTab);
      return tabs;
    },

    path() {
      const baseUrl = '/lookups/calendars';
      return [
        {
          name: this.$t('objects.lookups.lookups'),
        },
        {
          name: this.$tc('objects.lookups.calendars.calendars', 2),
          route: baseUrl,
        },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
