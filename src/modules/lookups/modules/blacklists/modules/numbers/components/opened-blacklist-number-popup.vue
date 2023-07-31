<template>
  <wt-popup min-width="480" overflow @close="close">
    <template v-slot:title>
      {{ $t('objects.lookups.blacklist.newNumber') }}
    </template>
    <template v-slot:main>
      <form class="opened-blacklist-number-popup__wrapper">
        <wt-input
          :value="itemInstance.number"
          :v="v$.itemInstance.number"
          :label="$tc('objects.lookups.blacklist.number', 1)"
          required
          @input="setItemProp({ prop: 'number', value: $event })"
        ></wt-input>
        <wt-switcher
          v-model="showExpireDate"
          :label="$t('objects.lookups.blacklist.temporary')"
        ></wt-switcher>
        <wt-datepicker
          v-if="showExpireDate"
          :value="itemInstance.expireAt"
          :label="$t('objects.lookups.blacklist.expireAt')"
          mode="datetime"
          @input="setItemProp({ prop: 'expireAt', value: $event })"
        ></wt-datepicker>
        <wt-textarea
          :value="itemInstance.description"
          :label="$t('objects.description')"
          @input="setItemProp({ prop: 'description', value: $event })"
        ></wt-textarea>
      </form>
    </template>
    <template v-slot:actions>
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
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-blacklist-number-popup',
  mixins: [nestedObjectMixin],
  data: () => ({
    namespace: 'lookups/blacklists/numbers',
    showExpireDate: false,
  }),

  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      number: { required },
    },
  },
  watch: {
    showExpireDate() {
      if (this.itemInstance.expireAt && this.showExpireDate) return;
      this.setItemProp({ prop: 'expireAt', value: this.showExpireDate ? Date.now() : 0 });
    },
    'itemInstance.id': {
      handler() {
        if (this.itemInstance.expireAt) this.showExpireDate = true;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.opened-blacklist-number-popup__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
