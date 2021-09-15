<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.account"
        :v="v.itemInstance.account"
        :label="$t('objects.routing.gateways.account')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'account', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.username"
        :label="$t('objects.routing.gateways.authID')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'username', value: $event })"
      ></wt-input>
      <password-input
        :value="itemInstance.password"
        :v="v.itemInstance.password"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'password', value: $event })"
      ></password-input>
      <wt-select
        :value="itemInstance.schema"
        :label="$t('objects.routing.schema')"
        :search="loadDropdownOptionsList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'schema', value: $event })"
      ></wt-select>
      <wt-input
        :value="itemInstance.proxy"
        :v="v.itemInstance.proxy"
        :label="$t('objects.routing.gateways.outboundProxy')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'proxy', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="itemInstance.usage"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'usage', value: $event })"
      ></wt-textarea>
      <wt-input
        :value="itemInstance.expires"
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
import { getFlowList } from '../../flow/api/flow';
import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-sip-gateway-register-general',
  mixins: [openedTabComponentMixin],
  components: { PasswordInput },
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
