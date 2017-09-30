export default class UIRouterReduxStoreProvider {
  reduxStore;

  setStore(store) {
    this.reduxStore = store;
  }

  $get() {
    return this.reduxStore;
  };
}
