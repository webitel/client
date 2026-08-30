<template>
  <section class="table-section">
    <communication-popup
      :communications="communications"
      @save="applyCommunication"
    />

    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :callback="deleteCallback"
      :delete-count="deleteCount"
      @close="closeDelete"
    />

    <header class="table-title">
      <h3
        :class="{ invalid: isMissingCommunication }"
        class="table-title__title"
      >
        {{ t('objects.lookups.communications.communications', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.ADD, IconAction.DELETE]"
          :disabled:add="disableUserInput"
          :disabled:delete="disableUserInput || !selected.length"
          @click:add="add"
          @click:delete="
            askDeleteConfirmation({
              deleted: selected,
              callback: () => removeSelected(),
            })
          "
        />
      </div>
    </header>

    <table-empty :data-list="communications" />
    <div
      v-show="communications.length"
      class="table-section__table-wrapper"
    >
      <wt-table
        :data="communications"
        :headers="headers"
        :selected="selected"
        @update:selected="selected = $event"
      >
        <template #destination="{ item }">
          {{ item.destination }}
        </template>
        <template #type="{ item }">
          {{ item.type?.name }}
        </template>
        <template #priority="{ item }">
          {{ item.priority }}
        </template>
        <template #actions="{ index }">
          <wt-icon-action
            :disabled="disableUserInput"
            action="edit"
            @click="edit(index)"
          />
          <wt-icon-action
            :disabled="disableUserInput"
            action="delete"
            @click="
              askDeleteConfirmation({
                deleted: [communications[index]],
                callback: () => remove([communications[index]]),
              })
            "
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type {
	EngineMemberCommunication,
	EngineMemberInQueue,
} from '@webitel/api-services/gen/models';
import { IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import TableEmpty from '../../../../../../../../app/components/utils/table-empty.vue';
import { useUserAccessControl } from '../../../../../../../../app/composables/useUserAccessControl';
import { useMemberCommunications } from '../../composables/useMemberCommunications';
import CommunicationPopup from './opened-queue-member-communication-popup.vue';

/**
 * Not a datalist: these rows only exist on the member's draft and are saved
 * with it, so there is nothing to page or fetch.
 */
const modelValue = defineModel<EngineMemberInQueue>({
	required: true,
});

const { validationFields } = defineProps<{
	// biome-ignore lint/suspicious/noExplicitAny: regle's field status shape
	validationFields?: Record<string, any>;
}>();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { disableUserInput } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

const {
	communications,
	add: addCommunication,
	update,
	remove,
} = useMemberCommunications(modelValue);

const selected = ref<EngineMemberCommunication[]>([]);

/**
 * The schema requires at least one communication, but the rule sits on the
 * array — there is no input of its own to carry the message, and the save
 * button is disabled before the user can press it and see regle's version.
 * So the title reports it from the state directly.
 */
const isMissingCommunication = computed(
	() =>
		!communications.value.length || !!validationFields?.communications?.$error,
);

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const headers = computed(() => [
	{
		value: 'destination',
		text: t('objects.ccenter.members.destination'),
	},
	{
		value: 'type',
		text: t('objects.ccenter.queues.type'),
	},
	{
		value: 'priority',
		text: t('objects.ccenter.members.priority'),
	},
]);

const openPopup = (communicationIndex: string) =>
	router.push({
		name: route.name,
		params: {
			...route.params,
			communicationIndex,
		},
		query: route.query,
	});

const add = () => openPopup('new');
const edit = (index: number) => openPopup(String(index));

const applyCommunication = ({
	index,
	item,
}: {
	index: number | null;
	item: EngineMemberCommunication;
}) => (index === null ? addCommunication(item) : update(index, item));

const removeSelected = () => {
	remove(selected.value);
	selected.value = [];
};
</script>

<style
  lang="scss"
  scoped
>
/**
 * `communications` is required by the schema but has no input of its own to
 * carry the message, so the section title is what reports it.
 */
.table-title__title.invalid {
  color: var(--error-color);
}
</style>
