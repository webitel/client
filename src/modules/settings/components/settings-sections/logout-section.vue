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
import { useStore } from 'vuex';
import LogoutAction from '../../../_shared/logout-action/logout-action.vue';
import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';

const { t } = useI18n();
const store = useStore();

const userId = computed(() => store.state.userinfo.userId);
</script>
