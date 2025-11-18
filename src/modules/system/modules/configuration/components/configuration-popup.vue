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
          :options="parameterList"
          :track-by="name"
          :v="v$.itemInstance.name"
          :value="itemInstance.name"
          required
          @input="setParameterName"
        />
        <div v-if="itemInstance.name">
          <wt-switcher
            v-if="displayedConfigurationType.boolean"
            :label="$t('reusable.state')"
            :v="v$.itemInstance.value"
            :model-value="itemInstance.value"
            required
            @update:model-value="setItemProp({ prop: 'value', value: $event })"
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
          <wt-select
            v-if="displayedConfigurationType.multiselect"
            :label="$tc('vocabulary.values', 2)"
            :v="v$.itemInstance.value"
            :value="itemInstance.value"
            :search-method="multiselectConfig.searchMethod"
            :options="multiselectConfig.options"
            :option-label="multiselectConfig.optionLabel"
            :track-by="multiselectConfig.trackBy"
            multiple
            required
            @input="setItemProp({ prop: 'value', value: $event })"
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
import { LabelsAPI } from '@webitel/api-services/api';
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import deepmerge from 'deepmerge';
import { mapActions } from 'vuex';

import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import ConfigurationAPI from '../api/configuration';
import { PasswordCategories } from '../enum/PasswordCategories.enum';
import TypesExportedSettings from '../enum/TypesExportedSettings.enum.js';
import ConfigurationValueTypes from '../utils/configurationValueTypes';
import {
  defaultMultiselectConfig,
  multiselectConfigurations,
} from '../utils/multiselectConfigurations';

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
          minValue: minValue(
            this.itemInstance.name ===
              EngineSystemSettingName.PeriodToPlaybackRecords
              ? 1
              : 0,
          ),
        },
      },
    };

    const defaultMultiselectConfig = {
      itemInstance: {
        value: {
          required,
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
      case EngineSystemSettingName.Enable_2fa:
        return deepmerge(defaults, defaultBooleanConfig);
      case EngineSystemSettingName.MemberChunkSize:
        return deepmerge(defaults, defaultNumberConfig);
      case EngineSystemSettingName.SchemeVersionLimit:
        return deepmerge(defaults, defaultNumberConfig);
      case EngineSystemSettingName.SearchNumberLength:
        return deepmerge(defaults, defaultNumberConfig);
      case EngineSystemSettingName.ExportSettings:
        return deepmerge(defaults, defaultSelectConfig);
      case EngineSystemSettingName.LabelsToLimitContacts:
        return deepmerge(defaults, defaultMultiselectConfig);
      case EngineSystemSettingName.ChatAiConnection:
        return deepmerge(defaults, defaultStringConfig);
      case EngineSystemSettingName.PasswordRegExp:
        return deepmerge(defaults, defaultStringConfig);
      case EngineSystemSettingName.PasswordValidationText:
        return deepmerge(defaults, defaultStringConfig);
      case EngineSystemSettingName.AutolinkCallToContact:
        return deepmerge(defaults, defaultBooleanConfig);
      case EngineSystemSettingName.PeriodToPlaybackRecords:
        return deepmerge(defaults, defaultNumberConfig);
      case EngineSystemSettingName.WbtHideContact:
        return deepmerge(defaults, defaultBooleanConfig);
      case EngineSystemSettingName.PasswordExpiryDays:
        return deepmerge(defaults, defaultNumberConfig);
      case EngineSystemSettingName.PasswordMinLength:
        return deepmerge(defaults, defaultNumberConfig);
      case EngineSystemSettingName.PasswordCategories:
        return deepmerge(defaults, defaultMultiselectConfig);
      case EngineSystemSettingName.PasswordContainsUsername:
        return deepmerge(defaults, defaultBooleanConfig);
      case EngineSystemSettingName.PasswordWarningDays:
        return deepmerge(defaults, defaultNumberConfig);
      case EngineSystemSettingName.DefaultPassword:
        return deepmerge(defaults, defaultStringConfig);
      default:
        return defaults;
    }
  },
  data() {
    return {
      parameterList: [],
      TypesExportedSettings,
      EngineSystemSettingName,
      PasswordCategories,
      SettingDefaultValue: {
        [EngineSystemSettingName.PushNotificationTimeout]: 30,
        [EngineSystemSettingName.ScreenshotInterval]: 30,
        [EngineSystemSettingName.PasswordMinLength]: 8,
        [EngineSystemSettingName.PasswordContainsUsername]: false,
      },
    };
  },
  computed: {
    LabelsAPI() {
      return LabelsAPI;
    },
    exportSettingOptions() {
      return Object.keys(TypesExportedSettings).map((key) => ({
        name: TypesExportedSettings[key],
        value: TypesExportedSettings[key],
        id: TypesExportedSettings[key],
      }));
    },
    multiselectConfig() {
      return (
        multiselectConfigurations[this.itemInstance.name] ||
        defaultMultiselectConfig
      );
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
  async mounted() {
    await this.loadParameterList();
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
        value: {
          format: this.itemInstance.format.name,
          separator: this.itemInstance.separator,
        },
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
      const { items } = await ConfigurationAPI.getObjectsList({ ...params, size: 5000 });
      this.parameterList = items
      ////https://webitel.atlassian.net/browse/WTEL-8146
        .filter((item) => item.name !== EngineSystemSettingName.PasswordWarningDays)
        .map((item) => ({
        name: item.name,
        value: item.name,
      }));
    },
    setParameterName(event) {
      this.setItemProp({ prop: 'name', value: event.name });

      const defaultValue = this.SettingDefaultValue[event.name];

      // @author @stanislav-kozak
      // We check if the parameter have specified default value, if their not we use default set value by type
      if (defaultValue)
        this.setItemProp({ prop: 'value', value: defaultValue });
      else if (this.valueType === 'boolean')
        this.setItemProp({ prop: 'value', value: false });
      else if (this.valueType === 'number')
        this.setItemProp({ prop: 'value', value: 0 });
      else if (this.valueType === 'multiselect')
        this.setItemProp({ prop: 'value', value: [] });
    },
    loadPageData() {},
  },
  watch: {
    configurationId: {
      async handler(id) {
        if (id) {
          await this.loadPopupData(id);
        } else {
          this.resetState();
        }
      },
      immediate: true,
    },
  },
};
</script>
