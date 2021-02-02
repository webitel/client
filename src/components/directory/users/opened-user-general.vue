<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
          :value="name"
          :label="$t('objects.name')"
          :disabled="disableUserInput"
          @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
          :value="username"
          :v="v.itemInstance.username"
          :label="$t('objects.directory.users.login')"
          :disabled="disableUserInput"
          required
          @input="setItemProp({ prop: 'username', value: $event })"
      ></wt-input>

      <password-input
          :value="password"
          :v="v.itemInstance.password"
          :disabled="disableUserInput"
          required
          @input="setItemProp({ prop: 'password', value: $event })"
      ></password-input>

      <wt-input
          :value="extension"
          :label="$t('objects.directory.users.extensions')"
          :disabled="disableUserInput"
          @input="setItemProp({ prop: 'extension', value: $event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PasswordInput from '../../utils/generate-password-input.vue';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-user-general',
  mixins: [openedTabComponentMixin],
  components: { PasswordInput },

  computed: {
    ...mapState('directory/users', {
      id: (state) => state.itemId,
      name: (state) => state.itemInstance.name,
      username: (state) => state.itemInstance.username,
      password: (state) => state.itemInstance.password,
      extension: (state) => state.itemInstance.extension,
    }),
  },

  methods: {
    ...mapActions('directory/users', {
      setItemProp: 'SET_ITEM_PROPERTY',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
