const filterComponentMixinMock = () => ({
  computed: {
    filterSchema: () => ({}),
  },
  mocks: {
    $route: {
      query: {},
    },
  },
});

export default filterComponentMixinMock;
