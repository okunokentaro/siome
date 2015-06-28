/**
 * @param {IAngularStatic} ng - angular
 * @param {Firebase} ref
 * @return {AngularFireArray}
 */
export function createFirebaseArray(ng, ref) {
  const $firebaseArray = ng
    .element(document.querySelector('.ng-scope'))
    .injector()
    .get('$firebaseArray');
  return $firebaseArray(ref.orderByChild('order'));
}

/**
 * @param {SquidStore} store
 * @returns {string}
 */
export function extractIkaId(store) {
  if (!store || !store.selfData || !store.selfData.ikaId) {
    return '';
  }
  return store.selfData.ikaId;
}

/**
 * @param {SquidStore} store
 * @returns {number}
 */
export function extractColorNumber(store) {
  if (!store || !store.selfData) {
    return 0;
  }
  if (store.colorNumber !== void 0 && store.colorNumber !== null) {
    return store.colorNumber;
  }

  return store.selfData.colorNumber;
}
