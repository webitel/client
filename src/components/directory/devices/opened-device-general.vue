<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
          :value="name"
          :v="v.itemInstance.name"
          :label="$t('objects.name')"
          required
          @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
          :value="account"
          :v="v.itemInstance.account"
          :label="$t('objects.directory.devices.authId')"
          required
          @input="setItemProp({ prop: 'account', value: $event })"
      ></wt-input>
      <password-input
          :value="password"
          :v="v.itemInstance.password"
          required
          @input="setItemProp({ prop: 'password', value: $event })"
      ></password-input>
      <wt-select
          :value="user"
          :label="$tc('objects.directory.users.users', 1)"
          :search="loadDropdownOptionsList"
          :internal-search="false"
          @input="setItemProp({ prop: 'user', value: $event })"
      ></wt-select>
    </form>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getUsersList } from '../../../api/directory/users/users';
import PasswordInput from '../../utils/generate-password-input.vue';
import openedTabComponentMixin from '../../../mixins/openedTabComponentMixin';

export default {
  name: 'opened-device-general',
  mixins: [openedTabComponentMixin],
  components: { PasswordInput },

  computed: {
    ...mapState('directory/devices', {
      name: (state) => state.itemInstance.name,
      account: (state) => state.itemInstance.account,
      password: (state) => state.itemInstance.password,
      user: (state) => state.itemInstance.user,
    }),
  },

  methods: {
    ...mapActions('directory/devices', {
      setItemProp: 'SET_ITEM_PROPERTY',
    }),

    async loadDropdownOptionsList(search) {
      const response = await getUsersList(1, 10, search);
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
