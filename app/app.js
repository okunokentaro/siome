import angular from 'angular';
import 'firebase';
import 'angularfire';

import {appName, plugins} from './constants';

angular.module(appName, plugins);
