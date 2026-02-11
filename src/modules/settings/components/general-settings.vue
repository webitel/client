<template>
  <settings-wrapper-column>
    <change-password-section v-if="hasUserAccess"/>
    <language-settings-section />
    <logout-section v-if="hasUserAccess"/>
  </settings-wrapper-column>
  <settings-wrapper-column>
    <webphone-section />
    <timezone-section />
  </settings-wrapper-column>
</template>

<script setup lang="ts">
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useUserAccessControl } from '../../../app/composables/useUserAccessControl';
import SettingsWrapperColumn from './_internals/settings-wrapper-column.vue';
import ChangePasswordSection from './settings-sections/change-password-section.vue';
import LanguageSettingsSection from './settings-sections/language-settings-section.vue';
import LogoutSection from './settings-sections/logout-section.vue';
import TimezoneSection from './settings-sections/timezone-setting-section.vue';
import WebphoneSection from './settings-sections/webphone-section.vue';

const { hasUpdateAccess, hasCreateAccess, hasDeleteAccess } =
	useUserAccessControl(WtObject.User);

const hasUserAccess = computed(
	() => hasCreateAccess.value || hasUpdateAccess.value || hasDeleteAccess.value,
);
</script>
