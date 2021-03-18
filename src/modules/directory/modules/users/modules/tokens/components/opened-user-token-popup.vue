<template>
  <wt-popup min-width="480" @close="close">
    <template slot="title">
      {{ $tc('objects.directory.users.token', 2) }}
    </template>
    <template slot="main">
      <wt-input
        :value="itemInstance.usage"
        :label="$t('objects.name')"
        @input="setItemProp({ prop: 'usage', value: $event })"
      ></wt-input>
    </template>
    <template slot="actions">
      <wt-button @click="save">
        {{ $t('objects.add') }}
      </wt-button>
      <wt-button color="secondary" @click="close">
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { mapActions } from 'vuex';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-user-tokens-popup',
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
      } catch {
      }
    },
    resetState() {},
  },
};
</script>

<style lang="scss" scoped>

</style>
