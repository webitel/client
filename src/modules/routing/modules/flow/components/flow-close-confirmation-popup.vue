<template>
  <wt-popup
    class="flow-close-confirmation-popup"
    :width="500"
    @close="closePopup"
  >
    <template v-slot:title>
      {{ $t('reusable.warning') }}
    </template>
    <template v-slot:main>
      <div class="flow-close-confirmation-popup__wrapper">
        <wt-icon
          icon="attention"
          color="error"
        ></wt-icon>
        <p>{{ $t('objects.routing.flow.askingAlert', {name}) }}</p>
      </div>
    </template>
    <template v-slot:actions>
      <wt-button
        @click="save"
      >{{ $t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="closeSchema"
      >{{ $t('reusable.doNotSave') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="closePopup"
      >{{ $t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>
<script>

export default {
  name: 'flow-toolbar-confirmation-popup',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  methods: {
    closePopup() {
      this.$emit('closePopup');
    },
    save() {
      this.$emit('save');
      this.closeSchema();
    },
    closeSchema() {
      this.closePopup();
      this.$emit('closeSchema');
    },
  },
};
</script>

<style lang="scss" scoped>
.flow-close-confirmation-popup__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .wt-icon {
    margin-bottom: var(--spacing-sm);
  }
}
</style>
