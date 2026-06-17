<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.directory.users.communications') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.email')"
        :model-value="itemInstance.email"
        @update:model-value="setItemProp({ prop: 'email', value: $event })"
      />

      <wt-single-select
        :disabled="disableUserInput || !hasContactsReadAccess"
        :label="$t('vocabulary.contact', 1)"
        :search-method="loadContactsOptions"
        :data-key="'name'"
        :model-value="itemInstance.contact"
        @update:model-value="setItemProp({ prop: 'contact', value: $event })"
      />

      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.chatName')"
        :model-value="itemInstance.chatName"
        @update:model-value="setItemProp({ prop: 'chatName', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import ContactsAPI from '../api/contacts.js';

export default {
	name: 'OpenedUserCommunications',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl(WtObject.User);
		const { hasReadAccess: hasContactsReadAccess } = useUserAccessControl(
			WtObject.Contact,
		);

		return {
			disableUserInput,
			hasContactsReadAccess,
		};
	},
	methods: {
		loadContactsOptions(params) {
			return ContactsAPI.getLookup(params);
		},
	},
};
</script>
