import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("userinfo", {
      accessibleNav: "ACCESSIBLE_NAV",
    }),
    nav() {
      const navWithLocale = (nav) => ({
        ...nav,
        name: this.$t(nav.locale),
      });
      return this.accessibleNav.map((nav) => {
        if (nav.subNav) {
          return {
            ...navWithLocale(nav),
            subNav: nav.subNav.map((nav) => navWithLocale(nav)),
          };
        }
        return navWithLocale(nav);
      });
    },
  },
};
