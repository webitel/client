<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :value="itemInstance.name"
        @input="setItemProp({ path: 'name', value: $event })"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="t('objects.directory.users.extensions')"
        :value="itemInstance.extension"
        @input="setItemProp({ path: 'extension', value: $event })"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="t('objects.directory.users.login')"
        :v="v.itemInstance.username"
        :value="itemInstance.username"
        required
        @input="setItemProp({ path: 'username', value: $event })"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="t('objects.email')"
        :value="itemInstance.email"
        @input="setItemProp({ path: 'email', value: $event })"
      />

      <user-password-input
        :disabled="disableUserInput"
        :model-value="itemInstance.password"
        required
        @update:model-value="setItemProp({ path: 'password', value: $event })"
      />

      <wt-select
        :disabled="disableUserInput"
        :label="t('vocabulary.contact', 1)"
        :search-method="ContactsAPI.getLookup"
        :value="itemInstance.contact"
        :track-by="name"
        @input="setItemProp({ path: 'contact', value: $event })"
      />

      <qrcode
        v-if="isDisplayQRCode"
        :namespace="namespace"
        :url="itemInstance.totpUrl"
      />
    </div>
  </section>
</template>

<script setup>
import { useCardStore } from '@webitel/ui-sdk/store';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import UserPasswordInput from '../../../../../app/components/utils/user-password-input.vue';
import { useAccessControl } from '@webitel/ui-sdk/src/composables/useAccessControl/useAccessControl.js';
import ContactsAPI from '../api/contacts.js';
import Qrcode from './_internals/qrcode-two-factor-auth.vue';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
  v: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const { t } = useI18n();

const { disableUserInput } = useAccessControl();

const { itemInstance, setItemProp } = useCardStore(props.namespace);

const isDisplayQRCode = computed(() => store.getters[`${props.namespace}/IS_DISPLAY_QR_CODE`]);
</script>

<style lang="scss" scoped>
</style>
