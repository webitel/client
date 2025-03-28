<template>
  <wt-popup
    v-bind="$attrs"
    :shown="!!variableId"
    overflow
    size="sm"
    @close="close"
  >
    <template #title>
      {{ id
      ? $t('objects.system.globalVariables.editTitle')
      : $t('objects.system.globalVariables.newTitle') }}
    </template>
    <template #main>
      <wt-input
        :value="itemInstance.name"
        :v="v$.itemInstance.name"
        :disabled="disableUserInput"
        :clearable="false"
        :label="$t('objects.key')"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-input
        :value="itemInstance.value"
        :v="v$.itemInstance.value"
        :disabled="disableUserInput"
        :clearable="false"
        :label="$t('vocabulary.values', 1)"
        :label-props="{ hint: $t('objects.system.globalVariables.valueInfo'), hintPosition: 'right' }"
        :required="!itemInstance.id || !startEncryptValue"
        @input="setItemProp({ prop: 'value', value: $event })"
      />
      <wt-switcher
        :value="itemInstance.encrypt"
        :disabled="startEncryptValue"
        :label="$t('objects.system.globalVariables.encrypted')"
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
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'GlobalVariablesPopup',
  mixins: [openedObjectMixin, openedTabComponentMixin],
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  setup: () => ({
    // Reasons for use $stopPropagation
    // https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
    v$: useVuelidate({$stopPropagation: true}),
  }),
  data: () => ({
    startEncryptValue: false,
  }),
  validations: {
    itemInstance: {
      name: { required },
      value: {
        required: requiredIf(function () {
          return !this.itemInstance.id || !this.startEncryptValue;
        }),
      },
    },
  },
  computed: {
    variableId() {
      return this.$route.params.id;
    },
  },
  watch: {
    variableId: {
      async handler(id) {
        if (id) {
          await this.loadPopupData(id)
        }

        else {
          this.resetState()
        }
      },
    }, immediate: true,
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
    async loadPopupData(id) {
      try {
        await this.setId(id);
        await this.loadItem();
      } finally {
        this.startEncryptValue = this.itemInstance.encrypt;
      }
    },
    close() {
      this.$emit('close');
    },
    loadPageData(){},
  },
};
</script>
