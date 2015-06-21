export default class AppAction {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  /**
   * @param {*} data
   * @returns {void}
   */
  addSquid(data) {
    this.dispatcher.emit('addSquid', data);
  }

  /**
   * @returns {void}
   */
  load() {
    this.dispatcher.emit('load');
  }
}
