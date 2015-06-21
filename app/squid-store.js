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
    dispatcher.on('load',        this.onLoad.bind(this));
  }

  /**
   * @private
   * @param {string} siomeAuthId
   */
  onLoad(siomeAuthId) {
    this.ref.orderByChild('siomeAuthId').on('child_added', (snapshot) => {
      console.log(snapshot.val().siomeAuthId)
      if (snapshot.val().siomeAuthId === siomeAuthId) { this.registered = true; }
      this.emit(CHANGE);
    });
  }

  /**
   * @private
   * @param {{twitterId: string, ikaId: string, siomeAuthId: string}} post
   */
  onAddSquid(post) {
    console.log('onAddSquid');
    this.ref.orderByChild('siomeAuthId').equalTo(post.siomeAuthId).on('value', (snapshot) => {
      if (snapshot.val()) {
        console.error('もう登録されてっぞ!');
        // Do NOT emit change because the infinite loop occurs
        return;
      }

      const now = Date.now();
      const data = {
        twitterId: post.twitterId,
        ikaId: post.ikaId,
        siomeAuthId: post.siomeAuthId,
        dateAdded: now,
        dateModified: now
      };

      this.ref.push(data);

      this.emit(CHANGE);
    });
  }

  /**
   * @private
   * @param {{twitterId: string, ikaId: string, siomeAuthId: string}} post
   */
  onUpdateSquid(post) {
    console.log('onUpdateSquid');
    this.ref.orderByChild('siomeAuthId').equalTo(post.siomeAuthId).on('child_changed', (snapshot) => {
      console.log(snapshot.key());
      // if (snapshot.val()) {
      //   console.error('もう登録されてっぞ!');
      //   // Do NOT emit change because the infinite loop occurs
      //   return;
      // }
      //
      // const data = {
      //   twitterId: post.twitterId,
      //   ikaId: post.ikaId,
      //   siomeAuthId: post.siomeAuthId,
      //   dateModified: Date.now()
      // };
      //
      // this.ref.push(data);

      this.emit(CHANGE);
    });
  }
}

export default SquadStore;
