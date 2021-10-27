<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.directory.license.license', 1) }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-select
        :value="itemInstance.license"
        :label="$tc('objects.directory.license.license', 1)"
        :search="loadDropdownOptionsList"
        :internal-search="false"
        :close-on-select="false"
        :disabled="disableUserInput"
        multiple
        @input="setItemProp({ prop: 'license', value: $event })"
      ></wt-select>
    </form>
  </section>
</template>

<script>
import { getLicenseList } from '../../license/api/license';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-user-license',
  mixins: [openedTabComponentMixin],
  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getLicenseList({ search });
      return response.list.map((item) => ({
        name: item.product,
        id: item.id,
      }));
    },
  },
};
</script>

<style scoped>

</style>
