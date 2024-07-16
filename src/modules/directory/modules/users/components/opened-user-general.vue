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

      <password-input
        :disabled="disableUserInput"
        :v="v.itemInstance.password"
        :value="itemInstance.password"
        required
        @input="setItemProp({ prop: 'password', value: $event })"
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
import { EngineSystemSettingName } from 'webitel-sdk';
import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import ConfigurationAPI from '../../../../system/modules/configuration/api/configuration.js';
import Qrcode from './_internals/qrcode-two-factor-auth.vue';

export default {
  name: 'OpenedUserGeneral',
  components: { PasswordInput, Qrcode },
  mixins: [openedTabComponentMixin],
  computed: {
    ...mapGetters('directory/users', {
      isDisplayQRCode: 'IS_DISPLAY_QR_CODE',
    }),
  },
  methods: {
    async checkExportSettings() {
      const PasswordRegExp = await ConfigurationAPI.getList({ name: EngineSystemSettingName.PasswordRegExp });
      const exportSettingsValue = PasswordRegExp.items[0]?.value;
      console.log(exportSettingsValue);
    },
  },
  mounted() {
    this.checkExportSettings();
  }
};
</script>

<style lang="scss" scoped>
</style>
