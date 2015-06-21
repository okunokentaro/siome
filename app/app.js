import angular from 'angular';
import 'firebase';
import 'angularfire';

const APP_NAME = 'ika_yoroshiku';
const APP_PLUGINS = ['firebase'];

angular.module(APP_NAME, APP_PLUGINS);
