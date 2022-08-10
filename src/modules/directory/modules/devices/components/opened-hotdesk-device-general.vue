<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <copy-input
        :value="itemInstance.account"
        :v="v.itemInstance.account"
        :label="$t('objects.directory.devices.authId')"
        disabled
        required
      ></copy-input>
      <password-input
        :value="itemInstance.password"
        :v="v.itemInstance.password"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'password', value: $event })"
      ></password-input>
      <wt-select
        :value="itemInstance.user"
        :label="$tc('objects.directory.users.users', 1)"
        :search-method="loadDropdownOptionsList"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'user', value: $event })"
      ></wt-select>
    </div>
  </section>
</template>

<script>
import UsersAPI from '../../users/api/users';
import CopyInput from '../../../../../app/components/utils/copy-input.vue';
import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

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
