<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.res.res', 1) }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="itemInstance.resource"
          :v="$v.itemInstance.resource"
          :label="$tc('objects.ccenter.res.res', 1)"
          :search="loadDropdownOptionsList"
          :internal-search="false"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'resource', value: $event })"
        ></wt-select>

        <wt-input
          :value="itemInstance.priority"
          :label="$t('objects.ccenter.res.priority')"
          type="number"
          @input="setItemProp({ prop: 'priority', value: +$event })"
        ></wt-input>

        <wt-select
          :value="itemInstance.reserveResource"
          :v="$v.itemInstance.resource"
          :label="$tc('objects.ccenter.res.res', 1)"
          :search="loadDropdownOptionsList"
          :internal-search="false"
          :clearable="true"
          @input="setItemProp({ prop: 'reserveResource', value: $event })"
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
import { getResourceList } from '../../../../resources/api/resources';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

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

  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getResourceList({ search });
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
