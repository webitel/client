const openedObjectAccessControlMixinMock = () => ({
  global: {
    mocks: {
      $route: {
        name: '',
        params: { id: 1 },
        query: {},
      },
      $store: {
        getters: {
          'userinfo/HAS_READ_ACCESS': () => true,
          'userinfo/HAS_CREATE_ACCESS': () => true,
          'userinfo/HAS_EDIT_ACCESS': () => true,
          'userinfo/HAS_DELETE_ACCESS': () => true,
        },
      },
    },
  },
});

export default openedObjectAccessControlMixinMock;
