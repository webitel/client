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
        :v="v.itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.extensions')"
        :value="itemInstance.extension"
        type="number"
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
        :disabled="disableUserInput || !hasContactsReadAccess"
        :label="$t('vocabulary.contact', 1)"
        :search-method="loadContactsOptions"
        :track-by="name"
        :value="itemInstance.contact"
        @input="setItemProp({ prop: 'contact', value: $event })"
      />

      <wt-switcher
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.temporaryPassword')"
        :model-value="itemInstance.forcePasswordChange"
        @update:model-value="setItemProp({ prop: 'forcePasswordChange', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.chatName')"
        :value="itemInstance.chatName"
        @input="setItemProp({ prop: 'chatName', value: $event })"
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
import { WtObject } from '@webitel/ui-sdk/enums';
import { mapGetters } from 'vuex';

import UserPasswordInput from '../../../../../app/components/utils/user-password-input.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import ContactsAPI from '../api/contacts.js';
import Qrcode from './_internals/qrcode-two-factor-auth.vue';

export default {
  name: 'OpenedUserGeneral',
  components: { UserPasswordInput, Qrcode },
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();

    const { hasReadAccess: hasContactsReadAccess } = useUserAccessControl(
      WtObject.Contact,
    );

    return {
      disableUserInput,
      hasContactsReadAccess,
    };
  },
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

<style
  lang="scss"
  scoped
></style>
