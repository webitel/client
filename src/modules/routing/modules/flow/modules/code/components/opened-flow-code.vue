<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-tags-input
        :disabled="disableUserInput"
        :label="$tc('vocabulary.tag', 2)"
        :value="itemInstance.tags"
        :search-method="loadFlowTagOptions"
        option-label="name"
        track-by="name"
        taggable
        @input="setItemProp({ prop: 'tags', value: $event })"
      ></wt-tags-input>
    </div>
    <code-editor
      :autocomplete="autocomplete"
      :disabled="disableUserInput"
      :label="$tc('objects.routing.flow.flow', 1)"
      :value="itemInstance.schema"
      @change="setItemProp({ prop: 'schema', value: $event })"
      @errorListener="isSyntaxError = $event"
    ></code-editor>
  </section>
</template>

<script>
import FlowTypeApplications from '@webitel/flow-ui-sdk/src/lookups/FlowTypeApplications.lookup';
import CodeEditor from '../../../../../../../app/components/utils/code-editor.vue';
import openedTabComponentMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowAppAutocomplete from '../lookups/FlowAppAutocomplete.lookup';
import FlowsAPI from '../../../api/flow';

export default {
  name: 'opened-flow-code',
  mixins: [openedTabComponentMixin],
  components: { CodeEditor },
  computed: {
    autocomplete() {
      const { type } = this.itemInstance;
      // if there's app, but no autocomplete -- skip
      return FlowTypeApplications[type]?.reduce((apps, app) => (
        FlowAppAutocomplete[app]
          ? [...apps, FlowAppAutocomplete[app]]
          : apps
      ), []) || Object.values(FlowAppAutocomplete);
    },
  },
  methods: {
    loadFlowTagOptions: FlowsAPI.getFlowTags,
  },
};
</script>

<style lang="scss" scoped>
</style>
