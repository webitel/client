<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
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
          <wt-input
            :disabled="disableUserInput"
            :label="$t('objects.routing.ip')"
            :v="v.itemInstance.ipacl.$each.$response.$data[key].ip"
            :value="acl.ip"
            required
            @input="setVariableProp({ index: key, prop: 'ip', value: $event })"
          />
          <wt-input
            :disabled="disableUserInput"
            :label="$t('objects.routing.port')"
            :value="acl.port"
            type="number"
            @input="setVariableProp({ index: key, prop: 'port', value: $event })"
          />
          <wt-icon-action
            v-if="!disableUserInput"
            action="delete"
            class="table-action"
            @click="deleteVariable(key)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedSipGatewayTrunkingConfiguration',
  mixins: [openedTabComponentMixin],
  data: () => ({
    protocolList: ['any', 'udp', 'tcp'],
  }),
};
</script>

<style lang="scss" scoped>
.variables .value-pair {
  align-items: flex-start;
  grid-template-columns: 117px 1fr 80px 24px;

  .wt-tooltip {
    margin-top: 34px; // MAGIC NUMBER TO VISUALLY ALIGN ICON AT VERTICAL CENTER
  }
}
</style>
