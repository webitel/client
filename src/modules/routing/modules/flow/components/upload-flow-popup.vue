<template>
  <wt-popup
    v-bind="$attrs"
    :shown="file"
    size="sm"
    overflow
    @close="close"
  >
    <template #title>
      {{ $t('objects.importJSON') }}
    </template>
    <template #main>
      <form>
        <wt-checkbox
          v-model:selected="create"
          :label="$t('objects.routing.flow.createNew')"
        />
        <wt-input-text
          v-model:model-value="flow.name"
          :label="$t('objects.name')"
          :v="v$.flow.name"
          required
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="computeDisabledSave"
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

import FlowsAPI from '../api/flow';

export default {
	name: 'UploadFlowPopup',
	props: {
		file: {
			required: true,
		},
	},
	setup: () => ({
		// Reasons for use $stopPropagation
		// https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
		v$: useVuelidate({
			$stopPropagation: true,
		}),
	}),
	data: () => ({
		create: true,
		fileReader: null,
		flow: {
			name: 'file.name',
		},
	}),
	validations: {
		flow: {
			name: {
				required,
			},
		},
	},
	computed: {
		computeDisabledSave() {
			this.v$.$touch();
			// if its still pending or an error is returned do not submit
			return this.v$.$pending || this.v$.$error;
		},
		isUploadPopup() {
			return this.$route.name?.includes('uploadCSV');
		},
	},
	watch: {
		file() {
			if (this.file) {
				this.initFileReader();
				this.processJSON();
			} else {
				this.destroyFileReader();
			}
		},
	},
	methods: {
		async save() {
			try {
				if (this.create) {
					this.flow.id = undefined;
					await FlowsAPI.add({
						itemInstance: this.flow,
					});
				} else {
					await FlowsAPI.update({
						itemId: this.flow.id,
						itemInstance: this.flow,
					});
				}
				this.close();
			} catch (err) {
				throw err;
			}
		},
		initFileReader() {
			this.fileReader = new FileReader();
			this.fileReader.addEventListener('load', this.handleFileLoad);
		},
		destroyFileReader() {
			this.fileReader &&
				this.fileReader.removeEventListener('load', this.handleFileLoad);
		},
		processJSON() {
			this.fileReader.readAsText(this.file);
		},
		handleFileLoad(event) {
			const file = event.target.result;
			if (file) this.flow = JSON.parse(file);
		},
		close() {
			this.$emit('close');
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
