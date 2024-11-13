<template>
  <wt-navigation-menu
    :nav="nav"
    :icons="icons" />
</template>

<script>
import navMixin from '../../../app/mixins/navMixin';
import directoryIcon from '../../../app/assets/icons/sprite/adm-directory.svg';
import integrationsIcon from '../../../app/assets/icons/sprite/adm-integrations.svg';
import lookupsIcon from '../../../app/assets/icons/sprite/adm-lookups.svg';
import routingIcon from '../../../app/assets/icons/sprite/adm-routing.svg';
import systemIcon from '../../../app/assets/icons/sprite/adm-system.svg';
import permissionsIcon from '../../../app/assets/icons/sprite/adm-permissions.svg';
import contactCenterIcon from '../../../app/assets/icons/sprite/adm-contact-center.svg';

const ICONS = [directoryIcon, integrationsIcon, lookupsIcon, routingIcon, systemIcon, permissionsIcon, contactCenterIcon];

export default {
  name: 'TheStartPage',
  mixins: [navMixin],
  data() {
    return {
      icons: ICONS,
    };
  },
}
</script>

<style lang="scss" scoped>
</style>
