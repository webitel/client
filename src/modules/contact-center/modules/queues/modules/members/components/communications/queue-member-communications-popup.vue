<template>
  <wt-popup @close="emit('close')">
    <template #title>
      {{ t('objects.ccenter.members.communications') }}
    </template>
    <template #main>
      <section class="communications-popup">
        <wt-table
          :data="communications"
          :grid-actions="false"
          :headers="headers"
          :selectable="false"
          class="popup-table"
        >
          <template #destination="{ item }">
            {{ item.destination }}
          </template>
          <template #type="{ item }">
            <div v-if="item.type">
              {{ item.type.name }}
            </div>
          </template>
          <template #priority="{ item }">
            {{ item.priority }}
          </template>
        </wt-table>
      </section>
    </template>
    <template #actions>
      <wt-button
        color="secondary"
        @click="emit('close')"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script lang="ts" setup>
import type { EngineMemberCommunication } from '@webitel/api-services/gen/models';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

/** read-only. No sorting: there is no request here to carry a `sort` — engine
 * exposes no endpoint returning a member's communications as a list. */

const { communications } = defineProps<{
	communications: EngineMemberCommunication[];
}>();

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();

const headers = computed(() => [
	{
		value: 'destination',
		field: 'destination',
		text: t('objects.name'),
	},
	{
		value: 'type',
		field: 'type',
		text: t('objects.ccenter.queues.type'),
	},
	{
		value: 'priority',
		field: 'priority',
		text: t('objects.ccenter.queues.priority'),
	},
]);
</script>

<style lang="scss" scoped></style>
