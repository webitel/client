<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid object-input-grid__1-col object-input-grid__w50">
      <wt-input
        :value="itemInstance.name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :value="itemInstance.channel"
        :v="v.itemInstance.channel"
        :label="$t('vocabulary.channel')"
        :options="channelOptions"
        :disabled="savedChannel || disableUserInput"
        required
        track-by="value"
        @input="setItemProp({ prop: 'channel', value: $event.value })"
      ></wt-select>
      <wt-input
        :value="itemInstance.code"
        :v="v.itemInstance.code"
        :label="$t('objects.lookups.communications.code')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'code', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="itemInstance.description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </div>
  </section>
</template>

<script>
import { EngineCommunicationChannels } from 'webitel-sdk';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-communications-type',
  mixins: [openedTabComponentMixin],
  data: () => ({
    savedChannel: '',
  }),
  computed: {
    channelOptions() {
      return Object.values(EngineCommunicationChannels)
      .filter((channel) => channel !== EngineCommunicationChannels.Undefined)
      .map((channel) => ({
        name: this.$t(`objects.lookups.communications.channels.${channel}`),
        value: channel,
      }));
    },
  },
  methods: {
    setSavedChannel() {
      this.savedChannel = this.itemInstance.channel;
    },
  },
  mounted() {
    const unwatch = this.$watch('itemInstance', () => {
      this.setSavedChannel();
      unwatch();
    });
  },
  watch: {
    'itemInstance._dirty': {
      handler(value) {
        if (!value) {
          if (!this.itemInstance.id) return;
          this.setSavedChannel();
        }
      },
    },
  },
};
</script>

<style scoped>

</style>
