import angular from 'angular';
import Firebase from 'firebase';
import {appName, firebaseUrl} from '../constants';

// Flux
import EventEmitter from '../vendor/mini-flux/EventEmitter';
import AppAction from '../app-action';
import SquidStore from '../squid-store';
const dispatcher = new EventEmitter();
const action = new AppAction(dispatcher);
const store = new SquidStore(dispatcher);

// Constants
const directiveName = 'ikaApp';

class IkaAppController {
  constructor($firebaseArray, Auth) {
    IkaAppController.$inject = ['$firebaseArray', 'Auth'];
    this.Auth = Auth;
    this.Auth.$waitForAuth().then((res) => {
      this.authStatus = res;
    });

    this.title = 'siome';
    this.description = '"siome"はTwitterアカウントとイカID（ニンテンドーネットワークID）が潮目に集まるようにまとめて登録・検索ができるサービスです！イカ、よろしく〜〜〜';

    const fireArrayRef = new Firebase(`${firebaseUrl}/arr`);
    this.hordeOfSquid = $firebaseArray(fireArrayRef);
  }

  /**
   * @returns {void}
   */
  login() {
    this.Auth.$authWithOAuthPopup('github', (err, data) => {
      if (err) { console.error('Login Failed!', err); }
      console.info('Authenticated successfully with payload:', data);
    });
  }

  /**
   * @returns {void}
   */
  logout() {
    this.Auth.$unauth();
  }

  /**
   * @returns {void}
   */
  save() {
    const data = {
      twitterId: this.post.twitterId,
      ikaId: this.post.ikaId,
      dateAdded: Date.now(),
      uuid: this.uuid(),
      siomeAuthId: this.authStatus.uid
    };

    action.addSquid(data);
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

const ddo = () => {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: './app/directives/ika-app.html',
    controller: IkaAppController,
    controllerAs: directiveName
  };
};

angular.module(appName).directive(directiveName, ddo);
