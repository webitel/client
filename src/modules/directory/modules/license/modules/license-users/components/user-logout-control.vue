<template>
  <wt-switcher
    :disabled="disableControl"
    :model-value="!!item.sessions"
    @update:model-value="logoutUser"
  />
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['logout']);

const store = useStore();
const route = useRoute();

const { hasEditAccess } = useUserAccessControl({
  route: {
    name: `${RouteNames.USERS}-edit`,
  },
});

const domain = computed(() => store.state.userinfo.domain);

const disableControl = computed(() => {
  return !props.item.sessions || !hasEditAccess.value || props.item.domain?.name !== domain.value;
});

function logoutUser() {
  emit('logout', props.item.user);
}
</script>

<style lang="scss" scoped>

</style>
