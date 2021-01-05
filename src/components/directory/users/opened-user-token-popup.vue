<template>
  <wt-popup @close="close">
    <template slot="title">
      {{ $tc('objects.directory.users.token', 2) }}
    </template>
    <template slot="main">
      <wt-input
          :value="usage"
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
import { mapActions, mapState } from 'vuex';

export default {
  name: 'opened-user-tokens-popup',

  computed: {
    ...mapState('directory/users/tokens', {
      usage: (state) => state.itemInstance.usage,
    }),
  },

  methods: {
    async save() {
      try {
        await this.addToken(this.usage);
        this.close();
      } catch {
      }
    },

    close() {
      this.$emit('close');
    },

    ...mapActions('directory/users/tokens', {
      addToken: 'ADD_TOKEN',
      setItemProp: 'SET_ITEM_PROPERTY',
    }),
  },
};
</script>

<style lang="scss" scoped>
.wt-popup ::v-deep .wt-popup__popup {
  min-width: 480px;
}
</style>
