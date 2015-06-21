import angular from 'angular';
import {appName} from './constants';

const authFactory = ($firebaseAuth) => {
  const ref = new Firebase();
  return $firebaseAuth(ref);
};

factory.$inject = ['$firebaseAuth'];

angular.module(appName).factory('auth', authFactory);
