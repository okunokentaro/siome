import angular from 'angular';
import {appName} from '../constants';

const directiveName = 'ikaSns';

function link() {
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
}

function ddo() {
  return {
    restrict:         'E',
    templateUrl:      './app/directives/ika-sns.html',
    link:             link,
    scope:            {},
    controller:       () => {},
    controllerAs:     directiveName,
    bindToController: {
      ikaId: 'ikaIkaId'
    }
  };
}

angular.module(appName).directive(directiveName, ddo);
