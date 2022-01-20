<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :value="itemInstance.schema"
        :v="v.itemInstance.schema"
        :label="$tc('objects.routing.schema', 1)"
        :search-method="loadFlows"
        :clearable="false"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'schema', value: $event })"
      ></wt-select>
      <wt-input
        :value="itemInstance.pattern"
        :v="v.itemInstance.pattern"
        :label="$t('objects.routing.dialplan.pattern')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'pattern', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="itemInstance.description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </form>
  </section>
</template>

<script>
import FlowsAPI from '../../flow/api/flow';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-dialplan',
  mixins: [openedTabComponentMixin],
  methods: {
    loadFlows(params) {
      return FlowsAPI.getLookup(params);
    },
  },
};
</script>

<style scoped>

</style>
