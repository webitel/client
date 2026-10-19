<template>
  <section>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-input-text
        v-model:model-value="modelValue.mailbox"
        :disabled="disableUserInput"
        :label="t('objects.integrations.emailProfiles.mailbox')"
        :regle-validation="validationFields?.mailbox"
        required
      />
      <wt-input-text
        v-model:model-value="modelValue.imapHost"
        :disabled="disableUserInput"
        :label="t('objects.integrations.emailProfiles.imapHost')"
        :regle-validation="validationFields?.imapHost"
        required
      />
      <wt-input-number
        v-model:model-value="modelValue.imapPort"
        :disabled="disableUserInput"
        :label="t('objects.integrations.emailProfiles.imapPort')"
        :max="EMAIL_PROFILE_MAX_PORT"
        :min="0"
        :regle-validation="validationFields?.imapPort"
        required
      />
      <wt-input-text
        v-model:model-value="modelValue.smtpHost"
        :disabled="disableUserInput"
        :label="t('objects.integrations.emailProfiles.smtpHost')"
        :regle-validation="validationFields?.smtpHost"
        required
      />
      <wt-input-number
        v-model:model-value="modelValue.smtpPort"
        :disabled="disableUserInput"
        :label="t('objects.integrations.emailProfiles.smtpPort')"
        :max="EMAIL_PROFILE_MAX_PORT"
        :min="0"
        :regle-validation="validationFields?.smtpPort"
        required
      />
      <wt-single-select
        v-model:model-value="modelValue.schema"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="t('objects.routing.flow.flow', 1)"
        :regle-validation="validationFields?.schema"
        :search-method="hasFlowsReadAccess && FlowsAPI.getLookup"
        :show-clear="false"
        required
      />
      <wt-timepicker
        v-model:model-value="modelValue.fetchInterval"
        :disabled="disableUserInput"
        :label="t('objects.integrations.emailProfiles.fetchInterval')"
        :regle-validation="validationFields?.fetchInterval"
      />
      <div>
        <wt-textarea
          v-model:model-value="modelValue.description"
          :disabled="disableUserInput"
          :label="t('objects.description')"
          class="opened-email-profile-general__description"
        />
        <wt-switcher
          v-model:model-value="modelValue.listen"
          :label="t('objects.integrations.emailProfiles.listen')"
        />
      </div>
      <div>
        <wt-single-select
          :disabled="disableUserInput || isAuthParamsLocked"
          :label="t('objects.integrations.emailProfiles.authType')"
          :model-value="modelValue.authType"
          :options="authTypeOptions"
          :data-key="null"
          :regle-validation="validationFields?.authType"
          required
          @update:model-value="setAuthType"
        />
        <template v-if="!isPlainAuth && oauth2">
          <wt-input-text
            v-model:model-value="oauth2.clientId"
            :disabled="disableUserInput || isAuthParamsLocked"
            :label="t('objects.integrations.singleSignOn.clientId')"
            :regle-validation="oauth2Fields?.clientId"
            required
          />
          <wt-input-text
            v-model:model-value="oauth2.clientSecret"
            :disabled="disableUserInput || isAuthParamsLocked"
            :label="t('objects.integrations.singleSignOn.clientSecret')"
            :regle-validation="oauth2Fields?.clientSecret"
            required
          />
          <wt-input-text
            v-model:model-value="oauth2.redirectUrl"
            :disabled="disableUserInput || isAuthParamsLocked"
            :label="t('objects.integrations.singleSignOn.discoveryUrl')"
            :regle-validation="oauth2Fields?.redirectUrl"
            required
          />
        </template>
        <div class="opened-email-profile-general__login">
          <wt-input-text
            v-model:model-value="modelValue.login"
            :disabled="disableUserInput || modelValue.logged"
            :label="modelValue.logged ? t('objects.integrations.emailProfiles.authenticatedAs') : t('vocabulary.login')"
            :regle-validation="validationFields?.login"
            required
          />
          <wt-button
            v-if="modelValue.id && !isPlainAuth"
            :color="ButtonColor.SECONDARY"
            :disabled="!canAuth"
            @click="auth"
          >
            {{ modelValue.logged ? t('vocabulary.logout') : t('vocabulary.login') }}
          </wt-button>
        </div>
        <password-input
          v-if="isPlainAuth"
          v-model="modelValue.password"
          :disabled="disableUserInput"
          :regle-validation="passwordField"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import { EmailProfilesAPI, FlowsAPI } from '@webitel/api-services/api';
