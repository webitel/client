<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <copy-input
        :label="$t('objects.directory.devices.authId')"
        :v="v.itemInstance.account"
        :value="itemInstance.account"
        disabled
        required
      ></copy-input>
      <password-input
        :disabled="disableUserInput"
        :v="v.itemInstance.password"
        :value="itemInstance.password"
        required
        @input="setItemProp({ prop: 'password', value: $event })"
      ></password-input>
      <wt-select
        :disabled="disableUserInput"
        :label="$tc('objects.directory.users.users', 1)"
        :search-method="loadDropdownOptionsList"
        :value="itemInstance.user"
        @input="setItemProp({ prop: 'user', value: $event })"
      ></wt-select>
    </div>
  </section>
</template>

<script>
import CopyInput from '../../../../../app/components/utils/copy-input.vue';
import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import UsersAPI from '../../users/api/users';

export default {
  name: 'opened-hotdesk-device-general',
  mixins: [openedTabComponentMixin],
  components: { CopyInput, PasswordInput },
  methods: {
    loadDropdownOptionsList(params) {
      return UsersAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
