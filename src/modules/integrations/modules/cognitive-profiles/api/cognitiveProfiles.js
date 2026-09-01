import { CognitiveProfilesAPI } from '@webitel/api-services/api';
import { MicrosoftRegion } from 'webitel-sdk/enums';

import CognitiveProfileServices from '../lookups/CognitiveProfileServices.lookup';

/**
 * The shared client speaks raw `service` and `properties.region` values. The
 * form binds them as option objects, so the translation lives here with the
 * lookups it needs. `MicrosoftRegion` is a hand-curated list with no
 * api-services equivalent yet.
 */
const get = async ({ itemId }) => {
	const profile = await CognitiveProfilesAPI.get({
		itemId,
	});

	const result = {
		...profile,
		service: CognitiveProfileServices.find(
			({ value }) => value === profile.service,
		),
		properties: {
			...profile.properties,
		},
	};

	if (result.properties.region) {
		result.properties.region =
			MicrosoftRegion.find(({ id }) => id === result.properties.region) || {};
	}

	return result;
};

export default {
	getList: (params) => CognitiveProfilesAPI.getList(params),
	get,
	add: (params) => CognitiveProfilesAPI.add(params),
	patch: (params) => CognitiveProfilesAPI.patch(params),
	update: (params) => CognitiveProfilesAPI.update(params),
	delete: (params) => CognitiveProfilesAPI.delete(params),
	getLookup: (params) => CognitiveProfilesAPI.getLookup(params),
};
