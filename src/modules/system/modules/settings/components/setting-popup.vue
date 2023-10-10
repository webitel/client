<template>
  <wt-popup
    width="480"
    @close="close"
  >
    <template v-slot:title>
      {{ itemId ? $t('reusable.edit') : $t('reusable.new') }}
      {{ $tc('settings.settings', 1).toLowerCase() }}
    </template>
    <template v-slot:main>
      <form>
        <wt-input
          :value="itemInstance.name"
          :v="v$.itemInstance.name"
          :label="$t('reusable.name')"
          :disabled="itemId"
          required
          @input="setItemProp({ prop: 'name', value: $event })"
        ></wt-input>
        <wt-input
          :value="itemInstance.value"
          :v="v$.itemInstance.value"
          :label="$tc('vocabulary.values', 1)"
          required
          @input="setItemProp({ prop: 'value', value: $event })"
        ></wt-input>
      </form>
    </template>
    <template v-slot:actions>
      <wt-button
        :disabled="computeDisabledSave"
        @click="save"
      >
        {{ $t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';

export default {
  name: 'settings-popup',
  props: {
    namespace: {
      type: String,
    },
  },
  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      name: { required },
      value: { required },
    },
  },
  computed: {
    ...mapState({
      itemId(state) {
        return getNamespacedState(state, this.namespace).itemId;
      },
      itemInstance(state) {
        return getNamespacedState(state, this.namespace).itemInstance;
      },
    }),
    computeDisabledSave() {
      this.v$.$touch();
      // if its still pending or an error is returned do not submit
      return this.v$.$pending || this.v$.$error;
    },
  },
  methods: {
    ...mapActions({
      setItem(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM`, payload);
      },
      addItem(dispatch, payload) {
        return dispatch(`${this.namespace}/ADD_ITEM`, payload);
      },
      updateItem(dispatch, payload) {
        return dispatch(`${this.namespace}/UPDATE_ITEM`, payload);
      },
      setItemProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PROPERTY`, payload);
      },
    }),
    async save() {
      if (this.itemId) {
        await this.updateItem({ itemInstance: this.itemInstance, itemId: this.itemId });
      } else {
        await this.addItem({ itemInstance: this.itemInstance });
      }
      this.close();
    },
    close() {
      this.$emit('close');
    },
  },
  unmounted() {
    this.setItem({});
  },
};
</script>
