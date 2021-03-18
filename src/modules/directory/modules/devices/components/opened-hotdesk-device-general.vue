<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
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
        :search="loadDropdownOptionsList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'user', value: $event })"
      ></wt-select>
    </form>
  </section>
</template>

<script>
import { getUsersList } from '../../users/api/users';
import CopyInput from '../../../../../app/components/utils/copy-input.vue';
import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-hotdesk-device-general',
  mixins: [openedTabComponentMixin],
  components: { CopyInput, PasswordInput },
  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getUsersList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
