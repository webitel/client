<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.integrations.importCsv.settings') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-select
        :clearable="false"
        :label="$t('objects.CSV.charSet')"
        :v="v.itemInstance.parameters.charset"
        :value="itemInstance.parameters.charset"
        disabled
        @input="setItemParamsProp({ prop: 'charset', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.CSV.separator')"
        :v="v.itemInstance.parameters.separator"
        :model-value="itemInstance.parameters.separator"
        required
        @update:model-value="setItemParamsProp({ prop: 'separator', value: $event })"
      />
      <wt-switcher
        :label="$t('objects.CSV.skipHeaders')"
        :model-value="itemInstance.parameters.skipHeaders"
        disabled
        @update:model-value="setItemParamsProp({ prop: 'skipHeaders', value: $event })"
      />
      <wt-switcher
        :label="$t('objects.integrations.importCsv.members.clearMembers')"
        :model-value="itemInstance.parameters.clearMembers"
        @update:model-value="setItemParamsProp({ prop: 'clearMembers', value: $event })"
      />
      <header class="content-header">
        <h3 class="content-title typo-heading-4">
          {{ $t('objects.integrations.importCsv.mappings') }}
        </h3>
        <p>{{ $t('objects.integrations.importCsv.mappingsHint') }}</p>
      </header>
      <div />
      <component
        :is="multiple ? 'wt-tags-input' : 'wt-input-text'"
        v-for="({ multiple, name, locale, required }) of mappingsList"
        :key="name"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.importCsv.columnHeader', { name: localizeName(locale) })"
        :required="required"
        :v="v.itemInstance.parameters.mappings[name]"
        :model-value="itemInstance.parameters.mappings[name]"
        taggable
        @input="handleMappingInput({ name, value: $event })"
      />
      <!--        <wt-tags-input></wt-tags-input>-->
    </div>
  </section>
</template>

<script>
import deepCopy from 'deep-copy';
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import ImportCsvMemberMappings from '../lookups/ImportCsvMemberMappings.lookup';

export default {
  name: 'OpenedImportCsvSettings',
  mixins: [openedTabComponentMixin],
  data: () => ({}),
  computed: {
    mappingsList() {
      return Object.entries(ImportCsvMemberMappings).reduce(
        (list, [name, value]) => [
          ...list,
          {
            name,
            ...value,
          },
        ],
        [],
      );
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
      mappings[name] = value;
      this.setItemParamsProp({
        prop: 'mappings',
        value: mappings,
      });
    },
    localizeName(locale) {
      if (Array.isArray(locale)) {
        if (typeof locale[1] === 'number') return this.$t(...locale);
        return locale.reduce((text, _locale) => {
          return `${text} ${this.localizeName(_locale)}`;
        }, '');
      }
      return this.$t(locale);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
