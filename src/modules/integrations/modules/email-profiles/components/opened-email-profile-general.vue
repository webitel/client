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
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.mailbox')"
        :v="v.itemInstance.mailbox"
        :value="itemInstance.mailbox"
        required
        @input="setItemProp({ prop: 'mailbox', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.imapHost')"
        :v="v.itemInstance.imapHost"
        :value="itemInstance.imapHost"
        required
        @input="setItemProp({ prop: 'imapHost', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.imapPort')"
        :number-max="65535"
        :number-min="0"
        :v="v.itemInstance.imapPort"
        :value="itemInstance.imapPort"
        required
        type="number"
        @input="setItemProp({ prop: 'imapPort', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.smtpHost')"
        :v="v.itemInstance.smtpHost"
        :value="itemInstance.smtpHost"
        required
        @input="setItemProp({ prop: 'smtpHost', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.smtpPort')"
        :number-max="65535"
        :number-min="0"
        :v="v.itemInstance.smtpPort"
        :value="itemInstance.smtpPort"
        required
        type="number"
        @input="setItemProp({ prop: 'smtpPort', value: $event })"
      />
      <wt-select
        :clearable="false"
        :disabled="disableUserInput"
        :label="$tc('objects.routing.flow.flow', 1)"
        :search-method="loadFlows"
        :v="v.itemInstance.schema"
        :value="itemInstance.schema"
        required
        @input="setItemProp({ prop: 'schema', value: $event })"
      />
      <wt-timepicker
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.fetchInterval')"
        :v="v.itemInstance.fetchInterval"
        :value="itemInstance.fetchInterval"
        @input="setItemProp({ prop: 'fetchInterval', value: +$event })"
      />
      <div>
        <wt-textarea
          :disabled="disableUserInput"
          :label="$t('objects.description')"
          :model-value="itemInstance.description"
          class="opened-email-profile-general__description"
          @update:model-value="setItemProp({ prop: 'description', value: $event })"
        />
        <wt-switcher
          :label="$t('objects.integrations.emailProfiles.listen')"
          :model-value="itemInstance.listen"
          @update:model-value="setItemProp({ prop: 'listen', value: $event })"
        />
      </div>
      <div>
        <wt-select
          :disabled="disableUserInput || isDisabledAuthParams"
          :label="$t('objects.integrations.emailProfiles.authType')"
          :options="authTypesList"
          :track-by="null"
          :v="v.itemInstance.authType"
          :value="itemInstance.authType"
          required
          @input="changeAuthType"
        />
        <div v-if="!isPlainAuthType">
          <wt-input
            :disabled="disableUserInput || isDisabledAuthParams"
            :label="$t('objects.integrations.singleSignOn.clientId')"
            :v="v.itemInstance.params?.oauth2?.clientId"
            :value="itemInstance.params?.oauth2?.clientId"
            required
            @input="setItemProp({ path: 'params.oauth2.clientId', value: $event })"
          >
          </wt-input>
          <wt-input
            :disabled="disableUserInput || isDisabledAuthParams"
            :label="$t('objects.integrations.singleSignOn.clientSecret')"
            :v="v.itemInstance.params?.oauth2?.clientSecret"
            :value="itemInstance.params?.oauth2?.clientSecret"
            required
            @input="setItemProp({ path: 'params.oauth2.clientSecret', value: $event })"
          >
          </wt-input>
          <wt-input
            :disabled="disableUserInput || isDisabledAuthParams"
            :label="$t('objects.integrations.singleSignOn.discoveryUrl')"
            :v="v.itemInstance.params?.oauth2?.redirectUrl"
            :value="itemInstance.params?.oauth2?.redirectUrl"
            required
            @input="setItemProp({ path: 'params.oauth2.redirectUrl', value: $event })"
          >
          </wt-input>
        </div>
        <div class="opened-email-profile-general__login-wrapper">
          <wt-input
            :disabled="disableUserInput || itemInstance.logged"
            :label="authLabelText"
            :v="v.itemInstance.login"
            :value="itemInstance.login"
            required
            @input="setItemProp({ prop: 'login', value: $event })"
          />
          <wt-button
            v-if="isDisplayAuthBtn"
            :disabled="isUnavailableAuth"
            color="secondary"
            @click="auth"
          >{{ authBtnText }}
          </wt-button>
        </div>
        <password-input
          v-if="isPlainAuthType"
          :disabled="disableUserInput"
          :v="v.itemInstance.password"
          :value="itemInstance.password"
          @input="setItemProp({ prop: 'password', value: $event })"
        />
      </div>

    </div>
  </section>
