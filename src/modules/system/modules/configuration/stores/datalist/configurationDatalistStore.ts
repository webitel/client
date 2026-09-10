import { ConfigurationsAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';
import type { ConfigurationParameter } from '../../types/configuration.types';
import { ConfigurationNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useConfigurationDatalistStore =
	createTableStore<ConfigurationParameter>(
		`${ConfigurationNamespace}/datalist`,
		{
			apiModule: ConfigurationsAPI,
			headers,
		},
	);
