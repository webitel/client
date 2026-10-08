<template>
  <wt-popup
    :shown="!!isNew"
    size="sm"
    @close="close"
  >
    <template #title>
      {{ t('objects.directory.devices.newDevice') }}
    </template>
    <template #main>
      <section>
        <ul class="popup-options">
          <li
            v-for="(option, key) of options"
            :key="key"
            :class="{ active: selectedOption === option }"
            class="popup-options__item-wrap"
            @click="selectOption(option)"
          >
            <h4 class="popup-options__item-header typo-subtitle-2">
              {{ option.title }}
            </h4>
            <p class="popup-options__item-text typo-body-2">
              {{ option.description }}
            </p>
          </li>
        </ul>
      </section>
    </template>
    <template #actions>
      <wt-button @click="createItemInstance">
        {{ t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

type DeviceCreateOption = {
	value: string;
	title: string;
	description: string;
	routeName: string;
};

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const options = computed<DeviceCreateOption[]>(() => [
	{
		value: 'default',
		title: t('objects.directory.devices.devices', 1),
		description: t('objects.directory.devices.deviceSettings', 1),
		routeName: `${RouteNames.DEVICES}-card`,
	},
	{
		value: 'hotdesk',
		title: t('objects.directory.devices.hotdeskDevice'),
		description: t('objects.directory.devices.hotdeskDeviceSettings'),
		routeName: `${RouteNames.DEVICES}-card`,
	},
]);

const selectedOptionValue = ref<DeviceCreateOption | null>(null);

const selectedOption = computed({
	get: () => selectedOptionValue.value || options.value[0],
	set: (value: DeviceCreateOption) => {
		selectedOptionValue.value = value;
	},
});

const isNew = computed(() => route.query.new);

const selectOption = (option: DeviceCreateOption) => {
	selectedOption.value = option;
};

const createItemInstance = () => {
	router.push({
		name: selectedOption.value.routeName,
		params: {
			id: 'new',
		},
		query: {
			type: selectedOption.value.value,
		},
	});
};

const close = () => emit('close');
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.popup-options__item-wrap {
  position: relative;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  border: 1px solid var(--form-border-color);
  border-radius: var(--border-radius);

  &:last-child {
    margin-bottom: 0;
  }

  &:hover,
  &.active {
    border-color: var(--primary-color);
  }
}
</style>
