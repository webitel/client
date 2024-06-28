<template>
  <wt-popup
    overflow
    width="480"
    @close="close"
  >
    <template #title>
      {{ id ? $t('reusable.edit') : $t('reusable.new') }}
      {{ $t('objects.system.configuration.parameter').toLowerCase() }}
    </template>
    <template #main>
      <form>
        <wt-select
          :clearable="false"
          :disabled="id"
          :label="$t('objects.system.configuration.parameter')"
          :search-method="loadParameterList"
          :track-by="null"
          :v="v$.itemInstance.name"
          :value="itemInstance.name"
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
import { useVuelidate } from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';
import deepmerge from 'deepmerge';
import { EngineSystemSettingName } from 'webitel-sdk';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
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
          change: (event) =>
            this.setItemProp({
              prop: 'value',
              value: event,
            }),
        },
      });
      const defaultNumberConfig = deepmerge(defaultConfig, {
        component: 'wt-input',
        label: this.$tc('vocabulary.values', 1),
        bind: {
          type: 'number',
        },
        on: {
          input: (event) =>
            this.setItemProp({
              prop: 'value',
              value: +event,
            }),
        },
      });

      switch (this.itemInstance.name) {
        case EngineSystemSettingName.EnableOmnichannel: {
          return defaultBooleanConfig;
        }
        case EngineSystemSettingName.AmdCancelNotHuman: {
          return defaultBooleanConfig;
        }
        case EngineSystemSettingName.Enable2fa: {
          return defaultBooleanConfig;
        }
        case EngineSystemSettingName.MemberChunkSize: {
          return defaultNumberConfig;
        }
        case EngineSystemSettingName.SchemeVersionLimit: {
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
      return await ConfigurationAPI.getObjectsList({
        ...params,
        size: 5000,
      });
    },
    setParameterName(event) {
      this.setItemProp({
        prop: 'name',
        value: event.name,
      });
      if (this.valueType === 'boolean')
        this.setItemProp({
          prop: 'value',
          value: false,
        });
      if (this.valueType === 'number')
        this.setItemProp({
          prop: 'value',
          value: 0,
        });
    },
  },
};
</script>
