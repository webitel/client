<template>
  <wt-popup
    class="confirmation-unsaved-changes-popup"
    size="sm"
    v-bind="$attrs"
    @close="closePopup"
  >
    <template v-slot:title>
      {{ $t('reusable.warning') }}
    </template>
    <template v-slot:main>
      <div class="confirmation-unsaved-changes-popup__wrapper">
        <wt-icon
          color="error"
          icon="attention"
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
        @click="closePage"
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
  name: 'confirmation-unsaved-changes-popup',
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
    closePage() {
      this.closePopup();
      this.$emit('closePage');
    },
    save() {
      this.$emit('save');
      this.closePage();
    },
  },
};
</script>

<style lang="scss" scoped>
.confirmation-unsaved-changes-popup__wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  .wt-icon {
    margin-bottom: var(--spacing-sm);
  }
}
</style>
