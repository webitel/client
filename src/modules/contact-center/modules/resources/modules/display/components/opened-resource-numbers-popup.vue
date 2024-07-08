<template>
  <wt-popup
    v-bind="$attrs"
    :shown="!!numberId"
    size="sm"
    overflow
    @close="close"
  >
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form>
        <wt-input
          :label="$tc('objects.ccenter.res.numbers', 1)"
          :v="v$.itemInstance.display"
          :value="itemInstance.display"
          required
          @input="setItemProp({ prop: 'display', value: $event })"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="disabledSave"
        @click="save"
      >
        {{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
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
    v$: useVuelidate(),
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
      return action + ' ' + this.$tc('objects.ccenter.res.numbers', 1).toLowerCase();
    },
    numberId() {
      return this.$route.params.numberId;
    },
  },
  watch: {
    numberId: {
      immediate: true,
      handler(id) {
       if (id === 'new') this.resetState()
       else {
         this.setId(id);
         this.loadItem();
       }
      },
    },
  },
};
</script>

<style scoped>

</style>
