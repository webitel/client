<template>
  <wt-popup min-width="480" @close="close">
    <template slot="title">{{ $t('objects.directory.devices.newDevice') }}</template>
    <template slot="main">
      <section>
        <ul class="popup-options">
          <li
              class="popup-options__item-wrap"
              :class="{'active': selectedOption === option}"
              v-for="(option, key) of options"
              :key="key"
              @click="selectOption(option)"
          >
            <h4 class="popup-options__item-header">{{ option.title }}</h4>
            <p class="popup-options__item-text">{{ option.description }}</p>
          </li>
        </ul>
      </section>
    </template>
    <template slot="actions">
      <wt-button @click="createItemInstance">{{ $t('objects.add') }}</wt-button>
      <wt-button color="secondary" @click="close">{{ $t('objects.close') }}</wt-button>
    </template>
  </wt-popup>
</template>

<script>
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'create-device-popup',

  data() {
    return {
      selectedOptionValue: '',
      options: [{
        value: 'default',
        title: this.$tc('objects.directory.devices.devices', 1),
        description: this.$tc('objects.directory.devices.deviceSettings', 1),
        routeName: `${RouteNames.DEVICES}-new`,
      }, {
        value: 'hotdesk',
        title: this.$t('objects.directory.devices.hotdeskDevice'),
        description: this.$t('objects.directory.devices.hotdeskDeviceSettings'),
        routeName: `${RouteNames.DEVICES}-hotdesk-new`,
      }],
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
  },

  methods: {
    selectOption(option) {
      this.selectedOption = option;
    },

    createItemInstance() {
      this.$router.push({ name: this.selectedOption.routeName });
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-options__item-wrap {
  position: relative;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--form-border-color);
  border-radius: var(--border-radius);
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover, &.active {
    border-color: var(--main-accent-color);
  }
}

.popup-options__item-header {
  @extend %typo-strong-md;
}

.popup-options__item-text {
  @extend %typo-body-md;
}
</style>
