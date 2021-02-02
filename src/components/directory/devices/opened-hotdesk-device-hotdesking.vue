<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.directory.devices.hotdesk') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-tags-input
          :value="hotdesks"
          :label="$t('objects.directory.devices.hostName')"
          :add-only-from-autocomplete="false"
          :disabled="disableUserInput"
          @input="setItemProp({ prop: 'hotdesks', value: $event })"
      ></wt-tags-input>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-device-hotdesking',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('directory/devices', {
      hotdesks: (state) => state.itemInstance.hotdesks,
    }),
  },

  methods: {
    ...mapActions('directory/devices', {
      setItemProp: 'SET_ITEM_PROPERTY',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
