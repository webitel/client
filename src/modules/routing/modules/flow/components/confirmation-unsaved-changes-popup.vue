<template>
  <wt-popup
    class="confirmation-unsaved-changes-popup"
    size="sm"
    :width="500"
    @close="closePopup"
  >
    <template #title>
      {{ $t('reusable.warning') }}
    </template>
    <template #main>
      <div class="confirmation-unsaved-changes-popup__wrapper">
        <wt-icon
          icon="attention"
          color="error"
        ></wt-icon>
        <p>{{ $t('objects.routing.flow.askingAlert', {name}) }}</p>
      </div>
    </template>
    <template #actions>
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
	name: 'ConfirmationUnsavedChangesPopup',
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
  flex-direction: column;
  align-items: center;
  text-align: center;

  .wt-icon {
    margin-bottom: var(--spacing-sm);
  }
}
</style>
