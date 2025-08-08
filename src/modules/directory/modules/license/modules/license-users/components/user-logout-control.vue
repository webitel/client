<template>
  <wt-switcher
    :disabled="disableControl"
    :model-value="!!item.sessions"
    @update:model-value="logoutUser"
  />
</template>

<script>
import { mapState } from 'vuex';

import accessControlMixin from '../../../../../../../app/mixins/baseMixins/accessControlMixin/accessControlMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'UserLogoutControl',
  mixins: [accessControlMixin],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('userinfo', {
      domain: (state) => state.domain,
    }),
    disableControl() {
      return !this.item.sessions || !this.hasEditAccess || this.item.domain?.name !== this.domain;
    },
    hasEditAccess() {
      return this.$store.getters['userinfo/HAS_EDIT_ACCESS']({
        route: {
          name: `${RouteNames.USERS}-edit`,
        },
      });
    },
  },
  methods: {
    logoutUser() {
      this.$emit('logout', this.item.user);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
