const v = () => ({
  itemInstance: {
    $touch: jest.fn(),
  },
});

const openedObjectValidationMixinMock = () => ({
  propsData: { v: v() },
  mocks: {
    $v: v(),
  },
});

export default openedObjectValidationMixinMock;
