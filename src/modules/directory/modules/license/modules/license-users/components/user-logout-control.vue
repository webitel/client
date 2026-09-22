<template>
  <wt-switcher
    :disabled="disableControl"
    :model-value="!!item.sessions"
    @update:model-value="logoutUser"
  />
</template>

<script setup lang="ts">
import type { ApiProductUser } from '@webitel/api-services/gen/models';
import { WtObject } from '@webitel/ui-sdk/enums';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { useUserinfoStore } from '../../../../../../../modules/userinfo/stores/userinfoStore';

const props = defineProps<{
	item: ApiProductUser;
}>();

const emit = defineEmits<{
	logout: [
		user: ApiProductUser['user'],
	];
}>();

const { hasUpdateAccess } = useUserAccessControl({
	resource: WtObject.User,
});

const userinfoStore = useUserinfoStore();
const { userInfo } = storeToRefs(userinfoStore);

const disableControl = computed(
	() =>
		!props.item.sessions ||
		!hasUpdateAccess.value ||
		props.item.domain?.name !== userInfo.value.domain,
);

function logoutUser() {
	emit('logout', props.item.user);
}
</script>
