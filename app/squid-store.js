import {firebaseUrl} from './constants';
import EventEmitter from "./vendor/mini-flux/EventEmitter"

const CHANGE = 'CHANGE';

class SquadStore extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.ref = new Firebase(`${firebaseUrl}/squid`);
    this.registered = false;

    dispatcher.on('addSquid',    this.onAddSquid.bind(this));
    dispatcher.on('updateSquid', this.onUpdateSquid.bind(this));
    dispatcher.on('removeSquid', this.onRemoveSquid.bind(this));
    dispatcher.on('load',        this.onLoad.bind(this));
  }

  /**
   * @private
   * @param {string} siomeAuthId
   * @returns {void}
   */
  onLoad(siomeAuthId) {
    this.ref.orderByChild('siomeAuthId').on('child_added', (snapshot) => {
      if (snapshot.val().siomeAuthId === siomeAuthId) { this.registered = true; }
      this.emit(CHANGE);
    });
  }

  /**
   * @private
   * @param {{twitterId: string, ikaId: string, siomeAuthId: string}} post
   * @returns {void}
   */
  onAddSquid(post) {
    if (this.disposer) {
      // require off because it would rerun the remove handling
      this.ref.off('child_added', this.disposer);
    }

    if (!this.registered) {
      const now = Date.now();
      const data = {
        twitterId: post.twitterId,
        ikaId: post.ikaId,
        siomeAuthId: post.siomeAuthId,
        dateAdded: now,
        dateModified: now
      };
      this.ref.push(data);
    }

    this.registered = true;
    this.emit(CHANGE);
  }

  /**
   * @private
   * @param {{twitterId: string, ikaId: string, siomeAuthId: string}} post
   * @returns {void}
   */
  onUpdateSquid(post) {
    this.ref.orderByChild('siomeAuthId').equalTo(post.siomeAuthId).on('child_added', (snapshot) => {
      post.dateModified = Date.now();
      snapshot.ref().update(post);
      this.emit(CHANGE);
    });
  }

  /**
   * @private
   * @param {string} siomeAuthId
   * @returns {void}
   */
  onRemoveSquid(siomeAuthId) {
    this.disposer = this.ref.orderByChild('siomeAuthId').equalTo(siomeAuthId).on('child_added', (snapshot) => {
      snapshot.ref().remove();
      this.registered = false;
      this.emit(CHANGE);
    });
  }
}

export default SquadStore;
