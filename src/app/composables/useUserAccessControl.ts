import { createUserAccessControlComposable } from '@webitel/ui-sdk/modules/Userinfo';

type UseUserAccessControl = ReturnType<
	typeof createUserAccessControlComposable
>;

export let useUserAccessControl: UseUserAccessControl = () => {
	throw new Error('useUserAccessControl is not created');
};

export const createUserAccessControl = (useUserinfoStore) => {
	useUserAccessControl = createUserAccessControlComposable(useUserinfoStore);
	return useUserAccessControl;
};
