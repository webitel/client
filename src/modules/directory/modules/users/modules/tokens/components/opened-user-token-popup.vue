<template>
  <wt-popup
    size="sm"
    v-bind="$attrs"
    @close="close"
  >
    <template #title>
      {{ $tc('objects.directory.users.token', 2) }}
    </template>
    <template #main>
      <form @submit.prevent="save">
        <wt-input
          :label="$t('objects.name')"
          :value="itemInstance.usage"
          @input="setItemProp({ prop: 'usage', value: $event })"
        />
      </form>
    </template>
    <template #actions>
      <wt-button @click="save">
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
import { mapActions } from 'vuex';

import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'OpenedUserTokensPopup',
  mixins: [nestedObjectMixin],
  data: () => ({
    namespace: 'directory/users/tokens',
  }),

  methods: {
    ...mapActions({
      addToken(dispatch, payload) {
        return dispatch(`${this.namespace}/ADD_TOKEN`, payload);
      },
    }),
    async save() {
      try {
        await this.addToken();
        this.$emit('token-created');
      } catch {}
    },
    resetState() {},
  },
};
</script>

<style lang="scss" scoped>

</style>