</template>

<script>
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import { mapActions } from 'vuex';
import { EngineEmailAuthType } from 'webitel-sdk';

import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../../routing/modules/flow/api/flow';

export default {
  name: 'OpenedEmailProfileGeneral',
  components: { PasswordInput },
  mixins: [openedTabComponentMixin],
  data: () => ({
    EngineEmailAuthType,
    isChangeOauth2Params: false,
  }),
  computed: {
    isPlainAuthType() {
      return (
        this.itemInstance.authType === EngineEmailAuthType.Plain || !this.itemInstance.authType
      );
    },
    authTypesList() {
      return Object.values(EngineEmailAuthType).filter(
        (type) => type !== EngineEmailAuthType.EmailAuthTypeUndefined,
      );
    },
    isDisplayAuthBtn() {
      return this.itemInstance.id && !this.isPlainAuthType;
    },
    isUnavailableAuth() {
      if (isEmpty(this.itemInstance.params)) return true;
      return (
        Object.values(this.itemInstance?.params?.oauth2).some((item) => !item) ||
        this.isChangeOauth2Params
      );
    },
    authBtnText() {
      return this.itemInstance.logged ? this.$t('vocabulary.logout') : this.$t('vocabulary.login');
    },
    authLabelText() {
      return this.itemInstance.logged
        ? this.$t('objects.integrations.emailProfiles.authenticatedAs')
        : this.$t('vocabulary.login');
    },
    isDisabledAuthParams() {
      return !this.isPlainAuthType && this.itemInstance.logged;
    },
  },
  methods: {
    ...mapActions({
      // [https://webitel.atlassian.net/browse/WTEL-3114]
      // Authorization Microsoft Outlook service

      auth(dispatch, payload) {
        return dispatch(`${this.namespace}/AUTH`, payload);
      },
    }),
    loadFlows(params) {
      return FlowsAPI.getLookup(params);
    },
    changeAuthType(type) {
      this.setItemProp({
        prop: 'authType',
        value: type,
      });
      if (this.isPlainAuthType) {
        if (this.itemInstance?.params?.oauth2?.clientId)
          this.setItemProp({
            path: 'params.oauth2.clientId',
            value: '',
          });
        if (this.itemInstance?.params?.oauth2?.clientSecret)
          this.setItemProp({
            path: 'params.oauth2.clientSecret',
            value: '',
          });
        if (this.itemInstance?.params?.oauth2?.redirectUrl)
          this.setItemProp({
            path: 'params.oauth2.redirectUrl',
            value: '',
          });
      } else {
        if (this.itemInstance?.password)
          this.setItemProp({
            prop: 'password',
            value: '',
          });
      }
    },
    updateIsChangeOauth2Params() {
      if (this.itemInstance._dirty) this.isChangeOauth2Params = true;
    },
  },
  watch: {
    'itemInstance.login': {
      handler() {
        this.updateIsChangeOauth2Params();
      },
    },
    'itemInstance.params.oauth2': {
      handler() {
        this.updateIsChangeOauth2Params();
      },
      deep: true,
    },
    'itemInstance._dirty': {
      handler(value) {
        if (!value) this.isChangeOauth2Params = false;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.opened-email-profile-general {
  &__description {
    margin-bottom: var(--spacing-sm);
  }

  &__login-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);

    .wt-input {
      width: 100%;
    }
  }
}
</style>
