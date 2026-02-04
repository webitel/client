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
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useStore } from 'vuex';

import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';
import LogoutAction from '../../../_shared/logout-action/logout-action.vue';

const { t } = useI18n();
const store = useStore();

const userId = computed(() => store.state.userinfo.userId)
</script>
