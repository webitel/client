<template>
  <div class="opened-card-tabs__tab">
    <settings-general-password v-if="hasUserAccess"/>
    <settings-general-language />
    <settings-general-logout v-if="hasUserAccess"/>
  </div>
  <div class="opened-card-tabs__tab">
    <settings-general-webphone />
    <settings-general-timezone />
  </div>
</template>

<script setup lang="ts">
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import SettingsGeneralLanguage from './_internals/settings-general-language.vue';
import SettingsGeneralLogout from './_internals/settings-general-logout.vue';
import SettingsGeneralPassword from './_internals/settings-general-password.vue';
import SettingsGeneralTimezone from './_internals/settings-general-timezone.vue';
import SettingsGeneralWebphone from './_internals/settings-general-webphone.vue';

const { hasUpdateAccess, hasCreateAccess, hasDeleteAccess } =
	useUserAccessControl(WtObject.User);

const hasUserAccess = computed(
	() => hasCreateAccess.value || hasUpdateAccess.value || hasDeleteAccess.value,
);
</script>
