import Firebase from 'firebase';
import angular from 'angular';
import {firebaseUrl} from './constants';
import EventEmitter from './vendor/mini-flux/EventEmitter';

const CHANGE = 'CHANGE';

const location = window.location;

class AuthStore extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.ref = new Firebase(`${firebaseUrl}/squid`);

    /* eslint-disable no-multi-spaces */
    dispatcher.on('applicationReady', this.onApplicationReady.bind(this));
    dispatcher.on('initAuthStatus',   this.onInitAuthStatus  .bind(this));
    dispatcher.on('login',            this.onLogin           .bind(this));
    dispatcher.on('logout',           this.onLogout          .bind(this));
    /* eslint-enable no-multi-spaces */
  }

  /**
   * @private
   * @returns {void}
   */
  initAuth() {
    const $firebaseAuth = ((ng) => {
      const injector = ng.element(document.querySelectorAll('.ng-scope')[0]).injector();
      return injector.get('$firebaseAuth');
    })(angular);

    this.Auth = $firebaseAuth(this.ref);
  }

  /**
   * @private
   * @returns {void}
   */
  onApplicationReady() {
    this.initAuth();
  }

  /**
   * @private
   * @returns {void}
   */
  onInitAuthStatus() {
    this.waitForAuthPromise = this.Auth.$waitForAuth().then((res) => {
      this.status = res;
      this.emit(CHANGE);
    });
  }


  /**
   * @private
   * @returns {void}
   */
  onLogin() {
    this.Auth.$authWithOAuthPopup('twitter').then((data) => {
      console.info('Authenticated successfully with payload:', data);
      location.reload();
    }).catch((err) => {
      console.error('Login Failed!', err);
      this.emit(CHANGE);
    });
  }

  /**
   * @private
   * @returns {void}
   */
  onLogout() {
    this.Auth.$unauth();
    location.reload();
  }
}

export default AuthStore;
