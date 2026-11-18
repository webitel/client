<template>
  <wt-app-header>
    <wt-navigation-bar
      v-if="!hideNavigationBar"
      :current-app="currentApp"
      :dark-mode="darkMode"
      :logo-route="RoutePaths.StartPage"
      :nav="nav"
    />
    <wt-logo
      :dark-mode="darkMode"
      :logo-href="startPageHref"
    />
    <wt-dark-mode-switcher @changed-mode="setTheme" />
    <wt-app-navigator
      :apps="apps"
      :current-app="currentApp"
      :dark-mode="darkMode"
    />
    <wt-header-actions
      :build-info="buildInfo"
      :user="userInfo"
      @logout="logout"
      @settings="settings"
    />
  </wt-app-header>
</template>

<script
  setup
  lang="ts"
>
import {
	WtAppHeader,
	WtAppNavigator,
	WtHeaderActions,
	WtLogo,
	WtNavigationBar,
} from '@webitel/ui-sdk/components';
import { WtApplication } from '@webitel/ui-sdk/enums';
import { WtDarkModeSwitcher } from '@webitel/ui-sdk/modules/Appearance';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// [Claude] only `version`: a default import would bundle the whole package.json
import { version } from '../../../package.json' with { type: 'json' };
import { useAppearanceStore } from '../../modules/appearance/store/appearanceStore';
import { useNavStore } from '../../modules/start-page/stores/navStore';
import { useUserinfoStore } from '../../modules/userinfo/stores/userinfoStore';
import { useAvailableApps } from '../composables/useAvailableApps';
import RoutePaths from '../router/_internals/RoutePaths';

const route = useRoute();

const navStore = useNavStore();
const userInfoStore = useUserinfoStore();
const appearanceStore = useAppearanceStore();
const { darkMode } = storeToRefs(appearanceStore);
const { setTheme } = appearanceStore;
const { logoutUser: logout } = userInfoStore;
const { userInfo } = storeToRefs(userInfoStore);

const currentApp = WtApplication.Admin;

const { nav } = storeToRefs(navStore);

const hideNavigationBar = computed(() =>
	route.matched.some(({ meta }) => meta.hideNavigationBar),
);

const startPageHref = computed(() => import.meta.env.VITE_START_PAGE_URL);

const buildInfo = {
	release: version,
	build: import.meta.env.VITE_BUILD_NUMBER,
};

const apps = useAvailableApps([
	WtApplication.Admin,
	WtApplication.Supervisor,
	WtApplication.Agent,
	WtApplication.History,
	WtApplication.Audit,
	WtApplication.Crm,
	WtApplication.Wfm,
	WtApplication.Analytics,
]);

function settings() {
	const settingsUrl = import.meta.env.VITE_SETTINGS_URL;
	window.open(settingsUrl, '_blank', 'noopener,noreferrer');
}
</script>

<style scoped>
.wt-dark-mode-switcher {
  margin-right: auto;
}
</style>
