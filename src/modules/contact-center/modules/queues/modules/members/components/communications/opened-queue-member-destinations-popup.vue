<template>
  <wt-popup @close="emit('close')">
    <template #title>
      {{ t('objects.ccenter.queues.destination', 2) }}
    </template>
    <template #main>
      <section class="destinations-popup">
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
      <wt-button @click="emit('close')">
        {{ t('objects.ok') }}
      </wt-button>
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

/** read-only list; it took a table mixin before and used nothing from it */
defineProps<{
	communications: EngineMemberCommunication[];
}>();

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();

const headers = computed(() => [
	{
		value: 'destination',
		text: t('objects.ccenter.queues.destination', 1),
	},
	{
		value: 'type',
		text: t('objects.ccenter.queues.type'),
	},
	{
		value: 'priority',
		text: t('objects.ccenter.queues.priority'),
	},
]);
</script>

<style lang="scss" scoped></style>
