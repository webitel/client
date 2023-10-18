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
          @input="setDefaultValue"
        ></wt-select>
        <div
          v-if="itemInstance.name"
        >
          <component
            v-bind="componentConfig"
          ></component>
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
      return SettingsValueTypes[this.itemInstance.name];
    },
    componentConfig() {
      const defaultConfig = {
        value: this.itemInstance.value,
        v: this.v$.itemInstance.value,
        required: true,
        label: this.$tc('vocabulary.values', 1),
      };

      const defaultBooleanConfig = {
        ...defaultConfig,
        is: 'wt-switcher',
        'v-on': {
          change: (event) => this.setItemProp({ prop: 'value', value: event }),
        },
      };
      const defaultNumberConfig = {
        ...defaultConfig,
        is: 'wt-input',
        type: 'number',
        'v-on': {
          input: (event) => this.setItemProp({ prop: 'value', value: event }),
        },
      };

      switch (this.itemInstance.name) {
        case EngineSystemSettingName.EnableOmnichannel: {
          return defaultBooleanConfig;
        }
        case EngineSystemSettingName.MemberChunkSize: {
          return defaultNumberConfig;
        }
        default: {
          return {};
        }
      }
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
    setDefaultValue(event) {
      this.setItemProp({ prop: 'name', value: event });
      if (this.valueType === 'boolean') this.setItemProp({ prop: 'value', value: false });
      if (this.valueType === 'number') this.setItemProp({ prop: 'value', value: 0 });
    },
  },
};
</script>
