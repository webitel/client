import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { useUserinfoStore } from '../../../../../../userinfo/stores/userinfoStore';
import { useUsersCardStore } from '../../../stores/card/usersCardStore';

export const useHasUserTokensAccess = () => {
	const userinfoStore = useUserinfoStore();
	const { userId } = storeToRefs(userinfoStore);

	const usersCardStore = useUsersCardStore();
	const { itemId } = storeToRefs(usersCardStore);

	const {
		hasReadAccess: hasGlobalReadAccess,
		disableUserInput: disableUserInputGlobalAccess,
		hasDeleteAccess: hasGlobalDeleteAccess,
		hasCreateAccess: hasGlobalCreateAccess,
		hasUpdateAccess: hasGlobalUpdateAccess,
	} = useUserAccessControl({
		useGlobalCrudActionAccessAsChecksSource: true,
	});

	const isMe = computed(() => {
		return userId.value === itemId.value;
	});

	const hasReadAccess = computed(() => {
		return isMe.value || hasGlobalReadAccess.value;
	});

	const hasCreateAccess = computed(() => {
		return isMe.value || hasGlobalCreateAccess.value;
	});
	const hasUpdateAccess = computed(() => {
		return isMe.value || hasGlobalUpdateAccess.value;
	});

	const hasDeleteAccess = computed(() => {
		return isMe.value || hasGlobalDeleteAccess.value;
	});

	const disableUserInput = computed(() => {
		return isMe.value || disableUserInputGlobalAccess.value;
	});

	return {
		hasReadAccess,
		hasDeleteAccess,
		hasCreateAccess,
		hasUpdateAccess,
		disableUserInput,
	};
};
