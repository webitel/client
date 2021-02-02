<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.res.res', 1) }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="resource"
          :v="$v.itemInstance.resource"
          :label="$tc('objects.ccenter.res.res', 1)"
          :search="loadDropdownOptionsList"
          :internal-search="false"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'resource', value: $event })"
        ></wt-select>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="computeDisabled"
        @click="save"
      >{{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >{{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import { getResourceList } from '../../../api/contact-center/resources/resources';
import nestedObjectMixin from '../../../mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-res-numbers-popup',
  mixins: [nestedObjectMixin],
  data: () => ({
    namespace: 'ccenter/resGroups/res',
  }),

  validations: {
    itemInstance: {
      resource: { required },
    },
  },

  computed: {
    ...mapState('ccenter/resGroups/res', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
      resource: (state) => state.itemInstance.resource,
    }),
  },

  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getResourceList(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>

<style scoped>

</style>
