import {firebaseUrl} from './constants';
import EventEmitter from "./vendor/mini-flux/EventEmitter"

const CHANGE = 'CHANGE';

class SquadStore extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.ref = new Firebase(`${firebaseUrl}/squid`);

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
    this.ref.orderByChild('siomeAuthId').equalTo(post.siomeAuthId).on('value', (snapshot) => {
      if (snapshot.val()) {
        console.error('もう登録されてっぞ!');
        // Do NOT emit change because the infinite loop occurs
        return;
      }

      const data = {
        twitterId: post.twitterId,
        ikaId: post.ikaId,
        siomeAuthId: post.siomeAuthId,
        dateAdded: Date.now()
      };

      this.ref.push(data);

      this.emit(CHANGE);
    });

  }
}

export default SquadStore;
