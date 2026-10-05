import { ConfigurationsAPI } from '@webitel/api-services/api';
import { createCardStore } from '@webitel/ui-datalist/card';
import type { ConfigurationParameter } from '../../types/configuration.types';
import { configurationSchema as standardValidationSchema } from '../../validations/configuration.validations';
import { ConfigurationNamespace } from '../namespace';

export const useConfigurationCardStore =
	createCardStore<ConfigurationParameter>({
		namespace: `${ConfigurationNamespace}/card`,
		apiModule: ConfigurationsAPI,
		standardValidationSchema,
	});
