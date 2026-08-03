import { createCardStore } from '@webitel/ui-datalist/card';
import { ActivityTypesNamespace } from '../namespace';
import { activityTypeSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { ActivityTypesAPI } from '@webitel/api-services/api';

export const useActivityTypesCardStore = createCardStore({
  namespace: `${ActivityTypesNamespace}/card`,
  apiModule: ActivityTypesAPI,
  standardValidationSchema
})