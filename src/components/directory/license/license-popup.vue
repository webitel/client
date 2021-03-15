<template>
  <wt-popup min-width="480" @close="close">
    <template slot="title">
      {{ $t('objects.directory.license.importLicense') }}
    </template>
    <template slot="main">
      <form>
        <wt-input
          v-model="itemInstance.certificate"
          :v="$v.itemInstance.certificate"
          :label="$t('objects.directory.license.licenseKey')"
          required
          @input="updateValidations"
        ></wt-input>
      </form>
    </template>
    <template slot="actions">
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
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import validationMixin from '../../../mixins/baseMixins/openedObjectValidationMixin/openedObjectValidationMixin';

export default {
  name: 'license-popup',
  mixins: [validationMixin],
  data: () => ({
    namespace: 'directory/license',
    itemInstance: {
      certificate: '',
    },
    invalid: true,
  }),

  validations: {
    itemInstance: {
      certificate: { required },
    },
  },
  created() {
    this.updateValidations();
  },

  methods: {
    ...mapActions({
      updateItem(dispatch, payload) {
        return dispatch(`${this.namespace}/UPDATE_ITEM`, payload);
      },
    }),
    updateValidations() {
      this.invalid = this.checkValidations();
    },
    async save() {
      if (!this.invalid) {
      await this.updateItem(this.itemInstance);
      this.close();
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
