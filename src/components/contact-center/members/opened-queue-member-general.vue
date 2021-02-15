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
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
        :value="priority"
        :label="$t('objects.ccenter.queues.priority')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemProp({ prop: 'priority', value: +$event })"
      ></wt-input>
      <wt-datetimepicker
        :value="expireAt"
        :label="$t('objects.ccenter.queues.expire')"
        :disabled="disableUserInput"
        @change="setItemProp({ prop: 'expireAt', value: $event })"
      ></wt-datetimepicker>
      <wt-select
        :value="bucket"
        :label="$tc('objects.ccenter.buckets.buckets', 1)"
        :search="loadDropdownOptionsBucketsList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'bucket', value: $event })"
      ></wt-select>
      <wt-select
        :value="skill"
        :label="$tc('objects.ccenter.skills.skills', 1)"
        :search="loadDropdownOptionsSkillsList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'skill', value: $event })"
      ></wt-select>
      <wt-select
        :value="timezone"
        :label="$t('objects.ccenter.queues.timezone')"
        :search="loadDropdownOptionsTimezoneList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'timezone', value: $event })"
      ></wt-select>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getBucketsList } from '../../../api/contact-center/buckets/buckets';
import { getSkillsList } from '../../../api/contact-center/agentSkills/agentSkills';
import { getCalendarTimezones } from '../../../api/lookups/calendars/calendars';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-queue-member-general',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('ccenter/queues/members', {
      name: (state) => state.itemInstance.name,
      priority: (state) => state.itemInstance.priority,
      expireAt: (state) => state.itemInstance.expireAt,
      bucket: (state) => state.itemInstance.bucket,
      skill: (state) => state.itemInstance.skill,
      timezone: (state) => state.itemInstance.timezone,
      description: (state) => state.itemInstance.description,
    }),
    disableUserInput() {
      return !this.isEditAccess;
    },
  },

  methods: {
    async loadDropdownOptionsBucketsList(search) {
      const response = await getBucketsList(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    async loadDropdownOptionsSkillsList(search) {
      const response = await getSkillsList(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    async loadDropdownOptionsTimezoneList(search) {
      const response = await getCalendarTimezones(1, 10, search);
      return response.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
