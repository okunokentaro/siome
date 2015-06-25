import angular from 'angular';
import Firebase from 'firebase';
import {appName, firebaseUrl} from './constants';

function authFactory($firebaseAuth) {
  console.log($firebaseAuth);
  const ref = new Firebase(firebaseUrl);
  return $firebaseAuth(ref);
}

authFactory.$inject = ['$firebaseAuth'];

angular.module(appName).factory('Auth', authFactory);
