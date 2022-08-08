<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.integrations.importCsv.settings') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-select
        :clearable="false"
        :label="$t('objects.CSV.charSet')"
        :v="v.itemInstance.parameters.charset"
        :value="itemInstance.parameters.charset"
        disabled
        @input="setItemParamsProp({ prop: 'charset', value: $event })"
      ></wt-select>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.CSV.separator')"
        :v="v.itemInstance.parameters.separator"
        :value="itemInstance.parameters.separator"
        required
        @input="setItemParamsProp({ prop: 'separator', value: $event })"
      ></wt-input>
      <wt-switcher
        :label="$t('objects.CSV.skipHeaders')"
        :value="itemInstance.parameters.skipHeaders"
        disabled
        @input="setItemParamsProp({ prop: 'skipHeaders', value: $event })"
      ></wt-switcher>
      <div></div>
      <header class="content-header">
        <h3 class="content-title">
          {{ $t('objects.integrations.importCsv.mappings') }}
        </h3>
        <p>{{ $t('objects.integrations.importCsv.mappingsHint') }}</p>
      </header>
      <div></div>
      <component
        :is="multiple ? 'wt-tags-input' : 'wt-input'"
        v-for="({ multiple, name, text, required, csv }) of mappingsList"
        :key="name"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.importCsv.columnHeader', { name: text || name })"
        :required="required"
        :v="v.itemInstance.parameters.mappings[name]
         ? v.itemInstance.parameters.mappings[name].csv
          : null"
        :value="csv"
        @input="handleMappingInput({ name, value: $event })"
      ></component>
      <!--        <wt-tags-input></wt-tags-input>-->
    </div>
  </section>
</template>

<script>
import deepCopy from 'deep-copy';
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
// import uploadCSVMixin from '../../../../../modules/_shared/upload-csv-popup/mixins/uploadCSVMixin';

export default {
  name: 'opened-import-csv-settings',
  mixins: [openedTabComponentMixin],
  data: () => ({}),
  computed: {
    mappingsList() {
      return Object.entries(this.itemInstance.parameters.mappings)
        .reduce((list, [name, value]) => [...list, { name, ...value }], []);
    },
  },
  methods: {
    ...mapActions({
      setItemParamsProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PARAMETERS_PROP`, payload);
      },
    }),
    handleMappingInput({ name, value }) {
      const mappings = deepCopy(this.itemInstance.parameters.mappings);
      mappings[name].csv = value;
      this.setItemParamsProp({ prop: 'mappings', value: mappings });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
