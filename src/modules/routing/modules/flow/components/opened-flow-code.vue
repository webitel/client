<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid object-input-grid__1-col object-input-grid__w50">
<!--      <wt-input-->
<!--        :value="itemInstance.name"-->
<!--        :v="v.itemInstance.name"-->
<!--        :label="$t('objects.name')"-->
<!--        :disabled="disableUserInput"-->
<!--        required-->
<!--        @input="setItemProp({ prop: 'name', value: $event })"-->
<!--      ></wt-input>-->
    </div>
<!--    <code-editor-->
<!--        :value="itemInstance.schema"-->
<!--        :label="$tc('objects.routing.flow.flow', 1)"-->
<!--        :disabled="disableUserInput"-->
<!--        @errorListener="isSyntaxError = $event"-->
<!--        @change="setItemProp({ prop: 'schema', value: $event })"-->
<!--    ></code-editor>-->
  </section>
</template>

<script>
import CodeEditor from '../../../../../app/components/utils/code-editor.vue';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-flow-code',
  mixins: [openedTabComponentMixin],
  components: { CodeEditor },
};
</script>

<style lang="scss" scoped>
</style>
