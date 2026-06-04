<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-single-select
        :show-clear="false"
        :disabled="itemInstance.id || disableUserInput"
        :label="$t('objects.system.changelogs.objects', 1)"
        :search-method="getObjectsList"
        :v="v.itemInstance.object"
        :model-value="itemInstance.object"
        required
        @update:model-value="setItemProp({ prop: 'object', value: $event })"
      />
      <wt-single-select
        :disabled="disableUserInput || !hasStorageReadAccess"
        :label="$t('objects.system.changelogs.storage')"
        :search-method="getStorageList"
        :v="v.itemInstance.storage"
        :model-value="itemInstance.storage"
        @update:model-value="setItemProp({ prop: 'storage', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.system.changelogs.daysToStore')"
        :v="v.itemInstance.daysToStore"
        :model-value="itemInstance.daysToStore"
        required
        @update:model-value="setItemProp({ prop: 'daysToStore', value: $event })"
      />
      <wt-single-select
        :show-clear="false"
        :disabled="disableUserInput"
        :label="$t('objects.system.changelogs.period.period')"
        :options="periodOptions"
        :model-value="currentPeriod"
        @update:model-value="setItemProp({ prop: 'period', value: $event.id })"
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
import { ChangelogsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import storage from '../../../../integrations/modules/storage/api/storage';

export default {
	name: 'OpenedChangelogGeneral',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		const { hasReadAccess: hasStorageReadAccess } = useUserAccessControl(
			WtObject.Storage,
		);
		return {
			disableUserInput,
			hasStorageReadAccess,
		};
	},
	computed: {
		currentPeriod() {
			return this.periodOptions.find(
				(period) => period.id === this.itemInstance.period,
			);
		},
		periodOptions() {
			return [
				{
					name: this.$t('objects.system.changelogs.period.options.daily'),
					id: 1,
				},
				{
					name: this.$t('objects.system.changelogs.period.options.weekly'),
					id: 7,
				},
				{
					name: this.$t('objects.system.changelogs.period.options.fortnightly'),
					id: 14,
				},
				{
					name: this.$t('objects.system.changelogs.period.options.monthly'),
					id: 30,
				},
			];
		},
	},
	methods: {
		getObjectsList: ChangelogsAPI.getObjectsList,
		getStorageList: storage.getLookup,
	},
};
</script>

<style scoped></style>
