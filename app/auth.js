import angular from 'angular';
import {appName, firebaseUrl} from './constants';

const authFactory = ($firebaseAuth) => {
  const ref = new Firebase(firebaseUrl);
  return $firebaseAuth(ref);
};

authFactory.$inject = ['$firebaseAuth'];

angular.module(appName).factory('Auth', authFactory);
