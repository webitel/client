<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header hide-primary>
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <section class="settings-section">
        <div class="settings-section__column">
          <change-password />
          <section class="settings-section-item">
            <header class="content-header">
              <h3 class="content-title">
                {{ t('settings.language') }}
              </h3>
            </header>
            <form>
              <wt-select
                :label="t('settings.language')"
                :options="languageOptions"
                :value="language"
                :clearable="false"
                @input="changeLanguage"
              />
              <wt-select
                :label="t('settings.fallbackLanguage')"
                :options="languageOptions"
                :value="fallbackLanguage"
                :clearable="false"
                @input="changeFallbackLanguage"
              />
            </form>
          </section>
          <notifications-sounds-state />
        </div>
        <div class="settings-section__column">
          <section class="settings-section-item">
            <header class="content-header">
              <h3 class="content-title">
                {{ t('settings.webPhone') }}
              </h3>
            </header>
            <form>
              <div class="settings-section__wrapper settings-section__switcher">
                <p>{{ t('settings.useWebPhone') }}</p>
                <wt-switcher
                  :value="webrtc"
                  @change="changeWebrtc"
                />
              </div>
              <div
                v-show="webrtc"
                class="settings-section__wrapper"
              >
                <p>{{ t('settings.useStun') }}</p>
                <wt-switcher
                  :value="stun"
                  @change="changeStun"
                />
              </div>
            </form>
          </section>
          <custom-ringtone />
          <ringtone-volume-control />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { changeWebPhone, getWebPhone } from '../api/settings';
import ChangePassword from './change-password.vue';
import CustomRingtone from './custom-ringtone.vue';
import NotificationsSoundsState from './notifications-sounds.vue';
import RingtoneVolumeControl from './ringtone-volume-control.vue';

const $eventBus = inject('$eventBus');
const store = useStore();
const { t, locale, fallbackLocale } = useI18n();

const webrtc = ref(true);
const stun = ref(false);

const languageOptions = [
  { name: 'English', id: 'en' },
  { name: 'Russian', id: 'ru' },
  { name: 'Ukrainian', id: 'uk' },
  { name: 'Spanish', id: 'es' },
  { name: 'Kazakh', id: 'kz' },
  { name: 'Vietnamese', id: 'vi' },
  { name: 'Polish', id: 'pl' },
  { name: 'Romanian', id: 'ro' },
  { name: 'Uzbek', id: 'uz' },
  { name: 'Poland', id: 'pl' },
];

const language = computed(() => {
  const found = languageOptions.find((item) => item.id === locale.value);
  return found || languageOptions[0];
});

const fallbackLanguage = computed(() => {
  const id = typeof fallbackLocale.value === 'string' ? fallbackLocale.value : (Array.isArray(fallbackLocale.value) ? fallbackLocale.value[0] : 'en');
  const found = languageOptions.find((item) => item.id === id);
  return found || languageOptions[0];
});

const userId = computed(() => getNamespacedState(store.state, 'userinfo').userId);
const path = computed(() => [
  { name: t('settings.settings', 2) },
]);

function restoreLanguage() {
  const lang = localStorage.getItem('lang');
  if (lang) {
    const found = languageOptions.find((item) => item.id === lang);
    if (found) locale.value = found.id;
  }
}

function changeLanguage(value: { name: string; id: string }) {
  locale.value = value.id;
  localStorage.setItem('lang', value.id);
}

function changeFallbackLanguage(value: { name: string; id: string }) {
  fallbackLocale.value = value.id;
  localStorage.setItem('fallbackLang', value.id);
}

async function changeWebrtc(value: boolean) {
  webrtc.value = value;
  if (!value) stun.value = false;
  await changeWebPhone({
    webrtc: webrtc.value,
    stun: stun.value,
  });
}

async function changeStun(value: boolean) {
  stun.value = !webrtc.value ? false : value;
  await changeWebPhone({
    webrtc: webrtc.value,
    stun: stun.value,
  });
}

onMounted(async () => {
  restoreLanguage();
  const response = await getWebPhone();
  webrtc.value = response.webrtc;
  stun.value = response.stun;
});

defineExpose({
  t,
  path,
  languageOptions,
  language,
  fallbackLanguage,
  webrtc,
  stun,
  changeLanguage,
  changeFallbackLanguage,
  changeWebrtc,
  changeStun,
});
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.settings-section {
  width: 100%;
  display: flex;
  gap: var(--spacing-sm);

  &__column {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--spacing-sm);
  }

  &-item {
    display: flex;
    flex-direction: column;
    padding: 0 var(--spacing-sm) var(--spacing-sm);
    border-radius: var(--border-radius);
    box-shadow: var(--elevation-5);
  }

  .content-title {
    @extend %typo-heading-4;
  }

  .wt-button {
    display: block;
    margin: 0 0 0 auto;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__switcher {
    margin-bottom: var(--spacing-sm);
  }
}
</style>
