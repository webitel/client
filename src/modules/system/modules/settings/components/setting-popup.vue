<template>
  <wt-popup
    width="480"
    overflow
    @close="close"
  >
    <template v-slot:title>
      {{ id ? $t('reusable.edit') : $t('reusable.new') }}
      {{ $tc('settings.settings', 1).toLowerCase() }}
    </template>
    <template v-slot:main>
      <form>
        <wt-select
          :value="itemInstance.name"
          :v="v$.itemInstance.name"
          :label="$t('reusable.name')"
          :search-method="loadSettingsNameList"
          :clearable="false"
          :track-by="null"
          :disabled="id"
          required
          @input="setItemProp({ prop: 'name', value: $event })"
        ></wt-select>
        <div
          v-if="itemInstance.name"
        >
          <wt-switcher
            v-if="valueType === 'boolean'"
            :value="itemInstance.value"
            :v="v$.itemInstance.value"
            :label="$tc('vocabulary.values', 1)"
            @change="setItemProp({ prop: 'value', value: $event })"
          ></wt-switcher>
          <wt-input
            v-else
            :value="itemInstance.value"
            :v="v$.itemInstance.value"
            :type="valueType === 'number' && 'number'"
            :label="$tc('vocabulary.values', 1)"
            @input="setItemProp({ prop: 'value', value: $event })"
            required
          ></wt-input>
        </div>
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
import { EngineSystemSettingName } from 'webitel-sdk';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import SettingsAPI from '../api/settings';
import SettingsValueTypes from '../utils/settingsValueTypes';

export default {
  name: 'settings-popup',
  mixins: [openedObjectMixin, openedTabComponentMixin],
  props: {
    id: {
      type: Number,
    },
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
    valueType() {
      return SettingsValueTypes.find((setting) => setting.name === this.itemInstance.name).type;
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
      await this.setId(this.id);
      return this.loadItem();
    },
    close() {
      this.$emit('close');
    },
    async loadSettingsNameList(params) {
      const response = await SettingsAPI.getLookup({ ...params, size: 5000 });

      response.items = Object.values(EngineSystemSettingName)
      .filter((name) => (
        response.items.every((item) => item.name !== name)
      ));
      return response;
    },
  },
  watch: {
    'itemInstance.name': {
      handler() {
        if (!this.id) {
          if (this.valueType === 'boolean') this.setItemProp({ prop: 'value', value: false });
          if (this.valueType === 'number') this.setItemProp({ prop: 'value', value: 0 });
        };
      },
    },
  },
};
</script>
