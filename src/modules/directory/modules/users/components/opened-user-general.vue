<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :value="itemInstance.name"
        @input="setItemProp({ prop: 'name', value: $event })"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.extensions')"
        :value="itemInstance.extension"
        @input="setItemProp({ prop: 'extension', value: $event })"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.login')"
        :v="v.itemInstance.username"
        :value="itemInstance.username"
        required
        @input="setItemProp({ prop: 'username', value: $event })"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.email')"
        :value="itemInstance.email"
        @input="setItemProp({ prop: 'email', value: $event })"
      />

      <user-password-input
        :disabled="disableUserInput"
        :model-value="itemInstance.password"
        required
        @update:model-value="setItemProp({ prop: 'password', value: $event })"
      />

      <wt-select
        :disabled="disableUserInput"
        :label="$tc('vocabulary.contact', 1)"
        :search-method="loadContactsOptions"
        :value="itemInstance.contact"
        :track-by="name"
        @input="setItemProp({ prop: 'contact', value: $event })"
      />

      <qrcode
        v-if="isDisplayQRCode"
        :namespace="namespace"
        :url="itemInstance.totpUrl"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import UserPasswordInput from '../../../../../app/components/utils/user-password-input.vue';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import Qrcode from './_internals/qrcode-two-factor-auth.vue';
import ContactsAPI from '../api/contacts.js';

export default {
  name: 'OpenedUserGeneral',
  components: { UserPasswordInput, Qrcode },
  mixins: [openedTabComponentMixin],
  computed: {
    ...mapGetters('directory/users', {
      isDisplayQRCode: 'IS_DISPLAY_QR_CODE',
    }),
  },
  methods: {
    loadContactsOptions(params) {
      return ContactsAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
