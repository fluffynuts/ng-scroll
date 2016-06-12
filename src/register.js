const 
  wheelUp = require('./ng-scroll-up.directive'),
  wheelDown = require('./ng-scroll-down.directive')

const scrollModule = angular.module('ngScroll', []);
wheelUp(scrollModule);
wheelDown(scrollModule);
