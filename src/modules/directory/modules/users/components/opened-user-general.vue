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
        :model-value="itemInstance.name"
        :v="v.itemInstance.name"
        required
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />

      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.extensions')"
        :model-value="itemInstance.extension"
        :v="v.itemInstance.extension"
        @update:model-value="setItemProp({ prop: 'extension', value: $event })"
      />

      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.login')"
        :v="v.itemInstance.username"
        :model-value="itemInstance.username"
        required
        @update:model-value="setItemProp({ prop: 'username', value: $event })"
      />

      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.email')"
        :model-value="itemInstance.email"
        @update:model-value="setItemProp({ prop: 'email', value: $event })"
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
        :track-by="'name'"
        :value="itemInstance.contact"
        @input="setItemProp({ prop: 'contact', value: $event })"
      />

      <wt-switcher
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.temporaryPassword')"
        :model-value="itemInstance.forcePasswordChange"
        @update:model-value="setItemProp({ prop: 'forcePasswordChange', value: $event })"
      />

      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.chatName')"
        :model-value="itemInstance.chatName"
        @update:model-value="setItemProp({ prop: 'chatName', value: $event })"
      />

      <logout-action
        :disabled="!isActiveLogout"
        :id="itemInstance.id"
      />

      <!-- @Lera24 - to save the grid-->
      <div v-if="isActiveLogout"></div>

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
import { computed } from 'vue';
import { mapGetters } from 'vuex';

import UserPasswordInput from '../../../../../app/components/utils/user-password-input.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import LogoutAction from '../../../../_shared/logout-action/logout-action.vue';
import ContactsAPI from '../api/contacts.js';
import Qrcode from './_internals/qrcode-two-factor-auth.vue';

export default {
	name: 'OpenedUserGeneral',
	components: {
		UserPasswordInput,
		Qrcode,
		LogoutAction,
	},
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const {
			disableUserInput,
			hasCreateAccess,
			hasDeleteAccess,
			hasUpdateAccess,
		} = useUserAccessControl(WtObject.User);

		const { hasReadAccess: hasContactsReadAccess } = useUserAccessControl(
			WtObject.Contact,
		);

		const hasUserAccess = computed(
			() =>
				hasCreateAccess.value || hasUpdateAccess.value || hasDeleteAccess.value,
		);

		return {
			hasUserAccess,
			disableUserInput,
			hasContactsReadAccess,
		};
	},
	computed: {
		...mapGetters('directory/users', {
			isDisplayQRCode: 'IS_DISPLAY_QR_CODE',
		}),
		isActiveLogout() {
			return this.itemInstance.id && this.hasUserAccess;
		},
	},
	methods: {
		loadContactsOptions(params) {
			return ContactsAPI.getLookup(params);
		},
	},
};
</script>

