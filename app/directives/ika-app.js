import angular from 'angular';
import {appName} from '../constants';

// Flux
import EventEmitter from '../vendor/mini-flux/EventEmitter';

import AppAction from '../app-action';
const AuthStore = require('../auth-store');
import SquidStore from '../squid-store';

const dispatcher = new EventEmitter();
export const action = new AppAction(dispatcher);
const authStore = new AuthStore(dispatcher);
const squidStore = new SquidStore(dispatcher);

// Constants
const directiveName = 'ikaApp';

import {createFirebaseArray, extractIkaId, extractColorNumber} from './ika-app-func';

class IkaAppController {
  constructor() {
    squidStore.on('CHANGE', this.onSquidStoreChange.bind(this));
    authStore .on('CHANGE', this.onAuthStoreChange .bind(this));

    action.applicationReady();
    action.initAuthStatus();
  }

  /**
   * @private
   * @returns {void}
   */
  onSquidStoreChange() {
    this.colorNumber = extractColorNumber(squidStore);
    this.hordeOfSquid = createFirebaseArray(angular, squidStore.ref);
    this.ikaId = extractIkaId(squidStore);
    this.registered = squidStore.registered;
  }
  /**
   * @private
   * @returns {void}
   */
  onAuthStoreChange() {
    this.authStatus = authStore.status;
    authStore.waitForAuthPromise.then(() => {
      const uid = this.authStatus ? this.authStatus.uid : void 0;
      action.load(uid);
    });
  }
}

function ddo() {
  return {
    restrict:     'E',
    scope:        {},
    templateUrl:  './app/directives/ika-app.html',
    controller:   IkaAppController,
    controllerAs: directiveName
  };
}

angular.module(appName).directive(directiveName, ddo);
