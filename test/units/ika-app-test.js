/* eslint-disable */
import assert from 'power-assert';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

import mock from '../mocks';

const stub = {
  $firebaseArray: sinon.stub(mock, '$firebaseArray').withArgs('orderedResult').returns('$firebaseArrayResult'),
  AppAction: {
    applicationReady: sinon.stub(mock.AppAction.prototype, 'applicationReady'),
    initAuthStatus:   sinon.stub(mock.AppAction.prototype, 'initAuthStatus')
  },
  angular: {
    element: sinon.stub(mock.angular, 'element').returns(mock.angularElement)
  },
  angularElement: {
    injector: sinon.stub(mock.angularElement, 'injector').returns(mock.angularInjector)
  },
  angularInjector: {
    get: sinon.stub(mock.angularInjector, 'get').withArgs('$firebaseArray').returns(mock.$firebaseArray)
  },
  ref: {
    orderByChild: sinon.stub(mock.ref, 'orderByChild').withArgs('order').returns('orderedResult'),
  }
};

const ikaApp = proxyquire('../../app/directives/ika-app', {
  'angular': proxyquire('angular', mock.angular),
  '../auth-store': proxyquire('../../app/auth-store', {
    'angular': proxyquire('angular', mock.angular)
  }),
});

function allReset(stubs) {
  Object.keys(stubs).forEach(s => stubs[s].reset());
}

describe('IkaApp', () => {
  beforeEach(() => {
    allReset(stub.AppAction);
  });

  afterEach(() => {
    allReset(stub.AppAction);
  });

  describe('createFirebaseArray()', () => {
    it('should be returned a result from $firebaseArray()', () => {
      const result = ikaApp.createFirebaseArray(mock.angular, mock.ref)
      assert(result === '$firebaseArrayResult');
    });
  });

  describe('extractIkaId()', () => {
    it('should be returned a result when exists selfData', () => {
      const store = {
        selfData: {ikaId: 'expected'}
      };
      const result = ikaApp.extractIkaId(store)
      assert(result === 'expected');
    });

    it('should be returned a blank when store is a falsy', () => {
      const store = void 0;
      const result = ikaApp.extractIkaId(store)
      assert(result === '');
    });

    it('should be returned a blank when NOT exists selfData', () => {
      const store = {
        selfData: void 0
      };
      const result = ikaApp.extractIkaId(store)
      assert(result === '');
    });

    it('should be returned a blank when NOT exists selfData.ikaId', () => {
      const store = {
        selfData: {}
      };
      const result = ikaApp.extractIkaId(store)
      assert(result === '');
    });
  });

  describe('extractColorNumber()', () => {
    it('should be returned selfData.colorNumber when NOT exists store.colorNumber', () => {
      const store = {
        colorNumber: void 0,
        selfData: {colorNumber: 34}
      };
      const result = ikaApp.extractColorNumber(store)
      assert(result === 34);
    });

    it('should be returned a 0 when exists selfData.colorNumber', () => {
      const store = {
        colorNumber: 0,
        selfData: {colorNumber: 34}
      };
      const result = ikaApp.extractColorNumber(store)
      assert(result === 0);
    });

    it('should be returned a selfData.colorNumber when exists selfData.colorNumber', () => {
      const store = {
        colorNumber: 0,
        selfData: {colorNumber: 34}
      };
      const result = ikaApp.extractColorNumber(store)
      assert(result === 0);
    });
  });
});
