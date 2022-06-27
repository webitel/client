<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.res.numbers', 1) }}
    </template>
    <template v-slot:main>
      <form>
        <wt-input
          :value="itemInstance.display"
          :v="$v.itemInstance.display"
          :label="$tc('objects.ccenter.res.numbers', 1)"
          required
          @input="setItemProp({ prop: 'display', value: $event })"
        ></wt-input>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="disabledSave"
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
};
</script>

<style scoped>

</style>
