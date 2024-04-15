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
      <copy-input
        :label="$t('objects.directory.devices.authId')"
        :v="v.itemInstance.account"
        :value="itemInstance.account"
        disabled
        required
      />
      <generate-value-input
        :label="$t('objects.password')"
        :label-props="{ hint: $t('objects.directory.passwordInfo'), hintPosition: 'right' }"
        :placeholder="$t('objects.password')"
        :disabled="disableUserInput"
        :v="v.itemInstance.password"
        :value="itemInstance.password"
        required
        @input="setItemProp({ prop: 'password', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput"
        :label="$tc('objects.directory.users.users', 1)"
        :search-method="loadDropdownOptionsList"
        :value="itemInstance.user"
        @input="setItemProp({ prop: 'user', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import CopyInput from '../../../../../app/components/utils/copy-input.vue';
import GenerateValueInput from '../../../../../app/components/utils/generate-value-input.vue';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import UsersAPI from '../../users/api/users';

export default {
  name: 'OpenedHotdeskDeviceGeneral',
  components: { CopyInput, GenerateValueInput },
  mixins: [openedTabComponentMixin],
  methods: {
    loadDropdownOptionsList(params) {
      return UsersAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
