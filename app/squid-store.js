import {firebaseUrl} from './constants';
import EventEmitter from "./vendor/mini-flux/EventEmitter"

const CHANGE = 'CHANGE';

class SquadStore extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.fireArrayRef = new Firebase(`${firebaseUrl}/arr`);

    dispatcher.on('addSquid', this.onAddSquid.bind(this));
    dispatcher.on('load',     this.onLoad.bind(this));
  }

  /**
   * @private
   */
  onLoad() {
    this.emit(CHANGE);
  }

  /**
   * @private
   * @param {{twitterId: string, ikaId: string, siomeAuthId: string}} post
   */
  onAddSquid(post) {
    const data = {
      twitterId: post.twitterId,
      ikaId: post.ikaId,
      siomeAuthId: post.siomeAuthId,
      dateAdded: Date.now(),
      uuid: this.uuid()
    };

    this.fireArrayRef.push(data);

    this.emit(CHANGE);
  }

  /**
   * @private
   * @returns {string}
   */
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

export default SquadStore;
