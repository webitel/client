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
      <wt-select
        :value="timezone"
        :v="v.itemInstance.timezone"
        :label="$tc('objects.lookups.timezone.timezone', 1)"
        :search="loadTimezones"
        :internal-search="false"
        :clearable="false"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'timezone', value: $event })"
      ></wt-select>
      <wt-textarea
        :value="description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getCalendarTimezones } from '../../../api/lookups/calendars/calendars';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-region-general',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('lookups/regions', {
      name: (state) => state.itemInstance.name,
      timezone: (state) => state.itemInstance.timezone,
      description: (state) => state.itemInstance.description,
    }),
  },
  methods: {
    async loadTimezones(search) {
      const response = await getCalendarTimezones({ search });
      return response;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
