import angular from 'angular';
import {appName} from '../constants';

const directiveName = 'ikaApp';

class IkaAppController {
  constructor(Auth) {
    IkaAppController.$inject = ['Auth'];
    this.Auth = Auth;

    this.title = 'siome';
    this.description = '"siome"はTwitterアカウントとイカID（ニンテンドーネットワークID）が潮目に集まるようにまとめて登録・検索ができるサービスです！イカ、よろしく〜〜〜';
  }

  /**
   * @returns {void}
   */
  login() {
    this.Auth.$authWithOAuthPopup('twitter', (err, data) => {
      if (err) { console.error('Login Failed!', err); }
      console.log('Authenticated successfully with payload:', data);
    });
  }

  /**
   * @returns {void}
   */
  logout() {
    this.Auth.$unauth();
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
