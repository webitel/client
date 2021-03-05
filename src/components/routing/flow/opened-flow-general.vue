<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid object-input-grid__1-col">
      <wt-input
        :value="itemInstance.name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <code-editor
        :value="itemInstance.schema"
        :label="$t('objects.routing.flow.callFlow')"
        :disabled="disableUserInput"
        @errorListener="isSyntaxError = $event"
        @change="setItemProp({ prop: 'schema', value: $event })"
      ></code-editor>
    </form>
  </section>
</template>

<script>
import CodeEditor from '../../utils/code-editor.vue';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-flow',
  mixins: [openedTabComponentMixin],
  components: { CodeEditor },
};
</script>

<style lang="scss" scoped>
</style>
