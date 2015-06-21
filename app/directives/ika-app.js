import angular from 'angular';
import {appName} from '../constants';

const directiveName = 'ikaApp';

class IkaAppController {
  constructor() {
    this.title = 'siome';
    this.description = '"siome"はTwitterアカウントとイカID（ニンテンドーネットワークID）が潮目に集まるようにまとめて登録・検索ができるサービスです！イカ、よろしく〜〜〜';
  }
}

const template = `
<h1>{{${directiveName}.title}}</h1>
<div>
  <p>{{${directiveName}.description}}</p>
</div>
`;

const ddo = () => {
  return {
    restrict: 'E',
    scope: {},
    template: template,
    controller: IkaAppController,
    controllerAs: directiveName
  };
};

angular.module(appName).directive(directiveName, ddo);
