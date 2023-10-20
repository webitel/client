<template>
  <wt-popup
    width="480"
    overflow
    @close="close"
  >
    <template #title>
      {{ id ? $t('reusable.edit') : $t('reusable.new') }}
      {{ $t('objects.system.configuration.parameter').toLowerCase() }}
    </template>
    <template #main>
      <form>
        <wt-select
          :value="itemInstance.name"
          :v="v$.itemInstance.name"
          :label="$t('objects.system.configuration.parameter')"
          :search-method="loadParameterList"
          :clearable="false"
          :track-by="null"
          :disabled="id"
          required
          @input="setParameterName"
        />
        <div
          v-if="itemInstance.name"
        >
          <!--          https://github.com/vuejs/core/issues/2279#issuecomment-701266701-->
          <component
            :is="componentConfig.component"
            :label="componentConfig.label"
            v-bind="componentConfig.bind"
            v-on="componentConfig.on"
          />
        </div>
      </form>
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
import deepmerge from 'deepmerge';
import { useVuelidate } from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import { EngineSystemSettingName } from 'webitel-sdk';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import ConfigurationAPI from '../api/configuration';
import ConfigurationValueTypes from '../utils/configurationValueTypes';

export default {
  name: 'ConfigurationPopup',
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
      value: {
        required,
        minValue: minValue(0),
      },
    },
  },
  computed: {
    valueType() {
      return ConfigurationValueTypes[this.itemInstance.name];
    },
    componentConfig() {
      const defaultConfig = {
        bind: {
          value: this.itemInstance.value,
          v: this.v$.itemInstance.value,
          required: true,
        },
      };

      const defaultBooleanConfig = deepmerge(defaultConfig, {
        component: 'wt-switcher',
        label: this.$t('reusable.state'),
        on: {
          change: (event) => this.setItemProp({ prop: 'value', value: event }),
        },
      });
      const defaultNumberConfig = deepmerge(defaultConfig, {
        component: 'wt-input',
        label: this.$tc('vocabulary.values', 1),
        bind: {
          type: 'number',
        },
        on: {
          input: (event) => this.setItemProp({ prop: 'value', value: event }),
        },
      });

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
    async loadParameterList(params) {
      const response = await ConfigurationAPI.getLookup({ ...params, size: 5000 });

      response.items = Object.values(EngineSystemSettingName)
      .filter((name) => (
        response.items.every((item) => item.name !== name)
      ));
      return response;
    },
    setParameterName(event) {
      this.setItemProp({ prop: 'name', value: event });
      if (this.valueType === 'boolean') this.setItemProp({ prop: 'value', value: false });
      if (this.valueType === 'number') this.setItemProp({ prop: 'value', value: 0 });
    },
  },
};
</script>
