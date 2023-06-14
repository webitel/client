const openedObjectAccessControlMixinMock = () => ({
  global: {
    mocks: {
      $route: {
        name: '',
        params: { id: 1 },
        query: {},
      },
    },
  },
});

export default openedObjectAccessControlMixinMock;
