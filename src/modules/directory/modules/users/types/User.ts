import type { ApiUser } from '@webitel/api-services/gen/models';
import type { UserFormShape } from '@webitel/api-services/validations';

export type User = Omit<ApiUser, keyof UserFormShape> & UserFormShape;
