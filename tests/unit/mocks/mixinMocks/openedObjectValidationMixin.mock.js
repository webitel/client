const v = () => ({
  itemInstance: {
    $touch: jest.fn(),
  },
});

const openedObjectValidationMixinMock = () => ({
  props: { v: v() },
  global: {
    mocks: {
      v$: v(),
    },
  },
});

export default openedObjectValidationMixinMock;
