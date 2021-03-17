export default class BaseStoreModule {
  getters;

  state;

  actions;

  mutations;

  attachAPIModule(APIModule) {
    this._APIModule = APIModule;
    return this;
  }

  generateAPIActions() {
    if (!this._APIModule) throw new ReferenceError('attach API module first!');
    this.actions.GET_LIST = (context) => this._APIModule.getList(context.state);
    this.actions.GET_ITEM = (context) => this._APIModule.get(context.state);
    this.actions.POST_ITEM = (context) => this._APIModule.add(context.state);
    this.actions.PATCH_ITEM = (context, { id, changes }) => (
      this._APIModule.patch({ ...context.state, id, changes })
    );
    this.actions.UPD_ITEM = (context) => this._APIModule.update(context.state);
    this.actions.DELETE_ITEM = (context, id) => this._APIModule.delete({ ...context.state, id });
    return this;
  }

  setChildModules(modules) {
    this.modules = modules;
    return this;
  }

  getModule({ getters = {}, actions = {}, mutations = {} } = {}) {
    return {
      namespaced: true,
      state: this.state,
      getters: { ...this.getters, ...getters },
      actions: { ...this.actions, ...actions },
      mutations: { ...this.mutations, ...mutations },
      modules: this.modules,
    };
  }
}
