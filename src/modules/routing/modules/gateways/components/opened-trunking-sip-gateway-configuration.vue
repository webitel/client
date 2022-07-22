<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.routing.gateways.trunkingACLTitle') }}</h3>
      <add-action
        v-if="!disableUserInput"
        @click="addVariable"
      ></add-action>
    </header>
    <div class="object-input-grid grid-w50">
      <div class="variables">
        <div
          class="value-pair"
          v-for="(acl, key) in itemInstance.ipacl"
          :key="key"
        >
          <wt-select
            :value="acl.proto"
            :label="$t('objects.routing.protocol')"
            :options="protocolList"
            :track-by="null"
            :clearable="false"
            :disabled="disableUserInput"
            @input="setVariableProp({ index: key, prop: 'proto', value: $event })"
          ></wt-select>
          <wt-input
            :value="acl.ip"
            :v="v.itemInstance.ipacl.$each[key].ip"
            :label="$t('objects.routing.ip')"
            :disabled="disableUserInput"
            required
            @input="setVariableProp({ index: key, prop: 'ip', value: $event })"
          ></wt-input>
          <wt-input
            :value="acl.port"
            :label="$t('objects.routing.port')"
            :disabled="disableUserInput"
            type="number"
            @input="setVariableProp({ index: key, prop: 'port', value: $event })"
          ></wt-input>
          <delete-action
            v-if="!disableUserInput"
            @click="deleteVariable(key)"
          ></delete-action>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-sip-gateway-trunking-configuration',
  mixins: [openedTabComponentMixin],
  data: () => ({
    protocolList: ['any', 'udp', 'tcp'],
  }),
};
</script>

<style lang="scss" scoped>
.variables .value-pair {
  grid-template-columns: 117px 1fr 80px 24px;
  align-items: flex-start;

  .wt-tooltip {
    margin-top: 34px; // MAGIC NUMBER TO VISUALLY ALIGN ICON AT VERTICAL CENTER
  }
}
</style>
