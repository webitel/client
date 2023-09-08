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
        :label="$t('objects.integrations.storage.storage', 1)"
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
      <wt-input
        :value="itemInstance.period"
        :label="$t('objects.system.changelogs.period')"
        :disabled="disableUserInput"
        :v="v.itemInstance.period"
        type="number"
        required
        @input="setItemProp({ prop: 'period', value: +$event })"
      ></wt-input>
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
  methods: {
    getObjectsList: changelogs.getObjectsList,
    getStorageList: storage.getLookup,
  },
};
</script>

<style scoped>

</style>
