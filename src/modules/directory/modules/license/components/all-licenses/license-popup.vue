<template>
  <wt-popup min-width="480" @close="close">
    <template v-slot:title>
      {{ $t('objects.directory.license.importLicense') }}
    </template>
    <template v-slot:main>
      <form @submit.prevent="save">
        <wt-input
          v-model="certificate"
          :v="v$.certificate"
          :label="$t('objects.directory.license.licenseKey')"
          required
        ></wt-input>
      </form>
    </template>
    <template v-slot:actions>
      <wt-button :disabled="invalid" @click="save">
        {{ $t('objects.add') }}
      </wt-button>
      <wt-button color="secondary" @click="close">
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { mapActions } from 'vuex';
import { required } from '@vuelidate/validators';

export default {
  name: 'license-popup',
  data: () => ({
    namespace: 'directory/license',
    certificate: '',
  }),

  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    certificate: { required, $autoDirty: true },
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
      await this.updateItem({ certificate: this.certificate });
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
