<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.directory.license.license', 1) }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-select
        :value="itemInstance.license"
        :label="$tc('objects.directory.license.license', 1)"
        :search-method="loadDropdownOptionsList"
        :close-on-select="false"
        :disabled="disableUserInput"
        multiple
        @input="setItemProp({ prop: 'license', value: $event })"
      ></wt-select>
    </div>
  </section>
</template>

<script>
import LicenseAPI from '../../license/api/license';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-user-license',
  mixins: [openedTabComponentMixin],
  methods: {
    async loadDropdownOptionsList(params) {
      const fields = ['product', 'id'];
      const response = await LicenseAPI.getList({ ...params, fields });
      response.items = response.items.map(({ product, id }) => ({ name: product, id }));
      return response;
    },
  },
};
</script>

<style scoped>

</style>
