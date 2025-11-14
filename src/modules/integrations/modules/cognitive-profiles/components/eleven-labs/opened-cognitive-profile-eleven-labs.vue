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
      <wt-select
        :clearable="false"
        :disabled="true || disableUserInput"
        :label="$t('objects.provider')"
        :v="v.itemInstance.provider"
        :value="itemInstance.provider"
        required
        @input="setItemProp({ prop: 'provider', value: $event })"
      />
      <wt-select
        :clearable="false"
        :disabled="true || disableUserInput"
        :label="$t('objects.service')"
        :options="CognitiveProfileServices"
        :v="v.itemInstance.service"
        :value="itemInstance.service"
        required
        track-by="value"
        @input="setItemProp({ prop: 'service', value: $event })"
      />
      <div/>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.key')"
        :v="v.itemInstance.properties.key"
        :value="itemInstance.properties.key"
        :label-props="{ hint: $t('objects.directory.passwordInfo'), hintPosition: 'right' }"
        required
        @input="setItemProp({ path: 'properties.key', value: $event })"
      />
      <div/>
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CognitiveProfileServices from '../../lookups/CognitiveProfileServices.lookup';

export default {
  name: 'OpenedCognitiveProfileElevenLabs',
  mixins: [openedTabComponentMixin],
  data: () => ({
    CognitiveProfileServices,
  }),
};
</script>

<style scoped>

</style>
