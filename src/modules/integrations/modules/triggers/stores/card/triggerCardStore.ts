import { TriggersAPI } from '@webitel/api-services/api';
import { EngineTriggerType } from '@webitel/api-services/gen/models';
import {
	i18nIssue,
	type TriggerCard,
	triggerSchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';
import { isValidCron } from 'cron-validator';

import { TriggersNamespace } from '../namespace';

/** [Claude] the shared schema, plus the cron format check: the cron parser lives in the app */
const standardValidationSchema = triggerSchema.superRefine((trigger, ctx) => {
	if (trigger.type !== EngineTriggerType.Cron || !trigger.expression) return;
	if (
		isValidCron(trigger.expression, {
			seconds: true,
		})
	)
		return;
	ctx.addIssue({
		code: 'custom',
		path: [
			'expression',
		],
		...i18nIssue('cron'),
	});
});

export const useTriggerCardStore = createCardStore<TriggerCard>({
	namespace: `${TriggersNamespace}/card`,
	apiModule: TriggersAPI,
	standardValidationSchema,
});
