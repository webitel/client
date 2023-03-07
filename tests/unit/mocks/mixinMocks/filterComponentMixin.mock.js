const filterComponentMixinMock = () => ({
  computed: {
    filterSchema: () => ({
      locale: {},
    }),
  },
  global: {
    mocks: {
      $route: {
        query: {},
      },
    },
  },
});

export default filterComponentMixinMock;
