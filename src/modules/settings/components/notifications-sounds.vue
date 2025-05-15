<template>
  <section class="notifications-sounds settings-section-item">
    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('vocabulary.notification', 2) }}
      </h3>
    </header>
    <form>
      <div class="notifications-sounds__list">
        <notifications-sound-state
          v-for="(item) of notificationTypes"
          :notification-type="item.type"
          :title="item.locale"
        />
      </div>
    </form>
  </section>
</template>
<script setup lang="ts">

import {computed} from "vue";
import NotificationsSoundState from "./notifications-sound-state.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

interface NotificationType {
  type: string;
  locale: string;
}

const notificationTypes = computed<Array<NotificationType>>(() => [
  {
    type: 'callEndSound',
    locale: t('settings.notifications.callEnd'),
  },
  {
    type: 'socketCloseSound',
    locale: t('settings.notifications.lossConnection'),
  }
]);

</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.notifications-sounds {
  .content-title {
    @extend %typo-heading-4;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
}
</style>
