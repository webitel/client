<template>
  <wt-popup v-bind="$attrs" size="sm" :shown="!!hookId" overflow @close="close">
    <template #title>
      {{ $t('objects.ccenter.queues.hooks.hooks', 1) }}
    </template>
    <template #main>
      <form>
        <wt-select :value="event" :clearable="false" :label="$t('objects.ccenter.queues.hooks.event')"
          :options="eventOptions" :v="v$.itemInstance.event" required track-by="value"
          @input="setItemProp({ prop: 'event', value: $event.value })" />
        <wt-select :clearable="false" :label="$t('objects.routing.flow.flow', 1)" :search-method="loadFlowOptions"
          :v="v$.itemInstance.schema" :value="itemInstance.schema" required
          @input="setItemProp({ prop: 'schema', value: $event })" />
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
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import { EngineRoutingSchemaType } from 'webitel-sdk';

import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import FlowsAPI from '../../../../../../routing/modules/flow/api/flow';
import HookEvent from '../enum/HookTeamEvent.enum';

export default {
	name: 'OpenedTeamHooksPopup',
	mixins: [
		nestedObjectMixin,
	],

	setup: () => ({
		// Reasons for use $stopPropagation
		// https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
		v$: useVuelidate({
			$stopPropagation: true,
		}),
	}),
	data: () => ({
		namespace: 'ccenter/teams/hooks',
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
				name: this.$t(
					`objects.ccenter.teams.hooks.eventTypes.${this.snakeToCamel(event)}`,
				),
				value: event,
			}));
		},
		event() {
			const { event } = this.itemInstance;
			return event
				? {
						name: this.$t(
							`objects.ccenter.teams.hooks.eventTypes.${this.snakeToCamel(event)}`,
						),
						value: event,
					}
				: {};
		},
		hookId() {
			return this.$route.params.hookId;
		},
	},
	watch: {
		hookId: {
			handler(id) {
				if (id === 'new') this.resetState();
				if (id) {
					this.setId(id);
					this.loadItem();
				}
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
		snakeToCamel,
	},
};
</script>

<style lang="scss" scoped></style>
