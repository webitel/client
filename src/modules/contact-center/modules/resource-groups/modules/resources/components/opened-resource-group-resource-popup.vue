<template>
  <wt-popup v-bind="$attrs" :shown="!!resourceId" size="sm" overflow @close="close">
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form>
        <wt-select :clearable="false" :label="$t('objects.ccenter.res.res', 1)" :search-method="loadDropdownOptionsList"
          :v="v$.itemInstance.resource" :value="itemInstance.resource" required
          @input="setItemProp({ prop: 'resource', value: $event })" />
        <wt-input :label="$t('objects.ccenter.res.priority')" :value="itemInstance.priority" type="number"
          @input="setItemProp({ prop: 'priority', value: +$event })" />
        <wt-select :clearable="true" :label="$t('objects.ccenter.res.reserveResource', 1)"
          :search-method="loadDropdownOptionsList" :v="v$.itemInstance.reserveResource"
          :value="itemInstance.reserveResource" @input="setItemProp({ prop: 'reserveResource', value: $event })" />
      </form>
    </template>
    <template #actions>
      <wt-button :disabled="disabledSave" @click="save">
        {{ $t('objects.add') }}
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
import ResourcesAPI from '../../../../resources/api/resources';

export default {
  name: 'OpenedResNumbersPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    // Reasons for use $stopPropagation
    // https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
    v$: useVuelidate({ $stopPropagation: true }),
  }),
  data: () => ({
    namespace: 'ccenter/resGroups/res',
  }),
  validations: {
    itemInstance: {
      resource: { required },
    },
  },
  computed: {
    popupTitle() {
      const action = this.id ? this.$t('reusable.edit') : this.$t('reusable.add');
      return action + ' ' + this.$t('objects.ccenter.res.res', 1).toLowerCase();
    },
    resourceId() {
      return this.$route.params.resourceId;
    },
  },
  watch: {
    resourceId: {
      handler(id) {
        if (id === 'new') this.resetState()
        else {
          this.setId(id);
          this.loadItem();
        }
      }, immediate: true,
    }
  },

  methods: {
    loadDropdownOptionsList(params) {
      return ResourcesAPI.getLookup(params);
    },
  }
};
</script>

<style scoped></style>
