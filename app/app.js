import angular from 'angular';
import 'angular-route';
import 'firebase';
import 'angularfire';

import {appName, plugins} from './constants';

angular.module(appName, plugins);

const resolveAuthStatus = (Auth) => {
  return Auth.$waitForAuth();
}

resolveAuthStatus.$inject = ['Auth'];

const appConfig = ($routeProvider) => {
  $routeProvider
    .when('/', {
      template: '<ika-app></ika-app>',
      resolve: {
        authStatus: resolveAuthStatus
      }
    });
};

appConfig.$inject = ['$routeProvider'];

angular.module(appName).config(appConfig);
