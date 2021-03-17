<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.res.numbers', 1) }}
    </template>
    <template slot="main">
      <form>
        <wt-input
          :value="display"
          :v="$v.itemInstance.display"
          :label="$tc('objects.ccenter.res.numbers', 1)"
          required
          @input="setItemProp({ prop: 'display', value: $event })"
        ></wt-input>
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
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-res-numbers-popup',
  mixins: [nestedObjectMixin],
  data: () => ({
    namespace: 'ccenter/res/numbers',
  }),

  validations: {
    itemInstance: {
      display: { required },
    },
  },

  computed: {
    ...mapState('ccenter/res/numbers', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
      display: (state) => state.itemInstance.display,
    }),
  },
};
</script>

<style scoped>

</style>
