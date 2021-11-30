<template>
  <wt-page-wrapper :actions-panel="false" class="license">
    <template slot="header">
      <object-header :hide-primary="true">
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>
    <template slot="main">
      <wt-tabs
        v-model="currentTab"
        :tabs="tabs"
      ></wt-tabs>
      <component :is="currentTab.value"></component>
    </template>
  </wt-page-wrapper>
</template>

<script>
import HeadlineNav from '../../../../../app/components/utils/headline-nav/headline-nav.vue';
import ObjectHeader from '../../../../../app/components/utils/object-utils/the-object-header.vue';
import AllLicenses from './all-licenses/all-licenses.vue';
import LicensesByUser from '../modules/users/components/licenses-by-user.vue';

export default {
  name: 'the-license',
  components: {
    AllLicenses,
    LicensesByUser,
    ObjectHeader,
    HeadlineNav,
  },
  data: () => ({
    currentTab: { value: 'all-licenses' },
  }),
  computed: {
    path() {
      return [
        { name: this.$t('objects.directory.directory') },
        { name: this.$tc('objects.directory.license.license', 2), route: '/directory/license' },
      ];
    },
    tabs() {
      const allLicenses = {
        value: 'all-licenses',
        text: 'Alllll licenses',
      };
      const licensesByUser = {
        value: 'licenses-by-user',
        text: 'LICENSES BY USER',
      };
      return [allLicenses, licensesByUser];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
