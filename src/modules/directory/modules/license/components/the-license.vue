<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="license"
  >
    <template #header>
      <wt-page-header :hide-primary="true">
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <section class="main-section__wrapper">
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <component :is="currentTab.value" />
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import LicensesByUser from '../modules/users/components/licenses-by-user.vue';
import LicencesRouteNames from '../router/_internals/LicencesRouteNames.enum.js';
import AllLicenses from './all-licenses/all-licenses.vue';

export default {
  name: 'TheLicense',
  components: {
    AllLicenses,
    LicensesByUser,
  },
  computed: {
    path() {
      return [
        {
          name: this.$t('objects.directory.directory'),
        },
        {
          name: this.$tc('objects.directory.license.license', 2),
          route: '/directory/license',
        },
      ];
    },
    tabs() {
      const allLicenses = {
        value: 'all-licenses',
        text: this.$t('objects.directory.license.allLicenses'),
        pathName: `${LicencesRouteNames.ALL}-card`,
      };
      const licensesByUser = {
        value: 'licenses-by-user',
        text: this.$t('objects.user', 2),
        pathName: LicencesRouteNames.BY_USER,
      };
      return [allLicenses, licensesByUser];
    },
    currentTab() {
      return this.tabs.find(({pathName}) => this.$route.name === pathName) || this.tabs[0];
    //   undefined currentTab
    }
  },
  methods: {
    changeTab(tab) {
      this.$router.push({ name: tab.pathName });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
