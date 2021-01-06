<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.directory.license.license') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-select
          :value="license"
          :label="$t('objects.directory.license.license')"
          :search="loadDropdownOptionsList"
          :internal-search="false"
          :close-on-select="false"
          multiple
          @input="setItemProp({ prop: 'license', value: $event })"
      ></wt-select>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getLicenseList } from '../../../api/directory/license/license';
import openedTabComponentMixin from '../../../mixins/openedTabComponentMixin';

export default {
  name: 'opened-user-license',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('directory/users', {
      license: (state) => state.itemInstance.license,
    }),
  },

  methods: {
    ...mapActions('directory/users', {
      setItemProp: 'SET_ITEM_PROPERTY',
    }),
    async loadDropdownOptionsList(search) {
      const response = await getLicenseList(1, 10, search);
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
