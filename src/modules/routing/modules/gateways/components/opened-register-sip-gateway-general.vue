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
        :value="itemInstance.name"
        @input="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.account')"
        :v="v.itemInstance.account"
        :value="itemInstance.account"
        required
        @input="setItemProp({ prop: 'account', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.authID')"
        :value="itemInstance.username"
        @input="setItemProp({ prop: 'username', value: $event })"
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
        :label="$t('objects.routing.schema')"
        :search-method="loadDropdownOptionsList"
        :value="itemInstance.schema"
        @input="setItemProp({ prop: 'schema', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.outboundProxy')"
        :v="v.itemInstance.proxy"
        :value="itemInstance.proxy"
        required
        @input="setItemProp({ prop: 'proxy', value: $event })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.usage"
        @update:model-value="setItemProp({ prop: 'usage', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.expire')"
        :v="v.itemInstance.expires"
        :value="itemInstance.expires"
        required
        type="number"
        @input="setItemProp({ prop: 'expires', value: +$event })"
      />
    </div>
  </section>
</template>

<script>
import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../flow/api/flow';

export default {
  name: 'OpenedSipGatewayRegisterGeneral',
  components: { PasswordInput },
  mixins: [openedTabComponentMixin],
  methods: {
    loadDropdownOptionsList(params) {
      return FlowsAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
