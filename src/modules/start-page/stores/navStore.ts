import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import NavigationPages from '../../../app/router/_internals/NavigationPages.lookup';
import { useUserinfoStore } from '../../userinfo/stores/userinfoStore';

type NavItem = {
  value: string;
  locale: string;
  route: string;
  name: string;
  subNav?: Array<{
    value: string;
    locale: string;
    route: string;
    name: string;
  }>;
};

export const useNavStore = defineStore('nav', () => {
  const { t } = useI18n();
  const router = useRouter();

  const { routeAccessGuard } = useUserinfoStore();

  const isInitialized = ref(false);

  const nav = computed(() => {
    const navWithLocale = (navItem: typeof NavigationPages[0]): NavItem => ({
      ...navItem,
      name: t(navItem.locale),
    });

    const navWithSubNavLocale = (
      navItem: typeof NavigationPages[0],
    ): NavItem => {
      const baseNav = navWithLocale(navItem);
      if (navItem.subNav) {
        return {
          ...baseNav,
          subNav: navItem.subNav.map((subNav) => ({
            ...subNav,
            name: t(subNav.locale),
          })),
        };
      }
      return baseNav;
    };

    const resolveRoutePath = (routePath: string, parentPath?: string): string => {
      if (parentPath) {
        return `${parentPath}/${routePath}`;
      }
      return routePath;
    };

    // Filter navigation items based on route access
    const filteredNav = NavigationPages.filter((navItem) => {
      // Check if main route has access
      const mainRoutePath = resolveRoutePath(navItem.route);
      try {
        const mainRoute = router.resolve({ path: mainRoutePath });
        const hasMainRouteAccess = routeAccessGuard(mainRoute) === true;

        if (!hasMainRouteAccess) {
          return false;
        }

        // If has subNav, check if at least one subNav item has access
        if (navItem.subNav) {
          const accessibleSubNav = navItem.subNav.filter((subNav) => {
            const subRoutePath = resolveRoutePath(subNav.route, navItem.route);
            try {
              const subRoute = router.resolve({ path: subRoutePath });
              return routeAccessGuard(subRoute) === true;
            } catch {
              return false;
            }
          });
          return accessibleSubNav.length > 0;
        }

        return true;
      } catch {
        return false;
      }
    });

    // Map filtered nav with localized names and filter subNav
    return filteredNav.map((navItem) => {
      const localizedNav = navWithSubNavLocale(navItem);
      if (localizedNav.subNav) {
        const accessibleSubNav = localizedNav.subNav.filter((subNav) => {
          const subRoutePath = resolveRoutePath(subNav.route, navItem.route);
          try {
            const subRoute = router.resolve({ path: subRoutePath });
            return routeAccessGuard(subRoute) === true;
          } catch {
            return false;
          }
        });
        return {
          ...localizedNav,
          subNav: accessibleSubNav,
        };
      }
      return localizedNav;
    });
  });

  const initializeNav = async () => {
    if (isInitialized.value) {
      return;
    }
    isInitialized.value = true;
  };

  return { nav, initializeNav };
});
