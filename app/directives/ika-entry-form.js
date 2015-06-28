import angular from 'angular';
import {appName} from '../constants';
import {action} from './ika-app';

const directiveName = 'ikaEntryForm';

class IkaEntryFormController {
  constructor($rootScope) {
    IkaEntryFormController.$inject = ['$rootScope'];
    this.$rootScope = $rootScope;
    this.postable = true;
    this.post = this.post || {};
    this.formInfo = {
      type:    'info',
      message: '登録時に自動で呟くことはありません'
    };

    this.watch();
  }

  /**
   * @private
   * @returns {void}
   */
  watch() {
    this.$rootScope.$watch(() => this.ikaId, (newVal) => {
      this.post.ikaId = newVal;
    });
  }

  /**
   * @returns {void}
   */
  login() {
    action.login();
  }

  /**
   * @returns {void}
   */
  logout() {
    action.logout();
  }

  /**
   * @param {string} ikaId
   * @returns {boolean}
   */
  isValidIkaId(ikaId) {
    if (!ikaId || ikaId === '') {
      this.formInfo = {type: 'error', character: 'kumano', message: 'クマノ「何も入力されてねぇぞ！！」'};
      return false;
    }

    if (ikaId.length < 6) {
      this.formInfo = {type: 'error', character: 'anemo', message: 'アネモ「…ぁっ、6文字以上で　おねがいします…」'};
      return false;
    }

    if (16 < ikaId.length) {
      this.formInfo = {type: 'error', character: 'kumano', message: 'クマノ「16文字超えてっぞ！」'};
      return false;
    }

    if (!/^[a-zA-Z0-9._\-]{6,16}$/.test(ikaId)) {
      this.formInfo = {type: 'error', character: 'judgekun', message: 'に\"！（使えるのは半角英数と._-の記号だけだ！）'};
      return false;
    }

    return true;
  }

  /**
   * @returns {void}
   */
  save() {
    if (!this.isValidIkaId(this.post.ikaId)) { return; }

    this.resetPostable(Date, window, this.$rootScope);

    this.post.avatarUrl = this.authStatus.twitter.cachedUserProfile.profile_image_url_https;
    this.post.colorNumber = this.colorNumber || 0;
    this.post.twitterId = this.authStatus.twitter.username;
    this.post.siomeUid = this.authStatus.uid;

    action.addSquid(this.post);
  }

  /**
   * @returns {void}
   */
  update() {
    if (!this.authStatus) {
      console.error('Cannot update because you have not logged in');
      return;
    }
    if (!this.isValidIkaId(this.post.ikaId)) { return; }

    this.resetPostable(Date, window, this.$rootScope);

    this.post.colorNumber = this.colorNumber;
    this.post.siomeUid = this.authStatus.uid;
    this.post.twitterId = this.authStatus.twitter.username;

    action.updateSquid(this.post);
  }

  /**
   * @returns {void}
   */
  remove() {
    if (!this.authStatus) { return console.error('Cannot remove because you have not logged in'); }
    action.removeSquid(this.authStatus.uid);

    this.formInfo = {
      type:    'info',
      message: '登録時に自動で呟くことはありません'
    };
  }

  /**
   * @private
   * @param {Date} Date - constructor
   * @param {window} window - Global window
   * @returns {void}
   */
  resetPostable(Date, window) {
    const waitTime = 3 * 1000;
    this.postable = false;

    window.setTimeout(() => {
      this.postable = true;
      this.$rootScope.$apply();
    }, waitTime);

    this.remaining = waitTime / 1000;
    this.formInfo = {type: 'info', character: '', message: 'ちょっと待ってね'};
    const timer = window.setInterval(() => {
      this.remaining--;
      if (this.remaining === 0) {
        window.clearInterval(timer);
        this.formInfo.message = '';
      }
      this.$rootScope.$apply();
    }, 1000);
  }
}

function ddo() {
  return {
    restrict:         'E',
    templateUrl:      './app/directives/ika-entry-form.html',
    controller:       IkaEntryFormController,
    controllerAs:     directiveName,
    scope:            {},
    bindToController: {
      authStatus:  '=ikaAuthStatus',
      colorNumber: '=ikaColorNumber',
      ikaId:       '=ikaIkaId',
      registered:  '=ikaRegistered',
      postable:    '=ikaPostable'
    }
  };
}

angular.module(appName).directive(directiveName, ddo);
