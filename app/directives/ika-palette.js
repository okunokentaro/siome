import angular from 'angular';
import {appName} from '../constants';
import {action} from './ika-app';

const directiveName = 'ikaPalette';

class IkaPaletteController {
  constructor($rootScope) {
    IkaPaletteController.$inject = ['$rootScope'];
    this.$rootScope = $rootScope;
  }

  /**
   * @param {number} n - color number
   * @returns {void}
   */
  setColor(n) {
    action.setColor(n);
  }
}

function ddo() {
  return {
    restrict:         'E',
    templateUrl:      './app/directives/ika-palette.html',
    controller:       IkaPaletteController,
    controllerAs:     directiveName,
    scope:            {},
    bindToController: {
      colorNumber: '=ikaColorNumber'
    }
  };
}

angular.module(appName).directive(directiveName, ddo);
