<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :clearable="false"
        :disabled="true || disableUserInput"
        :label="$t('objects.provider')"
        :v="v.itemInstance.provider"
        :value="itemInstance.provider"
        required
        @input="setItemProp({ prop: 'provider', value: $event })"
      ></wt-select>
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
      ></wt-select>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.key')"
        :value="itemInstance.properties.key"
        :v="v.itemInstance.properties.key"
        required
        @input="setItemPropertiesProp({ prop: 'key', value: $event })"
      ></wt-input>
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.integrations.cognitiveProfiles.properties.locale')"
        :options="MicrosoftLanguageOptions"
        :value="itemInstance.properties.locale"
        :v="v.itemInstance.properties.locale"
        :clearable="false"
        :track-by="null"
        required
        @input="setItemPropertiesProp({ prop: 'locale', value: $event })"
      ></wt-select>
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.integrations.cognitiveProfiles.properties.region')"
        :options="MicrosoftRegion"
        :value="itemInstance.properties.region"
        :v="v.itemInstance.properties.region"
        :clearable="false"
        required
        @input="setItemPropertiesProp({ prop: 'region', value: $event })"
      ></wt-select>
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :value="itemInstance.description"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { MicrosoftLanguage } from 'webitel-sdk/esm2015/enums';
import { MicrosoftRegion } from 'webitel-sdk/esm2015/lookups';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CognitiveProfileServices from '../lookups/CognitiveProfileServices.lookup';

export default {
  name: 'opened-cognitive-profile-general',
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
