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
          v-model="currentTab"
          :tabs="tabs"
        />
        <component :is="currentTab.value" />
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import LicensesByUser from "../modules/users/components/licenses-by-user.vue";
import AllLicenses from "./all-licenses/all-licenses.vue";

export default {
  name: "TheLicense",
  components: {
    AllLicenses,
    LicensesByUser,
  },
  data: () => ({
    currentTab: { value: "all-licenses" },
  }),
  computed: {
    path() {
      return [
        {
          name: this.$t("objects.directory.directory"),
        },
        {
          name: this.$tc("objects.directory.license.license", 2),
          route: "/directory/license",
        },
      ];
    },
    tabs() {
      const allLicenses = {
        value: "all-licenses",
        text: this.$t("objects.directory.license.allLicenses"),
      };
      const licensesByUser = {
        value: "licenses-by-user",
        text: this.$tc("objects.directory.users.users", 2),
      };
      return [allLicenses, licensesByUser];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
