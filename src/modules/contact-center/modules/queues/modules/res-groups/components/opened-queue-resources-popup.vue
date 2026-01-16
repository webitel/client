<template>
  <wt-popup v-bind="$attrs" :shown="!!resourceId" size="sm" min-width="480" overflow @close="close">
    <template #title>
      {{ $t('objects.ccenter.resGroups.resGroups', 1) }}
    </template>
    <template #main>
      <form>
        <wt-select :clearable="false" :label="$t('objects.ccenter.resGroups.resGroups', 1)"
          :search-method="loadResGroupsOptions" :v="v$.itemInstance.resourceGroup" :value="itemInstance.resourceGroup"
          required @input="setItemProp({ prop: 'resourceGroup', value: $event })" />
      </form>
    </template>
    <template #actions>
      <wt-button :disabled="disabledSave" @click="save">
        {{ $t('objects.save') }}
      </wt-button>
      <wt-button color="secondary" @click="close">
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import ResourceGroupsAPI from '../../../../resource-groups/api/resourceGroups';

export default {
  name: 'OpenedQueueBucketsPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    // Reasons for use $stopPropagation
    // https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
    v$: useVuelidate({ $stopPropagation: true }),
  }),
  data: () => ({
    namespace: 'ccenter/queues/resGroups',
  }),
  computed: {
    resourceId() {
      return this.$route.params.resourceId;
    },
  },
  validations: {
    itemInstance: {
      resourceGroup: { required },
    },
  },

  watch: {
    resourceId: {
      immediate: true,
      handler(id) {
        if (id) this.handleIdChange(id);
      },
    },
  },

  methods: {
    loadResGroupsOptions(params) {
      return ResourceGroupsAPI.getLookup(params);
    },
  },
};
</script>

<style scoped></style>
