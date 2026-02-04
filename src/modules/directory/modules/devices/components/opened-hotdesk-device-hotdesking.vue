<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.directory.devices.hotdesk') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-tags-input
        :custom-validators="hotDeskNameValidator"
        :disabled="disableUserInput"
        :label="$t('objects.directory.devices.hostName')"
        :label-props=" { hint: $t('objects.directory.devices.hotdeskInputHint') }"
        :v="v.itemInstance.hotdesks"
        :value="itemInstance.hotdesks"
        taggable
        @input="setItemProp({ prop: 'hotdesks', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedDeviceHotdesking',
  mixins: [openedTabComponentMixin],
  computed: {
    hotDeskNameValidator() {
      return [
        {
          name: 'hotDeskNameValidator',
          text: this.$t('objects.directory.devices.hotdeskIncorrectInput'),
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