import {
	EngineEmailAuthType,
	type EngineEmailProfile,
	type EngineEmailProfileParamsOAuth2,
} from '@webitel/api-services/gen/models';
import { EMAIL_PROFILE_MAX_PORT } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { ButtonColor, WtObject } from '@webitel/ui-sdk/enums';
import { isEqual } from 'lodash-es';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { useEmailProfileCardStore } from '../stores/card/emailProfileCardStore';

const modelValue = defineModel<EngineEmailProfile>({
	required: true,
});

const props = defineProps<{
	validationFields?: CardValidationFields<EngineEmailProfile>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
	WtObject.Flow,
);

const emailProfileCardStore = useEmailProfileCardStore();
const { originalItemInstance } = storeToRefs(emailProfileCardStore);

const authTypeOptions = Object.values(EngineEmailAuthType).filter(
	(type) => type !== EngineEmailAuthType.EmailAuthTypeUndefined,
);

const isPlainAuth = computed(
	() =>
		!modelValue.value.authType ||
		modelValue.value.authType === EngineEmailAuthType.Plain,
);

/** [Claude] a signed-in oauth2 profile keeps its auth settings until it signs out */
const isAuthParamsLocked = computed(
	() => !isPlainAuth.value && !!modelValue.value.logged,
);

const oauth2 = computed(
	() => modelValue.value.params?.oauth2 as EngineEmailProfileParamsOAuth2,
);

/**
 * [Claude] `params.oauth2` is nested two levels down, where regle's inferred
 * status types stop; the same goes for the password input, typed for a plain string
 */
type FieldsStatus = {
	$fields?: Record<string, RegleSchemaFieldStatus>;
};

const oauth2Fields = computed(
	() =>
		(
			(props.validationFields?.params as FieldsStatus | undefined)?.$fields
				?.oauth2 as FieldsStatus | undefined
		)?.$fields,
);

const passwordField = computed(
	() =>
		props.validationFields?.password as
			| RegleSchemaFieldStatus<string>
			| undefined,
);

/** [Claude] the sign-in uses the saved settings, so it waits for all of them to be filled and saved */
const canAuth = computed(() => {
	const saved = originalItemInstance.value;
	const hasAllParams =
		!!oauth2.value && Object.values(oauth2.value).every(Boolean);
	return (
		hasAllParams &&
		modelValue.value.login === saved.login &&
		isEqual(modelValue.value.params, saved.params)
	);
});

/** [Claude] each auth type keeps only its own credentials */
const setAuthType = (authType: EngineEmailAuthType) => {
	const isPlain = authType === EngineEmailAuthType.Plain;
	modelValue.value.authType = authType;
	modelValue.value.params = {
		...modelValue.value.params,
		oauth2: {
			clientId: '',
			clientSecret: '',
			redirectUrl: '',
			...(isPlain ? {} : modelValue.value.params?.oauth2),
		},
	};
	if (!isPlain) modelValue.value.password = '';
};

/**
 * [Claude] Microsoft Outlook sign-in ([WTEL-3114](https://webitel.atlassian.net/browse/WTEL-3114)):
 * login leaves for the provider's page, logout reloads the profile to show it signed out.
 */
const auth = async () => {
	const { id } = modelValue.value;
	if (modelValue.value.logged) {
		await EmailProfilesAPI.logout({
			id,
		});
		await emailProfileCardStore.initialize({
			itemId: id,
		});
		return;
	}
	const { redirect_url: redirectUrl } = await EmailProfilesAPI.login({
		id,
	});
	if (redirectUrl) window.parent.location.replace(redirectUrl);
};
</script>

<style scoped>
.opened-email-profile-general__description {
  margin-bottom: var(--spacing-sm);
}

.opened-email-profile-general__login {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.opened-email-profile-general__login .wt-input-text {
  width: 100%;
}
</style>
