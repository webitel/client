const filterComponentMixinMock = () => ({
  computed: {
    filterSchema: () => ({
      locale: {},
    }),
  },
  mocks: {
    $route: {
      query: {},
    },
  },
});

export default filterComponentMixinMock;
