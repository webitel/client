<template>
  <section class="opened-pause-template-causes table-section">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.routing.chatGateways.templates.templates', 1) }}
      </h3>

      <div class="table-title__actions-wrap">
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="plus"
          @click="addCause"
        />
      </div>
    </header>

    <wt-empty
      v-show="showEmpty"
      :image="imageEmpty"
      :text="textEmpty"
    />
    <div
      v-show="itemInstance.causes.length"
      class="table-section__table-wrapper"
    >
      <wt-table
        :data="itemInstance.causes"
        :grid-actions="!disableUserInput"
        :headers="headers"
        :selectable="false"
      >
        <template #name="{ item, index }">
          <wt-single-select
            :search-method="loadAgentPauseCause"
            :model-value="item.name"
            :placeholder="$t('objects.lookups.pauseTemplates.notSelected')"
            @update:model-value="setCause({ index, value: $event })"
          />
        </template>
        <template #duration="{ item, index }">
          <wt-input-number
            class="opened-pause-template-causes__duration"
            :disabled="disableUserInput"
            :model-value="item.duration"
            required
            @update:model-value="setCause({ prop: 'duration', index, value: $event })"
          />
        </template>
        <template #actions="{ item, index }">
          <wt-icon-action
            action="delete"
            @click="removeCause(index)"
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { computed, getCurrentInstance } from 'vue';
import { AgentPauseCausesAPI as AgentPauseCauseAPI } from '@webitel/api-services/api';
import { mapActions } from 'vuex';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
export default {
	name: 'OpenedPauseTemplateCauses',
	mixins: [
		openedTabComponentMixin,
	],
	setup() {
		const vm = getCurrentInstance().proxy;
		const { disableUserInput } = useUserAccessControl();
		const {
			showEmpty,
			image: imageEmpty,
			text: textEmpty,
		} = useTableEmpty({
			dataList: computed(() => vm.itemInstance.causes),
		});

		return {
			disableUserInput,
			showEmpty,
			imageEmpty,
			textEmpty,
		};
	},
	computed: {
		headers() {
			return [
				{
					value: 'name',
					text: this.$t('objects.lookups.pauseTemplates.pauseReason'),
				},
				{
					value: 'duration',
					text: this.$t('objects.lookups.pauseTemplates.duration'),
				},
			];
		},
	},
	methods: {
		...mapActions({
			addCause(dispatch, payload) {
				dispatch(`${this.namespace}/ADD_CAUSE`, payload);
			},
			setCause(dispatch, payload) {
				dispatch(`${this.namespace}/SET_CAUSE`, payload);
			},
			removeCause(dispatch, payload) {
				dispatch(`${this.namespace}/REMOVE_CAUSE`, payload);
			},
		}),
		loadAgentPauseCause(params) {
			return AgentPauseCauseAPI.getLookup(params);
		},
	},
};
</script>

<style
  lang="scss"
  scoped
>
.opened-pause-template-causes__duration {
  width: 100%;
}
</style>
