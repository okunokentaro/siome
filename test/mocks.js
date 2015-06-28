const angularInjector = {
  get: () => {}
};

const angularElement = {
  injector: () => {}
};

const angular = {
  module: () => {
    return {
      directive: () => {}
    };
  },
  element: () => {}
};

const document = {
  querySelector: () => {}
};

function $firebaseArray() { return '$firebaseArray'; }

function SquidStore() {}
SquidStore.prototype.registered = 'registered';
SquidStore.prototype.on = () => {};


const ref = {
  orderByChild: () => {}
};

function AuthStore() {}
AuthStore.prototype.on = () => {};

function AppAction() {}
AppAction.prototype.applicationReady = () => {};
AppAction.prototype.initAuthStatus = () => {};

export default {
  $firebaseArray,
  AppAction,
  AuthStore,
  SquidStore,
  angular,
  angularElement,
  angularInjector,
  document,
  ref
};
