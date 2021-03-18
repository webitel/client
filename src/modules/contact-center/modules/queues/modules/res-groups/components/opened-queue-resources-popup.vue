<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.resGroups.resGroups', 1) }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="itemInstance.resourceGroup"
          :v="$v.itemInstance.resourceGroup"
          :label="$tc('objects.ccenter.resGroups.resGroups', 1)"
          :search="loadResGroupsOptions"
          :internal-search="false"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'resourceGroup', value: $event })"
        ></wt-select>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="computeDisabled"
        @click="save"
      >{{ $t('objects.save') }}
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
import { getResGroupList } from '../../../../resource-groups/api/resourceGroups';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-queue-buckets-popup',
  mixins: [nestedObjectMixin],
  data: () => ({
    namespace: 'ccenter/queues/resGroups',
  }),

  validations: {
    itemInstance: {
      resourceGroup: { required },
    },
  },

  methods: {
    async loadResGroupsOptions(search) {
      const response = await getResGroupList({ search });
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
