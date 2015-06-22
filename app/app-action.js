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
   * @param {*} data
   * @returns {void}
   */
  updateSquid(data) {
    this.dispatcher.emit('updateSquid', data);
  }

  /**
   * @param {string} siomeAuthId
   * @returns {void}
   */
  removeSquid(siomeAuthId) {
    this.dispatcher.emit('removeSquid', siomeAuthId);
  }

  /**
   * @param {string} siomeAuthId
   * @returns {void}
   */
  load(siomeAuthId) {
    this.dispatcher.emit('load', siomeAuthId);
  }
}
