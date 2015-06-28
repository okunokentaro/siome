import Firebase from 'firebase';
import {firebaseUrl} from './constants';
import EventEmitter from './vendor/mini-flux/EventEmitter';

const CHANGE = 'CHANGE';

class SquidStore extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.ref = new Firebase(`${firebaseUrl}/squids`);

    /* eslint-disable no-multi-spaces */
    dispatcher.on('applicationReady', this.onApplicationReady.bind(this));
    dispatcher.on('addSquid',         this.onAddSquid        .bind(this));
    dispatcher.on('updateSquid',      this.onUpdateSquid     .bind(this));
    dispatcher.on('removeSquid',      this.onRemoveSquid     .bind(this));
    dispatcher.on('load',             this.onLoad            .bind(this));
    dispatcher.on('setColor',         this.onSetColor        .bind(this));
    /* eslint-enable no-multi-spaces */
  }

  /**
   * @private
   * @returns {void}
   */
  onApplicationReady() {
    this.registered = false;
    this.selfData = {
      ikaId:       '',
      colorNumber: void 0
    };

    this.emit(CHANGE);
  }

  /**
   * @private
   * @param {string} siomeUid
   * @returns {void}
   */
  onLoad(siomeUid) {
    this.ref
      .orderByChild('siomeUid')
      .on('child_added', (snapshot) => {
        if (snapshot.val().siomeUid === siomeUid) {
          this.registered = true;
          this.selfData = {
            ikaId:       snapshot.val().ikaId,
            colorNumber: snapshot.val().colorNumber
          };
        }
        this.emit(CHANGE);
      });
  }

  /**
   * @private
   * @param {{twitterId: string, ikaId: string, siomeUid: string}} post
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
        avatarUrl:    post.avatarUrl,
        colorNumber:  post.colorNumber,
        ikaId:        post.ikaId,
        siomeUid:     post.siomeUid,
        twitterId:    post.twitterId,
        dateAdded:    now,
        dateModified: now,
        order:        now * -1 // reverse sort order
      };
      this.ref.child(post.siomeUid).set(data, (err) => {
        if (err) {
          console.error(err);
          this.registered = false;
          this.emit(CHANGE);
          return;
        }
        this.registered = true;
        this.emit(CHANGE);
      });
    }
  }

  /**
   * @private
   * @param {{twitterId: string, ikaId: string, siomeUid: string}} post
   * @returns {void}
   */
  onUpdateSquid(post) {
    this.ref.child(post.siomeUid).set(post);
  }

  /**
   * @private
   * @param {string} siomeUid
   * @returns {void}
   */
  onRemoveSquid(siomeUid) {
    this.disposer = this.ref
      .orderByChild('siomeUid')
      .equalTo(siomeUid)
      .on('child_added', (snapshot) => {
        snapshot.ref().remove();
        this.registered = false;
        this.emit(CHANGE);
      });
  }

  /**
   * @private
   * @param {number} colorNumber
   * @returns {void}
   */
  onSetColor(colorNumber) {
    this.colorNumber = colorNumber;
    this.emit(CHANGE);
  }
}

export default SquidStore;
