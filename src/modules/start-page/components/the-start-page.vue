<template>
  <wt-navigation-menu
    :nav="nav"
    :icons="icons" />
</template>

<script>
import navMixin from '../../../app/mixins/navMixin';

const icons = ['adm-directory', 'adm-integrations', 'adm-lookups', 'adm-routing', 'adm-system', 'adm-permissions', 'adm-contact-center'];

export default {
  name: 'TheStartPage',
  mixins: [navMixin],
  data() {
    return {
      icons,
    };
  },
}
</script>

<style lang="scss" scoped>
</style>
