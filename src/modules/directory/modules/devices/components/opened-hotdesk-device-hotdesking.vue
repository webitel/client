<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.directory.devices.hotdesk') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-tags-input
        :value="itemInstance.hotdesks"
        :label="$t('objects.directory.devices.hostName')"
        :add-only-from-autocomplete="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'hotdesks', value: $event })"
      ></wt-tags-input>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-device-hotdesking',
  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped>
</style>
