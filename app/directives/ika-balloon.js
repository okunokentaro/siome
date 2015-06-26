import angular from 'angular';
import moment from 'moment';
import {appName} from '../constants';

import 'moment/locale/ja';
moment.locale('ja');

const directiveName = 'ikaBalloon';

class IkaBalloonController {
  constructor($rootScope, $compile, $scope) {
    IkaBalloonController.$inject = ['$rootScope', '$compile', '$scope'];
    this.$scope = $scope;

    // Aliases
    this.$scope.twiId = this.squid.twitterId;
    this.$scope.ikaId = this.squid.ikaId;
  }

  /**
   * @param {number} time - unixtime
   * @returns {string}
   */
  relativeTime(time) {
    return moment(time, 'x').fromNow();
  }

  /**
   * @param {number} time - dateAdded unixtime
   */
  offset(time) {
    const timeStr = (time || 0).toString();
    let offsetVal = parseInt(timeStr.substr(-2, 2), 10);
    const posinega = offsetVal % 2 === 0 ? 1 : -1;
    offsetVal *= posinega;
    return {
      left: `${offsetVal}px`
    };
  }
}

function ddo() {
  return {
    restrict:         'E',
    templateUrl:      './app/directives/ika-balloon.html',
    controller:       IkaBalloonController,
    controllerAs:     directiveName,
    scope:            {},
    bindToController: {
      squid: '=ikaSquid'
    }
  };
}

angular.module(appName).directive(directiveName, ddo);

function ikaTwi() {
  return {
    restrict: 'E',
    template: '<a ng-href="https://twitter.com/{{id}}">@{{id}}</a>',
    scope:    {
      id: '=tId'
    }
  };
}

angular.module(appName).directive('ikaTwi', ikaTwi);

function ikaIkaid() {
  return {
    restrict: 'E',
    template: '<span class="ika-id-label">イカID:</span><span class="ika-id">{{id}}</span>',
    scope:    {
      id: '=iId'
    }
  };
}

angular.module(appName).directive('ikaIkaid', ikaIkaid);
