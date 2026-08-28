<template>
  <wt-popup v-bind="$attrs" size="sm" :shown="!!hookId" overflow @close="close">
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form>
        <wt-single-select v-model:model-value="event" :show-clear="false" :label="$t('objects.ccenter.queues.hooks.event')"
          :options="eventOptions" :v="v$.itemInstance.event" required data-key="value" />
        <wt-single-select
          :disabled="!hasFlowsReadAccess"
          :show-clear="false"
          :label="$t('objects.routing.flow.flow', 1)"
          :search-method="hasFlowsReadAccess && loadFlowOptions"
          :v="v$.itemInstance.schema"
          :model-value="itemInstance.schema"
          required
          @update:model-value="setItemProp({ prop: 'schema', value: $event })"
        />
      </form>
    </template>
    <template #actions>
      <wt-button :disabled="disabledSave" @click="save">
        {{ $t('objects.save') }}
      </wt-button>
      <wt-button color="secondary" @click="close">
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { FlowsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';
import { EngineRoutingSchemaType } from 'webitel-sdk';
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import HookEvent from '../enum/HookQueueEvent.enum';

export default {
	name: 'OpenedQueueHooksPopup',
	mixins: [
		nestedObjectMixin,
	],

	setup: () => {
		const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
			WtObject.Flow,
		);
		return {
			// Reasons for use $stopPropagation
			// https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
			v$: useVuelidate({
				$stopPropagation: true,
			}),
			hasFlowsReadAccess,
		};
	},
	data: () => ({
		namespace: 'ccenter/queues/hooks',
	}),
	validations: {
		itemInstance: {
			event: {
				required,
			},
			schema: {
				required,
			},
		},
	},

	computed: {
		eventOptions() {
			return Object.values(HookEvent).map((event) => ({
				name: this.$t(`objects.ccenter.queues.hooks.eventTypes.${event}`),
				value: event,
			}));
		},
		event: {
			get() {
				const { event } = this.itemInstance;
				return event
					? {
							name: this.$t(`objects.ccenter.queues.hooks.eventTypes.${event}`),
							value: event,
						}
					: {};
			},
			set(value) {
				this.setItemProp({
					prop: 'event',
					value: value.value,
				});
			},
		},
		popupTitle() {
			const action = this.id
				? this.$t('reusable.edit')
				: this.$t('reusable.add');
			return (
				action +
				' ' +
				this.$t('objects.ccenter.queues.hooks.hooks', 1).toLowerCase()
			);
		},
		hookId() {
			return this.$route.params.hookId;
		},
	},
	watch: {
		hookId: {
			handler(id) {
				this.handleIdChange(id);
			},
			immediate: true,
		},
	},

	methods: {
		loadFlowOptions(params) {
			return FlowsAPI.getLookup({
				...params,
				type: [
					EngineRoutingSchemaType.Service,
				],
			});
		},
	},
};
</script>

<style lang="scss" scoped></style>
