<template>
  <wt-popup v-bind="$attrs" :shown="!!isNew" size="sm" @close="close">
    <template #title>
      {{ $t('objects.directory.devices.newDevice') }}
    </template>
    <template #main>
      <section>
        <ul class="popup-options">
          <li v-for="(option, key) of options" :key="key" :class="{ 'active': selectedOption === option }"
            class="popup-options__item-wrap" @click="selectOption(option)">
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
        {{ $t('objects.add') }}
      </wt-button>
      <wt-button color="secondary" @click="close">
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
	name: 'CreateDevicePopup',

	data() {
		return {
			selectedOptionValue: '',
			options: [
				{
					value: 'default',
					title: this.$t('objects.directory.devices.devices', 1),
					description: this.$t('objects.directory.devices.deviceSettings', 1),
					routeName: `${RouteNames.DEVICES}-card`,
				},
				{
					value: 'hotdesk',
					title: this.$t('objects.directory.devices.hotdeskDevice'),
					description: this.$t(
						'objects.directory.devices.hotdeskDeviceSettings',
					),
					routeName: `${RouteNames.DEVICES}-card`,
				},
			],
		};
	},

	computed: {
		selectedOption: {
			get() {
				return this.selectedOptionValue || this.options[0];
			},
			set(value) {
				this.selectedOptionValue = value;
			},
		},
		isNew() {
			return this.$route.query.new;
		},
	},

	methods: {
		selectOption(option) {
			this.selectedOption = option;
		},

		createItemInstance() {
			this.$router.push({
				name: this.selectedOption.routeName,
				params: {
					id: 'new',
				},
				query: {
					type: this.selectedOption.value,
				},
			});
		},

		close() {
			this.$emit('close');
		},
	},
};
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
