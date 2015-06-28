export default class AppAction {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  /**
   * @returns {void}
   */
  applicationReady() {
    this.dispatcher.emit('applicationReady');
  }

  /**
   * @returns {void}
   */
  initAuthStatus() { this.dispatcher.emit('initAuthStatus'); }

  /**
   * @returns {void}
   */
  login() { this.dispatcher.emit('login'); }

  /**
   * @returns {void}
   */
  logout() { this.dispatcher.emit('logout'); }

  /**
   * @param {*} data
   * @returns {void}
   */
  addSquid(data) { this.dispatcher.emit('addSquid', data); }

  /**
   * @param {*} data
   * @returns {void}
   */
  updateSquid(data) { this.dispatcher.emit('updateSquid', data); }

  /**
   * @param {string} siomeUid
   * @returns {void}
   */
  removeSquid(siomeUid) { this.dispatcher.emit('removeSquid', siomeUid); }

  /**
   * @param {string} siomeUid
   * @returns {void}
   */
  load(siomeUid) { this.dispatcher.emit('load', siomeUid); }

  /**
   * @param {number} n
   * @returns {void}
   */
  setColor(n) { this.dispatcher.emit('setColor', n); }
}
