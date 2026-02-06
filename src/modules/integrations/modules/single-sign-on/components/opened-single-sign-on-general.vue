<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid object-input-grid__1-col object-input-grid__w50">
      <wt-select
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('vocabulary.type')"
        :search-method="loadFlows"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'type', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.integrations.singleSignOn.clientId')"
        :v="v.itemInstance.clientId"
        :model-value="itemInstance.clientId"
        required
        @update:model-value="setItemProp({ prop: 'clientId', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.integrations.singleSignOn.clientSecret')"
        :v="v.itemInstance.clientSecret"
        :model-value="itemInstance.clientSecret"
        required
        @update:model-value="setItemProp({ prop: 'clientSecret', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.integrations.singleSignOn.discoveryUrl')"
        :v="v.itemInstance.discoveryUrl"
        :model-value="itemInstance.discoveryUrl"
        required
        @update:model-value="setItemProp({ prop: 'discoveryUrl', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import SingleSignOnAPI from '../api/singleSignOn';

export default {
  name: 'OpenedSingleSignOnGeneral',
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
  methods: {
    loadFlows(params) {
      return SingleSignOnAPI.getLookup(params);
    },
  },
};
</script>

<style scoped></style>
