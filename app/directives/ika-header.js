import angular from 'angular';
import {appName} from '../constants';

const directiveName = 'ikaHeader';

function ddo() {
  return {
    restrict:    'E',
    scope:       {},
    templateUrl: './app/directives/ika-header.html'
  };
}

angular.module(appName).directive(directiveName, ddo);
