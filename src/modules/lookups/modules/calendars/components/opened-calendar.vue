<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :primary-text="saveText"
        :primary-action="save"
        :hide-primary="!hasSaveActionAccess"
        :primary-disabled="disabledSave"
        :secondary-action="close"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>

    <template v-slot:main>
      <div class="main-container">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="currentTab.value"
          :v="$v"
          :namespace="namespace"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import General from './opened-calendar-general.vue';
import WorkWeek from './opened-calendar-work-week.vue';
import Holidays from './opened-calendar-holidays.vue';
import { timerangeNotIntersect, timerangeStartLessThanEnd } from '../../../../../app/utils/validators';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-calendar',
  mixins: [openedObjectMixin],
  components: { General, WorkWeek, Holidays },
  data: () => ({
    namespace: 'lookups/calendars',
  }),

  // by vuelidate
  validations: {
    itemInstance: {
      name: { required },
      timezone: { required },
      accepts: {
        timerangeNotIntersect,
        $each: { timerangeStartLessThanEnd },
      },
    },
  },

  computed: {
    tabs() {
      const tabs = [
        { value: 'general', text: this.$t('objects.general') },
        { value: 'work-week', text: this.$t('objects.lookups.calendars.workWeek') },
        { value: 'holidays', text: this.$tc('objects.lookups.calendars.holidays', 2) },
      ];

      if (this.id) tabs.push(this.permissionsTab);
      return tabs;
    },

    path() {
      const baseUrl = '/lookups/calendars';
      return [
        { name: this.$t('objects.lookups.lookups') },
        { name: this.$tc('objects.lookups.calendars.calendars', 2), route: baseUrl },
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
