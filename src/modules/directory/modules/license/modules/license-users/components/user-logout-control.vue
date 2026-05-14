<template>
  <wt-switcher
    :disabled="disableControl"
    :model-value="!!item.sessions"
    @update:model-value="logoutUser"
  />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { useUserinfoStore } from '../../../../../../../modules/userinfo/stores/userinfoStore';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';

const props = defineProps({
	item: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits([
	'logout',
]);

const { hasUpdateAccess } = useUserAccessControl({
	route: {
		name: `${RouteNames.USERS}-edit`,
	},
});

const userinfoStore = useUserinfoStore();
const { userInfo } = storeToRefs(userinfoStore);

const disableControl = computed(() => {
	return (
		!props.item.sessions ||
		!hasUpdateAccess.value ||
		props.item.domain?.name !== userInfo.value.domain
	);
});

function logoutUser() {
	emit('logout', props.item.user);
}
</script>

<style
  lang="scss"
  scoped
></style>
