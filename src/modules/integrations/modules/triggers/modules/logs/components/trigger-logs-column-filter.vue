<template>
  <column-filter
    :header="header"
    :form-view="formView"
    :hide="hide"
    :filters-manager="filtersManager"
    :has-read-access="hasReadAccess"
    @add:filter="addFilter"
    @update:filter="updateFilter"
    @delete:filter="deleteFilter"
  />
</template>

<script setup lang="ts">
import { ColumnFilterComponent as ColumnFilter } from '@webitel/ui-datalist/filters';
import type { WtTableHeader } from '@webitel/ui-sdk/src/components/wt-table/types/WtTable';
import { storeToRefs } from 'pinia';

import { useUserinfoStore } from '../../../../../../userinfo/stores/userinfoStore';
import { useTriggerLogsDatalistStore } from '../stores/datalist/triggerLogsDatalistStore';

defineProps<{
	header: WtTableHeader;
	formView?: boolean;
	hide?: () => void;
}>();

const userinfoStore = useUserinfoStore();
const { hasReadAccess } = userinfoStore;

const triggerLogsDatalistStore = useTriggerLogsDatalistStore();
const { filtersManager } = storeToRefs(triggerLogsDatalistStore);

const { addFilter, updateFilter, deleteFilter } = triggerLogsDatalistStore;
</script>
