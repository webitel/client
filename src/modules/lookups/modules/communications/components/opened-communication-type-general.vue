<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid object-input-grid__1-col object-input-grid__w50">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :model-value="itemInstance.name"
        required
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-select
        v-model="channel"
        :disabled="savedChannel || disableUserInput"
        :label="$t('vocabulary.channel')"
        :options="channelOptions"
        :v="v.itemInstance.channel"
        required
        track-by="value"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.lookups.communications.code')"
        :v="v.itemInstance.code"
        :model-value="itemInstance.code"
        required
        @update:model-value="setItemProp({ prop: 'code', value: $event })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { EngineCommunicationChannels } from 'webitel-sdk';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
	name: 'OpenedCommunicationsType',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		return {
			disableUserInput,
		};
	},
	data: () => ({
		savedChannel: '',
	}),
	computed: {
		channel: {
			get() {
				return this.channelOptions.find(
					(channel) => channel.value === this.itemInstance.channel,
				);
			},
			set(value) {
				this.setItemProp({
					prop: 'channel',
					value: value.value,
				});
			},
		},
		channelOptions() {
			return Object.values(EngineCommunicationChannels)
				.filter((channel) => channel !== EngineCommunicationChannels.Undefined)
				.map((channel) => ({
					name: this.$t(`objects.lookups.communications.channels.${channel}`),
					value: channel,
				}));
		},
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
	mounted() {
		const unwatch = this.$watch('itemInstance', () => {
			this.setSavedChannel();
			unwatch();
		});
	},
	methods: {
		setSavedChannel() {
			this.savedChannel = this.itemInstance.channel;
		},
	},
};
</script>

<style scoped></style>
