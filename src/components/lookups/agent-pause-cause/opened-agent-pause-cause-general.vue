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
        :value="limitMin"
        :label="$t('objects.lookups.pauseCause.limit')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemProp({ prop: 'limitMin', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
      <div class="form-checkbox-wrapper">
        <wt-checkbox
          :selected="allowAdmin"
          :label="$t('objects.lookups.pauseCause.allowAdmin')"
          :disabled="disableUserInput"
          @change="setItemProp({prop: 'allowAdmin', value: $event })"
        ></wt-checkbox>
        <wt-checkbox
          :selected="allowSupervisor"
          :label="$t('objects.lookups.pauseCause.allowSupervisor')"
          :disabled="disableUserInput"
          @change="setItemProp({prop: 'allowSupervisor', value: $event })"
        ></wt-checkbox>
        <wt-checkbox
          :selected="allowAgent"
          :label="$t('objects.lookups.pauseCause.allowAgent')"
          :disabled="disableUserInput"
          @change="setItemProp({prop: 'allowAgent', value: $event })"
        ></wt-checkbox>
      </div>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-agent-pause-cause-general',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('lookups/pauseCause', {
      name: (state) => state.itemInstance.name,
      limitMin: (state) => state.itemInstance.limitMin,
      description: (state) => state.itemInstance.description,
      allowAdmin: (state) => state.itemInstance.allowAdmin,
      allowSupervisor: (state) => state.itemInstance.allowSupervisor,
      allowAgent: (state) => state.itemInstance.allowAgent,
    }),
  },
};
</script>

<style lang="scss" scoped>
.form-checkbox-wrapper .wt-checkbox:not(:last-child) {
  margin-bottom: var(--component-spacing);
}
</style>
