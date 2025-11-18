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
        :disabled="disableUserInput"
        :label="$t('objects.service')"
        :options="CognitiveProfileServices"
        :v="v.itemInstance.service"
        :value="itemInstance.service"
        required
        track-by="value"
        @input="setItemProp({ prop: 'service', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.key')"
        :label-props="{ hint: $t('objects.directory.passwordInfo'), hintPosition: 'right' }"
        :v="v.itemInstance.properties.key"
        :value="itemInstance.properties.key"
        required
        @input="setItemPropertiesProp({ prop: 'key', value: $event })"
      />
      <wt-select
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.cognitiveProfiles.properties.locale')"
        :options="MicrosoftLanguageOptions"
        :track-by="null"
        :v="v.itemInstance.properties.locale"
        :value="itemInstance.properties.locale"
        required
        @input="setItemPropertiesProp({ prop: 'locale', value: $event })"
      />
      <wt-select
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.cognitiveProfiles.properties.region')"
        :options="MicrosoftRegion"
        :v="v.itemInstance.properties.region"
        :value="itemInstance.properties.region"
        required
        @input="setItemPropertiesProp({ prop: 'region', value: $event })"
      />
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
import { mapActions } from 'vuex';
import { MicrosoftLanguage } from 'webitel-sdk/esm2015/enums';
import { MicrosoftRegion } from 'webitel-sdk/esm2015/lookups';

import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CognitiveProfileServices from '../../lookups/CognitiveProfileServices.lookup';

export default {
  name: 'OpenedCognitiveProfileMicrosoft',
  mixins: [openedTabComponentMixin],
  data: () => ({
    MicrosoftRegion,
    CognitiveProfileServices,
    MicrosoftLanguageOptions: Object.values(MicrosoftLanguage),
  }),
  methods: {
    ...mapActions({
      setItemPropertiesProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PROPERTIES_PROP`, payload);
      },
    }),
  },
};
</script>

<style scoped>

</style>
