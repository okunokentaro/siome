import angular from 'angular';
import Firebase from 'firebase';
import {appName, firebaseUrl} from '../constants';

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
    this.fireArr = $firebaseArray(fireArrayRef)
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
      uuid: this.uuid()
    };

    this.fireArr.$add(data);
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
