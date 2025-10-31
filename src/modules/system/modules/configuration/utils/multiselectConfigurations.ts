import { LabelsAPI } from '@webitel/api-services/api';
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';

import { PasswordCategories } from '../enum/PasswordCategories.enum';

interface MultiselectConfig {
  searchMethod: ((params: any) => Promise<any>) | null;
  options: Array<{ name: string; value: string; id: string }>;
  optionLabel: string;
  trackBy: string;
  display?: {
    keyProperty: string;
    labelProperty: string;
  };
}

type MultiselectConfigurations = {
  [key in EngineSystemSettingName]?: MultiselectConfig;
};

const getPasswordCategoriesOptions = () => {
  return Object.keys(PasswordCategories).map((key) => ({
    category: PasswordCategories[key as keyof typeof PasswordCategories],
  }));
};

export const multiselectConfigurations: MultiselectConfigurations = {
  [EngineSystemSettingName.PasswordCategories]: {
    searchMethod: null,
    options: getPasswordCategoriesOptions(),
    optionLabel: 'category',
    trackBy: 'category',
    display: {
      keyProperty: 'category',
      labelProperty: 'category',
    },
  },
  [EngineSystemSettingName.LabelsToLimitContacts]: {
    searchMethod: LabelsAPI.getLookup,
    options: [],
    optionLabel: 'label',
    trackBy: 'label',
    display: {
      keyProperty: 'id',
      labelProperty: 'label',
    },
  },
};

export const defaultMultiselectConfig: MultiselectConfig = {
  searchMethod: LabelsAPI.getLookup,
  options: [],
  optionLabel: 'label',
  trackBy: 'label',
  display: {
    keyProperty: 'id',
    labelProperty: 'label',
  },
};

export const getMultiselectDisplayConfig = (settingName: EngineSystemSettingName) => {
  return multiselectConfigurations[settingName] || defaultMultiselectConfig;
};


export const getPropertyValue = (obj, property: string, fallback = '') => {
  if (typeof obj === 'string') {
    return obj;
  }
  return obj?.[property] || fallback;
};

