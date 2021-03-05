<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
        :value="account"
        :v="v.itemInstance.account"
        :label="$t('objects.routing.gateways.account')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'account', value: $event })"
      ></wt-input>
      <wt-input
        :value="username"
        :label="$t('objects.routing.gateways.authID')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'username', value: $event })"
      ></wt-input>
      <password-input
        :value="password"
        :v="v.itemInstance.password"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'password', value: $event })"
      ></password-input>
      <wt-select
        :value="schema"
        :label="$t('objects.routing.schema')"
        :search="loadDropdownOptionsList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'schema', value: $event })"
      ></wt-select>
      <wt-input
        :value="proxy"
        :v="v.itemInstance.proxy"
        :label="$t('objects.routing.gateways.outboundProxy')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'proxy', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
      <wt-input
        :value="expires"
        :v="v.itemInstance.expires"
        :label="$t('objects.routing.gateways.expire')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'expires', value: +$event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getFlowList } from '../../../api/routing/flow/flow';
import PasswordInput from '../../utils/generate-password-input.vue';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-sip-gateway-register-general',
  mixins: [openedTabComponentMixin],
  components: { PasswordInput },
  computed: {
    ...mapState('routing/gateways', {
      name: (state) => state.itemInstance.name,
      expires: (state) => state.itemInstance.expires,
      account: (state) => state.itemInstance.account,
      password: (state) => state.itemInstance.password,
      username: (state) => state.itemInstance.username,
      schema: (state) => state.itemInstance.schema,
      proxy: (state) => state.itemInstance.proxy,
      description: (state) => state.itemInstance.description,
    }),
  },

  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getFlowList({ search });
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
