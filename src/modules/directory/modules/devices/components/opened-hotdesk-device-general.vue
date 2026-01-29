<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
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
      <copy-input
        :label="$t('objects.directory.devices.authId')"
        :v="v.itemInstance.account"
        :value="itemInstance.account"
        disabled
        required
      />
      <password-input
        :disabled="disableUserInput"
        :v="v.itemInstance.password"
        :value="itemInstance.password"
        required
        @input="setItemProp({ prop: 'password', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.user')"
        :search-method="loadDropdownOptionsList"
        :value="itemInstance.user"
        @input="setItemProp({ prop: 'user', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import CopyInput from '../../../../../app/components/utils/copy-input.vue';
import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import UsersAPI from '../../users/api/users';

export default {
  name: 'OpenedHotdeskDeviceGeneral',
  components: { CopyInput, PasswordInput },
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
  methods: {
    loadDropdownOptionsList(params) {
      return UsersAPI.getLookup(params);
    },
  },
};
</script>

<style
  lang="scss"
  scoped
></style>
