<template>
  <wt-popup
    overflow
    size="sm"
    v-bind="$attrs"
    @close="close"
  >
    <template #title>
      {{ id
      ? $t('objects.system.globalVariables.editTitle')
      : $t('objects.system.globalVariables.newTitle') }}
    </template>
    <template #main>
      <wt-input
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.key')"
        :v="v$.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-input
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('vocabulary.values', 1)"
        :label-props="{ hint: $t('objects.system.globalVariables.valueInfo'), hintPosition: 'right' }"
        :required="!itemInstance.id || !startEncryptValue"
        :v="v$.itemInstance.value"
        :value="itemInstance.value"
        @input="setItemProp({ prop: 'value', value: $event })"
      />
      <wt-switcher
        :disabled="startEncryptValue"
        :label="$t('objects.system.globalVariables.encrypted')"
        :value="itemInstance.encrypt"
        @change="setItemProp({ prop: 'encrypt', value: $event })"
      />
    </template>
    <template #actions>
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
import { required, requiredIf } from '@vuelidate/validators';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'GlobalVariablesPopup',
  mixins: [openedObjectMixin, openedTabComponentMixin],
  props: {
    id: {
      // if id is passed, that's an edit
      type: [Number, null],
    },
    namespace: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    startEncryptValue: false,
  }),
  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      name: { required },
      value: {
        required: requiredIf(function() {
          return !this.itemInstance.id || !this.startEncryptValue;
        }),
      },
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
      try {
        await this.setId(this.id);
        await this.loadItem();
      } finally {
        this.startEncryptValue = this.itemInstance.encrypt;
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
