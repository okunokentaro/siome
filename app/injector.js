export default class Injector {
  static AppAction() {
    return require('./app-action');
  }

  static angular() {
    return require('angular');
  }

  static AuthStore() {
    return require('./auth-store');
  }
}
