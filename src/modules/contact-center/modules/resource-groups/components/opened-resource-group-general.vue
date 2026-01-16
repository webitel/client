<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input :disabled="disableUserInput" :label="$t('objects.name')" :v="v.itemInstance.name"
        :value="itemInstance.name" required @input="setItemProp({ prop: 'name', value: $event })" />
      <wt-select :clearable="false" :disabled="disableUserInput"
        :label="$t('objects.lookups.communications.communications', 1)" :search-method="loadDropdownOptionsList"
        :v="v.itemInstance.communication" :value="itemInstance.communication" required
        @input="setItemProp({ prop: 'communication', value: $event })" />
      <wt-textarea :disabled="disableUserInput" :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })" />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CommunicationsAPI from '../../../../lookups/modules/communications/api/communications';

export default {
  name: 'OpenedResourceGroupGeneral',
  mixins: [openedTabComponentMixin],
  methods: {
    loadDropdownOptionsList(params) {
      return CommunicationsAPI.getLookup(params);
    },
  },
};
</script>
