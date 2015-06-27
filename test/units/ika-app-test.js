/* eslint-disable */
import assert from 'power-assert';
import sinon from 'sinon';

import Injector from '../../app/injector';

const mock = {
  angular: {
    module: () => {
      return {
        directive: () => {}
      };
    }
  },
  AuthStore: () => {},
  AppAction: () => {}
};

mock.AuthStore.prototype = {
  on: () => {}
};

mock.AppAction.prototype = {
  applicationReady: () => {},
  initAuthStatus: () => {}
};

const stub = {
  AppAction: {
    applicationReady: sinon.stub(mock.AppAction.prototype, 'applicationReady'),
    initAuthStatus: sinon.stub(mock.AppAction.prototype, 'initAuthStatus')
  }
};

sinon.stub(Injector, 'angular').returns(mock.angular);
sinon.stub(Injector, 'AppAction').returns(mock.AppAction);
sinon.stub(Injector, 'AuthStore').returns(mock.AuthStore);

const ikaAppCtor = require('../../app/directives/ika-app').IkaAppController;
const ikaApp = new ikaAppCtor({}, {});
console.log(ikaApp);

describe('IkaAppController', () => {
  beforeEach(() => {
    Object.keys(stub.AppAction).forEach(s => stub.AppAction[s].reset());
  });

  describe('init', () => {
    beforeEach(() => {
      ikaApp.init();
    });

    afterEach(() => {
      Object.keys(stub.AppAction).forEach(s => stub.AppAction[s].reset());
    });

    it('should be called action.applicationReady()', () => {
      assert(stub.AppAction.applicationReady.callCount === 1);
    });

    it('should be called action.initAuthStatus()', () => {
      assert(stub.AppAction.initAuthStatus.callCount === 1);
    });
  });
});
