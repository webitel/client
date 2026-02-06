<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :model-value="itemInstance.name"
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.account')"
        :v="v.itemInstance.account"
        :model-value="itemInstance.account"
        required
        @update:model-value="setItemProp({ prop: 'account', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.authID')"
        :model-value="itemInstance.username"
        @update:model-value="setItemProp({ prop: 'username', value: $event })"
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
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.outboundProxy')"
        :v="v.itemInstance.proxy"
        :model-value="itemInstance.proxy"
        required
        @update:model-value="setItemProp({ prop: 'proxy', value: $event })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.usage"
        @update:model-value="setItemProp({ prop: 'usage', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.expire')"
        :v="v.itemInstance.expires"
        :model-value="itemInstance.expires"
        required
        @update:model-value="setItemProp({ prop: 'expires', value: +$event })"
      />
    </div>
  </section>
</template>

<script>
import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../flow/api/flow';

export default {
  name: 'OpenedSipGatewayRegisterGeneral',
  components: { PasswordInput },
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
  methods: {
    loadDropdownOptionsList(params) {
      return FlowsAPI.getLookup(params);
    },
  },
};
</script>

<style
  lang="scss"
  scoped
></style>
