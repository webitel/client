<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="license table-page"
  >
    <template #header>
      <wt-page-header :hide-primary="true">
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <div class="table-page-tabs-group-wrapper">
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <router-view />
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import LicencesRouteNames from '../router/_internals/LicencesRouteNames.enum';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const path = computed(() => [
	{
		name: t('objects.directory.directory'),
	},
	{
		name: t('objects.directory.license.license', 2),
		route: '/directory/license',
	},
]);

const tabs = computed(() => [
	{
		value: 'all-licenses',
		text: t('objects.directory.license.allLicenses'),
		pathName: `${LicencesRouteNames.ALL}-card`,
	},
	{
		value: 'licenses-by-user',
		text: t('objects.user', 2),
		pathName: LicencesRouteNames.BY_USER,
	},
]);

const currentTab = computed(
	() =>
		tabs.value.find(({ pathName }) => pathName === route.name) || tabs.value[0],
);

const changeTab = (tab: { pathName: string }) => {
	router.push({
		name: tab.pathName,
	});
};
</script>

<style lang="scss" scoped>
.table-page-tabs-group-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
