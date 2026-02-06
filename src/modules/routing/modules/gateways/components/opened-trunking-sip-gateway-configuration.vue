<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.routing.gateways.trunkingACLTitle') }}
      </h3>
      <wt-icon-action
        v-if="!disableUserInput"
        action="add"
        @click="addVariable"
      />
    </header>
    <div class="object-input-grid grid-w50">
      <div class="variables">
        <div
          v-for="(acl, key) in itemInstance.ipacl"
          :key="key"
          class="value-pair"
        >
          <wt-select
            :clearable="false"
            :disabled="disableUserInput"
            :label="$t('objects.routing.protocol')"
            :options="protocolList"
            :track-by="null"
            :value="acl.proto"
            @input="setVariableProp({ index: key, prop: 'proto', value: $event })"
          />
          <wt-input-text
            :disabled="disableUserInput"
            :label="$t('objects.routing.ip')"
            :v="v.itemInstance.ipacl.$each.$response.$data[key].ip"
            :model-value="acl.ip"
            required
            @update:model-value="setVariableProp({ index: key, prop: 'ip', value: $event })"
          />
          <wt-input-number
            :disabled="disableUserInput"
            :label="$t('objects.routing.port')"
            :model-value="acl.port"
            @update:model-value="setVariableProp({ index: key, prop: 'port', value: $event })"
          />
          <wt-icon-action
            v-if="!disableUserInput"
            action="delete"
            @click="deleteVariable(key)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedSipGatewayTrunkingConfiguration',
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
  data: () => ({
    protocolList: ['any', 'udp', 'tcp'],
  }),
};
</script>

<style
  lang="scss"
  scoped
>
.variables .value-pair {
  align-items: flex-start;
  grid-template-columns: 117px 1fr 80px 24px;

  .wt-tooltip {
    margin-top: 34px; // MAGIC NUMBER TO VISUALLY ALIGN ICON AT VERTICAL CENTER
  }
}
</style>
