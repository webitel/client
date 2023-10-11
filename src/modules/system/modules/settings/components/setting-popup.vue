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
          :disabled="id"
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
        :disabled="disabledSave"
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
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'settings-popup',
  mixins: [openedObjectMixin, openedTabComponentMixin],
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
  methods: {
    async save() {
      if (!this.disabledSave) {
        if (this.id) {
          await this.updateItem();
        } else {
          try {
            await this.addItem();
          } catch (err) {
            throw err;
          }
        }
        this.close();
      }
    },
    async loadPageData() {
      await this.setId(this.itemInstance.id);
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
