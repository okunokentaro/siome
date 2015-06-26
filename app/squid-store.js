import Firebase from 'firebase';
import {firebaseUrl} from './constants';
import EventEmitter from './vendor/mini-flux/EventEmitter';

const CHANGE = 'CHANGE';

class SquidStore extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.ref = new Firebase(`${firebaseUrl}/squid`);

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
   * @param {string} siomeAuthId
   * @returns {void}
   */
  onLoad(siomeAuthId) {
    this.ref
      .orderByChild('siomeAuthId')
      .on('child_added', (snapshot) => {
        if (snapshot.val().siomeAuthId === siomeAuthId) {
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
   * @param {{twitterId: string, ikaId: string, siomeAuthId: string}} post
   * @returns {void}
   */
  onAddSquid(post) {
    if (this.disposer) {
      // require off because it would rerun the remove handling
      this.ref.off('child_added', this.disposer);
    }

    let onValueDisposer = void 0;
    const checkingExists = new Promise((resolve) => {
      onValueDisposer = this.ref
        .orderByChild('siomeAuthId')
        .equalTo(post.siomeAuthId)
        .on('value', (snapshot) => {
          let alreadyExists = false;
          if (snapshot.val()) {
            console.error('Cannot added because already exists');
            alreadyExists = true;
          }
          resolve(alreadyExists);
        });
    });

    checkingExists.then((exists) => {
      if (!exists && !this.registered) {
        const now = Date.now();
        const data = {
          avatarUrl:    post.avatarUrl,
          colorNumber:  post.colorNumber,
          ikaId:        post.ikaId,
          siomeAuthId:  post.siomeAuthId,
          twitterId:    post.twitterId,
          dateAdded:    now,
          dateModified: now,
          order:        now * -1 // reverse sort order
        };
        this.ref.off('value', onValueDisposer);
        this.ref.push(data);
      }

      this.registered = true;
      this.emit(CHANGE);
    });
  }

  /**
   * @private
   * @param {{twitterId: string, ikaId: string, siomeAuthId: string}} post
   * @returns {void}
   */
  onUpdateSquid(post) {
    this.ref
      .orderByChild('siomeAuthId')
      .equalTo(post.siomeAuthId)
      .on('child_added', (snapshot) => {
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
    this.disposer = this.ref
      .orderByChild('siomeAuthId')
      .equalTo(siomeAuthId)
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
