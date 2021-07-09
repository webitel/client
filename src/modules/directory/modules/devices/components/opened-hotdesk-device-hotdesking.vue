<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.directory.devices.hotdesk') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-tags-input
        :add-only-from-autocomplete="false"
        :disabled="disableUserInput"
        :label="$t('objects.directory.devices.hostName')"
        :v="v.itemInstance.hotdesks"
        :custom-validators="incorrectCharUsed"
        :value="itemInstance.hotdesks"
        :label-props=" { hint: $t('objects.directory.devices.hotdeskInputHint') }"
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
  computed: {
    incorrectCharUsed() {
      return [{ name: 'hotDeskNameValidator', text: 'Incorrect host name' }];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
