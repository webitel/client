<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $t('objects.lookups.blacklist.newNumber') }}
    </template>
    <template v-slot:main>
      <form>
        <wt-input
          :value="itemInstance.number"
          :v="$v.itemInstance.number"
          :label="$tc('objects.lookups.blacklist.number', 1)"
          required
          @input="setItemProp({ prop: 'number', value: $event })"
        ></wt-input>
        <wt-textarea
          :value="itemInstance.description"
          :label="$t('objects.description')"
          @input="setItemProp({ prop: 'description', value: $event })"
        ></wt-textarea>
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
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-blacklist-number-popup',
  mixins: [nestedObjectMixin],
  data: () => ({
    namespace: 'lookups/blacklists/numbers',
  }),

  validations: {
    itemInstance: {
      number: { required },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
