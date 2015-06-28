import angular from 'angular';
import {appName} from '../constants';

const directiveName = 'ikaSns';

class IkaSnsController {
  constructor() {
    // noop
  }

  /**
   * @param {string} ikaId
   * @param {number} n - colorNumber
   * @returns {string}
   */
  tweetText(ikaId, n) {
    switch (n) {
      case 0:
        return `イカID: ${ikaId} でやってます！`;
      case 1:
        return `イカID: ${ikaId} でやってます！`;
      case 2:
        return `イカID: ${ikaId} でやってるよ！　イカ、よろしくーーー！`;
      case 3:
        return `イカID: ${ikaId} でやってるよ　イカ、よろしく〜〜〜`;
      case 4:
        return `ちゅーーす　イカID: ${ikaId} でやってんだわ　よろしくネー`;
      case 5:
        return `イカID: ${ikaId} でやっとるぞ　確認されたしーッ！！`;
      case 6:
        return `に"！（イカID: ${ikaId} でやっている！）`;
      default:
        return `イカID: ${ikaId} でやってます！`;
    }
    return `イカID: ${ikaId} でやってます！`;
  }
}

function link() {
  setTimeout(() => {
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
  }, 800);
}

function ddo() {
  return {
    restrict:         'E',
    templateUrl:      './app/directives/ika-sns.html',
    link:             link,
    scope:            {},
    controller:       IkaSnsController,
    controllerAs:     directiveName,
    bindToController: {
      colorNumber: '=ikaColorNumber',
      ikaId:       '=ikaIkaId'
    }
  };
}

angular.module(appName).directive(directiveName, ddo);
