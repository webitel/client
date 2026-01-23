<template>
  <wt-popup v-bind="$attrs" :shown="!!numberId" size="sm" overflow @close="close">
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form @submit.prevent>
        <wt-input-text
          :label="$t('objects.ccenter.res.numbers', 1)"
          :v="v$.itemInstance.display"
          :model-value="itemInstance.display"
          required
          @update:model-value="setItemProp({ prop: 'display', value: $event })"
        />
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

export default {
  name: 'OpenedResNumbersPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    // Reasons for use $stopPropagation
    // https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
    v$: useVuelidate({ $stopPropagation: true }),
  }),
  data: () => ({
    namespace: 'ccenter/res/numbers',
  }),
  validations: {
    itemInstance: {
      display: { required },
    },
  },
  computed: {
    popupTitle() {
      const action = this.id ? this.$t('reusable.edit') : this.$t('reusable.add');
      return action + ' ' + this.$t('objects.ccenter.res.numbers', 1).toLowerCase();
    },
    numberId() {
      return this.$route.params.numberId;
    },
  },
  watch: {
    numberId: {
      immediate: true,
      handler(id) {
        this.handleIdChange(id);
      },
    },
  },
};
</script>

<style scoped></style>
