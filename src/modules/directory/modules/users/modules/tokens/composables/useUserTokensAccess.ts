import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { useUserinfoStore } from '../../../../../../userinfo/stores/userinfoStore';
import { useUsersCardStore } from '../../../stores/card/usersCardStore';

export const useUserTokensAccess = () => {
	const userinfoStore = useUserinfoStore();
	const { userId } = storeToRefs(userinfoStore);

	const usersCardStore = useUsersCardStore();
	const { itemId } = storeToRefs(usersCardStore);

	const {
		hasReadAccess: hasGlobalReadAccess,
		hasCreateAccess: hasGlobalCreateAccess,
		hasDeleteAccess: hasGlobalDeleteAccess,
	} = useUserAccessControl({
		useGlobalCrudActionAccessAsChecksSource: true,
	});

	const isMe = computed(
		() => !!itemId.value && String(userId.value) === String(itemId.value),
	);

	const hasReadAccess = computed(() => isMe.value || hasGlobalReadAccess.value);
	const hasCreateAccess = computed(
		() => isMe.value || hasGlobalCreateAccess.value,
	);
	const hasDeleteAccess = computed(
		() => isMe.value || hasGlobalDeleteAccess.value,
	);

	return {
		hasReadAccess,
		hasCreateAccess,
		hasDeleteAccess,
	};
};
