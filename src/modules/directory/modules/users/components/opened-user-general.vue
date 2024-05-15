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
        :label="$t('objects.email')"
        :value="itemInstance.email"
        @input="setItemProp({ prop: 'email', value: $event })"
      />

      <password-input
        :disabled="disableUserInput"
        :v="v.itemInstance.password"
        :value="itemInstance.password"
        required
        @input="setItemProp({ prop: 'password', value: $event })"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.login')"
        :v="v.itemInstance.username"
        :value="itemInstance.username"
        required
        @input="setItemProp({ prop: 'username', value: $event })"
      />

      <qrcode
        v-if="displayQRCode"
        :namespace="namespace"
        :url="itemInstance.totpUrl"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.extensions')"
        :value="itemInstance.extension"
        @input="setItemProp({ prop: 'extension', value: $event })"
      />

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import Qrcode from './_internals/qrcode-two-factor-auth.vue';

export default {
  name: 'OpenedUserGeneral',
  components: { PasswordInput, Qrcode },
  mixins: [openedTabComponentMixin],
  computed: {
    ...mapState('userinfo', {
      permissions: (state) => state.permissions,
    }),

    displayQRCode() {
      return this.itemInstance.totpUrl && this.permissions['change_user_password'];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
