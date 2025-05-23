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
      <form class="opened-blacklist-number-popup__wrapper">
        <wt-input
          :label="$tc('objects.lookups.blacklist.number', 1)"
          :v="v$.itemInstance.number"
          :value="itemInstance.number"
          required
          @input="setItemProp({ prop: 'number', value: $event })"
        />
        <wt-switcher
          v-model="showExpireDate"
          :label="$t('objects.lookups.blacklist.temporary')"
        />
        <wt-datepicker
          v-if="showExpireDate"
          :label="$t('objects.lookups.blacklist.expireAt')"
          :value="itemInstance.expireAt"
          mode="datetime"
          @input="setItemProp({ prop: 'expireAt', value: $event })"
        />
        <wt-textarea
          :label="$t('objects.description')"
          :value="itemInstance.description"
          @input="setItemProp({ prop: 'description', value: $event })"
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
  name: 'OpenedBlacklistNumberPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    // Reasons for use $stopPropagation
    // https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
    v$: useVuelidate({$stopPropagation: true}),
  }),
  data: () => ({
    namespace: 'lookups/blacklists/numbers',
    showExpireDate: false,
  }),
  validations: {
    itemInstance: {
      number: { required },
    },
  },
  computed: {
    popupTitle() {
      const action = this.id ? this.$t('reusable.edit') : this.$t('reusable.add');
      return action + ' ' + this.$tc('objects.ccenter.res.numbers', 1).toLowerCase();
    },
    numberId() {
      return this.$route.params.numberId;
    }
  },
  watch: {
    showExpireDate() {
      if (this.itemInstance.expireAt && this.showExpireDate) return;
      this.setItemProp({
        prop: 'expireAt',
        value: this.showExpireDate ? Date.now() : 0,
      });
    },
    'itemInstance.id': {
      handler() {
        if (this.itemInstance.expireAt) this.showExpireDate = true;
      },
    },
    numberId: {
     async handler(id) {
       this.handleIdChange(id);
     }, immediate: true,
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
