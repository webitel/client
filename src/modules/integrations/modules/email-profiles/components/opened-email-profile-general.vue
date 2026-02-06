<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :model-value="itemInstance.name"
        required
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.mailbox')"
        :v="v.itemInstance.mailbox"
        :model-value="itemInstance.mailbox"
        required
        @update:model-value="setItemProp({ prop: 'mailbox', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.imapHost')"
        :v="v.itemInstance.imapHost"
        :model-value="itemInstance.imapHost"
        required
        @update:model-value="setItemProp({ prop: 'imapHost', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.imapPort')"
        :max="65535"
        :min="0"
        :v="v.itemInstance.imapPort"
        :model-value="itemInstance.imapPort"
        required
        @update:model-value="setItemProp({ prop: 'imapPort', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.smtpHost')"
        :v="v.itemInstance.smtpHost"
        :model-value="itemInstance.smtpHost"
        required
        @update:model-value="setItemProp({ prop: 'smtpHost', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.smtpPort')"
        :max="65535"
        :min="0"
        :v="v.itemInstance.smtpPort"
        :model-value="itemInstance.smtpPort"
        required
        @update:model-value="setItemProp({ prop: 'smtpPort', value: $event })"
      />
      <wt-select
        :clearable="false"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="$t('objects.routing.flow.flow', 1)"
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
          <wt-input-text
            :disabled="disableUserInput || isDisabledAuthParams"
            :label="$t('objects.integrations.singleSignOn.clientId')"
            :v="v.itemInstance.params?.oauth2?.clientId"
            :model-value="itemInstance.params?.oauth2?.clientId"
            required
            @update:model-value="setItemProp({ path: 'params.oauth2.clientId', value: $event })"
          />
          <wt-input-text
            :disabled="disableUserInput || isDisabledAuthParams"
            :label="$t('objects.integrations.singleSignOn.clientSecret')"
            :v="v.itemInstance.params?.oauth2?.clientSecret"
            :model-value="itemInstance.params?.oauth2?.clientSecret"
            required
            @update:model-value="setItemProp({ path: 'params.oauth2.clientSecret', value: $event })"
          />
          <wt-input-text
            :disabled="disableUserInput || isDisabledAuthParams"
            :label="$t('objects.integrations.singleSignOn.discoveryUrl')"
            :v="v.itemInstance.params?.oauth2?.redirectUrl"
            :model-value="itemInstance.params?.oauth2?.redirectUrl"
            required
            @update:model-value="setItemProp({ path: 'params.oauth2.redirectUrl', value: $event })"
          />
        </div>
        <div class="opened-email-profile-general__login-wrapper">
          <wt-input-text
            :disabled="disableUserInput || itemInstance.logged"
            :label="authLabelText"
            :v="v.itemInstance.login"
            :model-value="itemInstance.login"
            required
            @update:model-value="setItemProp({ prop: 'login', value: $event })"
          />
          <wt-button
            v-if="isDisplayAuthBtn"
            :disabled="isUnavailableAuth"
            color="secondary"
            @click="auth"
          >{{
            authBtnText }}
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
import { WtObject } from '@webitel/ui-sdk/enums';

import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../../routing/modules/flow/api/flow';

export default {
  name: 'OpenedEmailProfileGeneral',
  components: { PasswordInput },
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(WtObject.Flow);
    return {
      disableUserInput,
      hasFlowsReadAccess,
    };
  },
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

<style
  lang="scss"
  scoped
>
.opened-email-profile-general {
  &__description {
    margin-bottom: var(--spacing-sm);
  }

  &__login-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);

    .wt-input-text {
      width: 100%;
    }
  }
}
</style>
