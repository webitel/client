<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-select
        :value="itemInstance.object"
        :search-method="getObjectsList"
        :clearable="false"
        :label="$t('objects.system.changelogs.objects', 1)"
        :disabled="itemInstance.id || disableUserInput"
        :v="v.itemInstance.object"
        required
        @input="setItemProp({ prop: 'object', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.storage"
        :search-method="getStorageList"
        :clearable="false"
        :label="$t('objects.system.changelogs.storage')"
        :disabled="disableUserInput"
        :v="v.itemInstance.storage"
        required
        @input="setItemProp({ prop: 'storage', value: $event })"
      ></wt-select>
      <wt-input
        :value="itemInstance.daysToStore"
        :label="$t('objects.system.changelogs.daysToStore')"
        :disabled="disableUserInput"
        :v="v.itemInstance.daysToStore"
        type="number"
        required
        @input="setItemProp({ prop: 'daysToStore', value: +$event })"
      ></wt-input>
      <wt-select
        :value="currentPeriod"
        :options="periodOptions"
        :label="$t('objects.system.changelogs.period.period')"
        :disabled="disableUserInput"
        :clearable="false"
        @input="this.setItemProp({ prop: 'period', value: $event.id })"
      ></wt-select>
      <wt-textarea
        :value="itemInstance.description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </div>
  </section>
</template>

<script>
import changelogs from '../api/changelogs';
import storage from '../../../../integrations/modules/storage/api/storage';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-changelog-general',
  mixins: [openedTabComponentMixin],
  computed: {
    currentPeriod() {
      return this.periodOptions.find((period) => period.id === this.itemInstance.period);
    },
    periodOptions() {
      return [
        { name: this.$t('objects.system.changelogs.period.options.daily'), id: 1 },
        { name: this.$t('objects.system.changelogs.period.options.weekly'), id: 7 },
        { name: this.$t('objects.system.changelogs.period.options.fortnightly'), id: 14 },
        { name: this.$t('objects.system.changelogs.period.options.monthly'), id: 30 },
      ];
    },
  },
  methods: {
    getObjectsList: changelogs.getObjectsList,
    getStorageList: storage.getLookup,
  },
};
</script>

<style scoped>

</style>
