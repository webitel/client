<template>
  <wt-page-wrapper :actions-panel="false" class="license">
    <template slot="header">
      <object-header :hide-primary="true">
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>
    <template slot="main">
      <section class="main-section__wrapper">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component :is="currentTab.value"></component>
      </section>
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
        text: this.$t('objects.directory.license.allLicenses'),
      };
      const licensesByUser = {
        value: 'licenses-by-user',
        text: this.$tc('objects.directory.users.users', 2),
      };
      return [allLicenses, licensesByUser];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
