<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.directory.devices.hotdesk') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-tags-input
        :value="itemInstance.hotdesks"
        :v="v.itemInstance.hotdesks"
        :label="$t('objects.directory.devices.hostName')"
        :label-props=" { hint: $t('objects.directory.devices.hotdeskInputHint') }"
        :custom-validators="hotDeskNameValidator"
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
  computed: {
    hotDeskNameValidator() {
      return [{ name: 'hotDeskNameValidator', text: this.$t('objects.directory.devices.hotdeskIncorrectInput') }];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
