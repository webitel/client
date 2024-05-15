<template>
  <wt-popup
    overflow
    size="sm"
    v-bind="$attrs"
    @close="close"
  >
    <template #title>
      {{ $t('objects.importJSON') }}
    </template>
    <template #main>
      <form>
        <wt-checkbox
          v-model="create"
          :label="$t('objects.routing.flow.createNew')"
        />
        <wt-input
          v-model="flow.name"
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
    v$: useVuelidate(),
  }),
  data: () => ({
    create: true,
    fileReader: null,
    flow: { name: 'file.name' },
  }),
  validations: {
    flow: {
      name: { required },
    },
  },
  computed: {
    computeDisabledSave() {
      this.v$.$touch();
      // if its still pending or an error is returned do not submit
      return this.v$.$pending
        || this.v$.$error;
    },
  },
  created() {
    this.initFileReader();
    this.processJSON();
  },
  unmounted() {
    this.destroyFileReader();
  },
  methods: {
    async save() {
      try {
        if (this.create) {
          delete this.flow.id;
          await FlowsAPI.add({ itemInstance: this.flow });
        } else {
          await FlowsAPI.update({ itemId: this.flow.id, itemInstance: this.flow });
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
