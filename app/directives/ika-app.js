import Injector from '../injector';
const angular = Injector.angular();
import {appName} from '../constants';

// Flux
import EventEmitter from '../vendor/mini-flux/EventEmitter';

const AppAction = Injector.appAction();
const SquidStore = Injector.squidStore();
const AuthStore = Injector.authStore();

const dispatcher = new EventEmitter();
export const action = new AppAction(dispatcher);
const squidStore = new SquidStore(dispatcher);
const authStore = new AuthStore(dispatcher);

// Constants
const directiveName = 'ikaApp';

export class IkaAppController {
  constructor($firebaseArray) {
    IkaAppController.$inject = ['$firebaseArray'];
    this.$firebaseArray = $firebaseArray;

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
    this.hordeOfSquid = this.$firebaseArray(squidStore.ref.orderByChild('order'));
    this.registered = squidStore.registered;

    this.colorNumber = 0;
    this.setSelfData(squidStore);

    if (!squidStore.selfData) { return; }
    this.ikaId = squidStore.selfData.ikaId;
    this.colorNumber = squidStore.colorNumber !== void 0 && squidStore.colorNumber !== null
      ? squidStore.colorNumber
      : squidStore.selfData.colorNumber;
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
