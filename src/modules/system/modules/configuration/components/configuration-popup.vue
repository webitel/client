<template>
  <wt-popup
    v-bind="$attrs"
    :shown="!!configurationId"
    size="sm"
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
          <wt-switcher
            v-if="displayedConfigurationType.boolean"
            :label="$t('reusable.state')"
            :v="v$.itemInstance.value"
            :value="itemInstance.value"
            required
            @change="setItemProp({ prop: 'value', value: $event })"
          />
          <wt-input
            v-if="displayedConfigurationType.number"
            :label="$tc('vocabulary.values', 1)"
            :v="v$.itemInstance.value"
            :value="itemInstance.value"
            required
            type="number"
            @input="setItemProp({ prop: 'value', value: +$event })"
          />
          <div v-if="displayedConfigurationType.select">
            <wt-select
              :clearable="false"
              :label="$t('vocabulary.format')"
              :options="exportSettingOptions"
              :v="v$.itemInstance.format"
              :value="itemInstance.format"
              required
              @input="selectHandler"
            />
            <wt-input
              v-if="isExportSettingsFormatCSV"
              :label="$t('objects.CSV.separator')"
              :v="v$.itemInstance.separator"
              :value="itemInstance.separator"
              required
              @input="inputHandler"
            />
          </div>
          <wt-input
            v-if="displayedConfigurationType.string"
            :label="$tc('vocabulary.values', 1)"
            :v="v$.itemInstance.value"
            :value="itemInstance.value"
            required
            @input="setItemProp({ prop: 'value', value: $event })"
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
import { mapActions, mapState } from 'vuex';
import { EngineSystemSettingName } from 'webitel-sdk';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import ConfigurationAPI from '../api/configuration';
import TypesExportedSettings from '../enum/TypesExportedSettings.enum.js';
import ConfigurationValueTypes from '../utils/configurationValueTypes';

export default {
  name: 'ConfigurationPopup',
  mixins: [openedObjectMixin, openedTabComponentMixin],
  props: {
    namespace: {
      type: String,
    },
  },
  setup: () => ({
    // Reasons for use $stopPropagation
    // https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
    v$: useVuelidate({ $stopPropagation: true }),
  }),
  validations() {
    const defaults = {
      itemInstance: {
        name: { required },
      },
    };

    const defaultBooleanConfig = {
      itemInstance: {
        value: {
          required,
        },
      },
    };

    const defaultNumberConfig = {
      itemInstance: {
        value: {
          required,
          minValue: minValue(0),
        },
      },
    };

    let defaultSelectConfig;
    defaultSelectConfig = {
      itemInstance: {
        format: { required },
      },
    };
    if (this.isExportSettingsFormatCSV) {
      defaultSelectConfig = {
        itemInstance: {
          format: { required },
          separator: { required },
        },
      };
    }

    const defaultStringConfig = {
      itemInstance: {
        value: {
          required,
        },
      },
    };

    switch (this.itemInstance.name) {
      case EngineSystemSettingName.EnableOmnichannel:
        return deepmerge(defaults, defaultBooleanConfig);
      case EngineSystemSettingName.AmdCancelNotHuman:
        return deepmerge(defaults, defaultBooleanConfig);
      case EngineSystemSettingName.Enable2fa:
        return deepmerge(defaults, defaultBooleanConfig);
      case EngineSystemSettingName.MemberChunkSize:
        return deepmerge(defaults, defaultNumberConfig);
      case EngineSystemSettingName.SchemeVersionLimit:
        return deepmerge(defaults, defaultNumberConfig);
      case EngineSystemSettingName.SearchNumberLength:
        return deepmerge(defaults, defaultNumberConfig);
      case EngineSystemSettingName.ExportSettings:
        return deepmerge(defaults, defaultSelectConfig);
      case EngineSystemSettingName.ChatAiConnection:
        return deepmerge(defaults, defaultStringConfig);
      case EngineSystemSettingName.PasswordRegExp:
        return deepmerge(defaults, defaultStringConfig);
      case EngineSystemSettingName.PasswordValidationText:
        return deepmerge(defaults, defaultStringConfig);
      case EngineSystemSettingName.AutolinkCallToContact:
        return deepmerge(defaults, defaultBooleanConfig);
      default:
        return defaults;
    }
  },
  data() {
    return {
      TypesExportedSettings,
      EngineSystemSettingName,
    };
  },
  computed: {
    exportSettingOptions() {
      return Object.keys(TypesExportedSettings).map((key) => ({
        name: TypesExportedSettings[key],
        value: TypesExportedSettings[key],
        id: TypesExportedSettings[key],
      }));
    },
    valueType() {
      return ConfigurationValueTypes[this.itemInstance.name];
    },
    displayedConfigurationType() {
      return { [this.valueType]: true };
    },
    isExportSettingsFormatCSV() {
      return this.itemInstance?.format?.value === TypesExportedSettings.CSV;
    },
    configurationId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions({
      setItemId(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_ID`, payload);
      },
    }),
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
      await this.setId(id);
      return this.loadItem();
    },
    close() {
      this.$emit('close');
    },

    handleDefaultSelectConfigInput() {
      this.setItemProp({
        prop: 'value',
        value: { format: this.itemInstance.format.name, separator: this.itemInstance.separator },
      });
    },
    selectHandler(selectedValue) {
      this.itemInstance.format = selectedValue;
      if (!this.isExportSettingsFormatCSV) {
        delete this.itemInstance.separator;
      }
      this.handleDefaultSelectConfigInput();
    },
    inputHandler(inputValue) {
      this.itemInstance.separator = inputValue;
      this.handleDefaultSelectConfigInput();
    },
    async loadParameterList(params) {
      return await ConfigurationAPI.getObjectsList({ ...params, size: 5000 });
    },
    setParameterName(event) {
      this.setItemProp({ prop: 'name', value: event.name });
      if (this.valueType === 'boolean') this.setItemProp({ prop: 'value', value: false });
      if (this.valueType === 'number') this.setItemProp({ prop: 'value', value: 0 });
    },
    loadPageData(){},
  },
  watch: {
    configurationId: {
      async handler(id) {
        if (id) {
          await this.loadPopupData(id);
        }
        else {
          this.resetState();
        }
      }, immediate: true,
    },
  }
};
</script>
