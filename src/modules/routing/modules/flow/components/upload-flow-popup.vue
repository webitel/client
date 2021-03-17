<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $t('objects.importJSON') }}
    </template>
    <template slot="main">
      <form>
        <wt-checkbox
          v-model="create"
          :label="$t('objects.routing.flow.createNew')"
        ></wt-checkbox>
        <wt-input
          v-model="flow.name"
          :v="$v.flow.name"
          :label="$t('objects.name')"
          required
        ></wt-input>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="computeDisabledSave"
        @click="save"
      >{{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >{{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import required from 'vuelidate/src/validators/required';
import { addFlow, updateFlow } from './flow';

export default {
  name: 'upload-flow-popup',
  props: {
    file: {
      required: true,
    },
  },
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
  created() {
    this.initFileReader();
    this.processJSON();
  },
  destroyed() {
    this.destroyFileReader();
  },
  computed: {
    computeDisabledSave() {
      this.$v.$touch();
      // if its still pending or an error is returned do not submit
      return this.$v.$pending
        || this.$v.$error;
    },
  },
  methods: {
    async save() {
      try {
        if (this.create) {
          delete this.flow.id;
          await addFlow(this.flow);
        } else {
          await updateFlow(this.flow.id, this.flow);
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
