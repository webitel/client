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
      <wt-input
        :value="itemInstance.limitMin"
        :label="$t('objects.lookups.pauseCause.limit')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemProp({ prop: 'limitMin', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="itemInstance.description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
      <div class="form-checkbox-wrapper">
        <wt-checkbox
          :selected="itemInstance.allowAdmin"
          :label="$t('objects.lookups.pauseCause.allowAdmin')"
          :disabled="disableUserInput"
          @change="setItemProp({prop: 'allowAdmin', value: $event })"
        ></wt-checkbox>
        <wt-checkbox
          :selected="itemInstance.allowSupervisor"
          :label="$t('objects.lookups.pauseCause.allowSupervisor')"
          :disabled="disableUserInput"
          @change="setItemProp({prop: 'allowSupervisor', value: $event })"
        ></wt-checkbox>
        <wt-checkbox
          :selected="itemInstance.allowAgent"
          :label="$t('objects.lookups.pauseCause.allowAgent')"
          :disabled="disableUserInput"
          @change="setItemProp({prop: 'allowAgent', value: $event })"
        ></wt-checkbox>
      </div>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-agent-pause-cause-general',
  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped>
.form-checkbox-wrapper .wt-checkbox:not(:last-child) {
  margin-bottom: var(--spacing-sm);
}
</style>
