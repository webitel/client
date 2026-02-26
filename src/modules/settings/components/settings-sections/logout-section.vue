<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.security.security') }}
    </template>
    <template>
      <logout-action
        :id="userId"
        my-sessions
      />
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import LogoutAction from '../../../_shared/logout-action/logout-action.vue';
import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';
import { useUserinfoStore } from '../../../userinfo/stores/userinfoStore';
import { storeToRefs } from 'pinia';

const { t } = useI18n();

const userStore = useUserinfoStore();
const { userInfo } = storeToRefs(userStore);

const userId = computed(() => userInfo.value?.userId);
</script>
