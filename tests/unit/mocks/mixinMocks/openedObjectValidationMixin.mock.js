const v = () => ({
  itemInstance: {
    $touch: vi.fn(),
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
