import angular from 'angular';
import {appName} from '../constants';

const template = `
<h1>hello</h1>
`;

const ddo = () => {
  return {
    restrict: 'E',
    scope: {},
    template: template
  };
};

angular.module(appName).directive('ikaApp', ddo);
