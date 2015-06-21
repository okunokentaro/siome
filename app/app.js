import angular from 'angular';
import 'firebase';
import 'angularfire';

import {APP_NAME, APP_PLUGINS} from './constants';

angular.module(APP_NAME, APP_PLUGINS);

import './auth';
