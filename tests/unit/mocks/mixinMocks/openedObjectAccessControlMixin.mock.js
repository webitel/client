const openedObjectAccessControlMixinMock = () => ({
  global: {
    mocks: {
      $route: {
        name: '',
        params: { id: 1 },
      },
    },
  },
});

export default openedObjectAccessControlMixinMock;
