import angular from 'angular';
import 'angular-route';
import 'firebase';
import 'angularfire';

import {appName, plugins} from './constants';

angular.module(appName, plugins);

function appConfig($routeProvider) {
  $routeProvider
    .when('/', {template: '<ika-app></ika-app>'});
}

appConfig.$inject = ['$routeProvider'];

angular.module(appName).config(appConfig);
