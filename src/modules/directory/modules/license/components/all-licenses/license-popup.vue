<template>
  <wt-popup
    v-bind="$attrs"
    size="sm"
    @close="close"
  >
    <template #title>
      {{ $t('objects.directory.license.importLicense') }}
    </template>
    <template #main>
      <form @submit.prevent="save">
        <wt-input-text
          v-model:model-value="certificate"
          :label="$t('objects.directory.license.licenseKey')"
          :v="v$.certificate"
          required
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="invalid"
        @click="save"
      >
        {{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { mapActions } from 'vuex';

export default {
	name: 'LicensePopup',

	setup: () => ({
		v$: useVuelidate(),
	}),
	data: () => ({
		namespace: 'directory/license',
		certificate: '',
	}),
	validations: {
		certificate: {
			required,
			$autoDirty: true,
		},
	},
	computed: {
		invalid() {
			return this.v$.$error;
		},
	},
	methods: {
		...mapActions({
			updateItem(dispatch, payload) {
				return dispatch(`${this.namespace}/UPDATE_ITEM`, payload);
			},
		}),
		async save() {
			if (!this.invalid) {
				await this.updateItem({
					certificate: this.certificate,
				});
				this.close();
			}
		},
		close() {
			this.$emit('close');
		},
	},
	mounted() {
		this.v$.$touch();
	},
};
</script>

<style lang="scss" scoped>
</style>
