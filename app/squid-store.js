import EventEmitter from "./vendor/mini-flux/EventEmitter"

const CHANGE = 'CHANGE';

class SquadStore extends EventEmitter {
  constructor(dispatcher) {
    super();

    dispatcher.on('addSquid', this.onAddSquid.bind(this));
  }

  /**
   * @param {*} data
   */
  onAddSquid(data) {
    console.log(data);
    this.emit(CHANGE);
  }
}

export default SquadStore;
