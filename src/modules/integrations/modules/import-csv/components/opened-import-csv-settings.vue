<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.integrations.importCsv.settings') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-single-select
        :show-clear="false"
        :label="$t('objects.CSV.charSet')"
        :v="v.itemInstance.parameters.charset"
        :model-value="itemInstance.parameters.charset"
        disabled
        @update:model-value="setItemParamsProp({ prop: 'charset', value: $event })"
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
        <div>
          <h3 class="content-title typo-heading-4">
            {{ $t('objects.integrations.importCsv.mappings') }}
          </h3>
          <p>{{ $t('objects.integrations.importCsv.mappingsHint') }}</p>
        </div>
      </header>
      <div />
      <template
        v-for="({ multiple, name, locale, required }) of mappingsList"
        :key="name"
      >
        <wt-multi-select
          v-if="multiple"
          :disabled="disableUserInput"
          :label="$t('objects.integrations.importCsv.columnHeader', { name: localizeName(locale) })"
          :required="required"
          :v="v.itemInstance.parameters.mappings[name]"
          :model-value="itemInstance.parameters.mappings[name]"
          chips-view
          allow-custom-values
          @update:model-value="handleMappingInput({ name, value: $event })"
        />
        <wt-input-text
          v-else
          :disabled="disableUserInput"
          :label="$t('objects.integrations.importCsv.columnHeader', { name: localizeName(locale) })"
          :required="required"
          :v="v.itemInstance.parameters.mappings[name]"
          :model-value="itemInstance.parameters.mappings[name]"
          @update:model-value="handleMappingInput({ name, value: $event })"
        />
      </template>
    </div>
  </section>
</template>

<script>
import deepCopy from 'deep-copy';
import { mapActions } from 'vuex';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import ImportCsvMemberMappings from '../lookups/ImportCsvMemberMappings.lookup';

export default {
	name: 'OpenedImportCsvSettings',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		return {
			disableUserInput,
		};
	},
	data: () => ({}),
	computed: {
		mappingsList() {
			return Object.entries(ImportCsvMemberMappings).reduce(
				(list, [name, value]) => {
					list.push({
						name,
						...value,
					});
					return list;
				},
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

<style
  lang="scss"
  scoped
></style>
