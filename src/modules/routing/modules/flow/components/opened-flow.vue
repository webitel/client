<template>
  <wt-page-wrapper
    v-if="!isDiagram"
    :actions-panel="false"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="saveCode"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="handleClose"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
      <unsaved-changes-flow-popup
        v-if="isUnsavedChangesPopup"
        :name="modelValue.name"
        @save="saveAndClose"
        @discard="close"
        @cancel="isUnsavedChangesPopup = false"
      />
    </template>

    <template #main>
      <wt-save-failed-popup
        v-if="isSaveFailedPopup"
        @download="download"
        @save="saveCode"
        @close-popup="isSaveFailedPopup = false"
      />
      <wt-loader v-if="debouncedIsLoading" />
      <form
        v-else
        class="opened-card-form"
        @submit.prevent="saveCode"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <router-view v-slot="{ Component }">
          <component
            :is="Component"
            v-model="modelValue"
            :validation-fields="validationFields"
          />
        </router-view>
        <input
          hidden
          type="submit"
        >
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
import type { FlowCard } from '@webitel/api-services/validations';
import { useCardComponent, useCardTabs } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { saveAsJSON } from '@webitel/ui-sdk/scripts';
import WtSaveFailedPopup from '@webitel/ui-sdk/src/components/on-demand/wt-save-failed-popup/wt-save-failed-popup.vue';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { FlowEditor } from '../enums/FlowEditor.enum';
import FlowRouteNames from '../router/_internals/FlowRouteNames.enum';
import { useFlowCardStore } from '../stores';
import UnsavedChangesFlowPopup from './utils/unsaved-changes-flow-popup.vue';

const { t } = useI18n();
const route = useRoute();
const { hasSaveActionAccess } = useUserAccessControl();

const {
	modelValue,
	debouncedIsLoading,
	originalItemInstance,
	isNew,
	saveText,
	disabledSave,
	isAnyFieldEdited,
	validationFields,
	save,
} = useCardComponent<FlowCard>({
	useCardStore: useFlowCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const isDiagram = computed(
	() =>
		route.query.editor === FlowEditor.Diagram ||
		!!originalItemInstance.value?.editor,
);

// [https://webitel.atlassian.net/browse/WTEL-4509]
// Temporary solution - a diagram flow is edited in the external flow diagram app
watch(
	isDiagram,
	(diagram) => {
		if (!diagram) return;
		const id = route.params.id || 'new';
		const type = route.query.type || '';
		window.location.replace(
			`${import.meta.env.VITE_FLOW_DIAGRAM_URL}/${id}/${type}`,
		);
	},
	{
		immediate: true,
	},
);

const type = computed(
	() => (route.query.type as string) || modelValue.value?.type,
);

/**
 * [Claude] a new flow takes its type from `?type=` (set by the create popup).
 * The whole draft is replaced, not mutated, so the card doesn't count it as an edit
 */
const flowCardStore = useFlowCardStore();
const { draftItemInstance } = storeToRefs(flowCardStore);
watch(
	draftItemInstance,
	(draft) => {
		if (isNew.value && !draft.type && route.query.type) {
			draftItemInstance.value = {
				...draft,
				type: route.query.type as FlowCard['type'],
			};
		}
	},
	{
		immediate: true,
	},
);

const tabs = computed(() => [
	{
		text: t('objects.general'),
		value: 'general',
		pathName: FlowRouteNames.GENERAL,
	},
]);

const { currentTab, changeTab } = useCardTabs(tabs);
const { close } = useClose(RouteNames.FLOW);

const path = computed(() => [
	{
		name: t('objects.routing.routing'),
	},
	{
		name: t('objects.routing.flow.flow', 2),
		route: '/routing/flow',
	},
	{
		name: `${isNew.value ? t('objects.new') : originalItemInstance.value?.name} (${t(`objects.flow.type.${type.value}`)})`,
	},
]);

// [Claude] reload / tab close with unsaved edits asks the browser to confirm;
// in-app navigation doesn't fire `beforeunload`, the popup below covers it
useEventListener(window, 'beforeunload', (event) => {
	if (!isAnyFieldEdited.value) return;
	event.preventDefault();
	event.returnValue = '';
});

const isUnsavedChangesPopup = ref(false);

const isSaveFailedPopup = ref(false);

const saveCode = async () => {
	try {
		await save();
		isSaveFailedPopup.value = false;
	} catch (err) {
		// a taken name is reported by the api itself, so no "save failed" popup for it
		isSaveFailedPopup.value =
			err?.response?.data?.id !== 'store.sql_routing_schema.save.valid.name';
		throw err;
	}
};

const download = () => {
	saveAsJSON(modelValue.value.name, modelValue.value);
};

/**
 * [Claude] close only once the save went through: an invalid form saves nothing
 * without throwing, so "no edits left" is what tells a save happened
 */
const saveAndClose = async () => {
	isUnsavedChangesPopup.value = false;
	await saveCode();
	if (!isAnyFieldEdited.value) close();
};

const handleClose = () => {
	if (isAnyFieldEdited.value) isUnsavedChangesPopup.value = true;
	else close();
};
</script>
