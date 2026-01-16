<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.directory.license.license', 1) }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-select :close-on-select="false" :disabled="disableUserInput"
        :label="$t('objects.directory.license.license', 1)" :search-method="loadDropdownOptionsList"
        :value="itemInstance.license" multiple @input="setItemProp({ prop: 'license', value: $event })" />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import LicenseAPI from '../../license/api/license';

export default {
  name: 'OpenedUserLicense',
  mixins: [openedTabComponentMixin],
  methods: {
    async loadDropdownOptionsList(params) {
      const fields = ['product', 'id'];
      const response = await LicenseAPI.getList({
        ...params,
        fields,
      });
      response.items = response.items.map(({ product, id }) => ({
        name: product,
        id,
      }));
      return response;
    },
  },
};
</script>

<style scoped></style>
