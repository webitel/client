<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-select
        :clearable="false"
        :disabled="itemInstance.id || disableUserInput"
        :label="$t('objects.system.changelogs.objects', 1)"
        :search-method="getObjectsList"
        :v="v.itemInstance.object"
        :value="itemInstance.object"
        required
        @input="setItemProp({ prop: 'object', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.system.changelogs.storage')"
        :search-method="getStorageList"
        :v="v.itemInstance.storage"
        :value="itemInstance.storage"
        @input="setItemProp({ prop: 'storage', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.system.changelogs.daysToStore')"
        :v="v.itemInstance.daysToStore"
        :value="itemInstance.daysToStore"
        required
        type="number"
        @input="setItemProp({ prop: 'daysToStore', value: +$event })"
      />
      <wt-select
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.system.changelogs.period.period')"
        :options="periodOptions"
        :value="currentPeriod"
        @input="setItemProp({ prop: 'period', value: $event.id })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import storage from '../../../../integrations/modules/storage/api/storage';
import { ChangelogsAPI } from '@webitel/api-services/api';

export default {
  name: 'OpenedChangelogGeneral',
  mixins: [openedTabComponentMixin],
  computed: {
    currentPeriod() {
      return this.periodOptions.find((period) => period.id === this.itemInstance.period);
    },
    periodOptions() {
      return [
        {
          name: this.$t('objects.system.changelogs.period.options.daily'),
          id: 1,
        },
        {
          name: this.$t('objects.system.changelogs.period.options.weekly'),
          id: 7,
        },
        {
          name: this.$t('objects.system.changelogs.period.options.fortnightly'),
          id: 14,
        },
        {
          name: this.$t('objects.system.changelogs.period.options.monthly'),
          id: 30,
        },
      ];
    },
  },
  methods: {
    getObjectsList: ChangelogsAPI.getObjectsList,
    getStorageList: storage.getLookup,
  },
};
</script>

<style scoped>

</style>
