(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function getScrollDelta(ev) {
  return ev.wheelDelta || (-1 * ev.deltaY) || 0;
}

function apply($scope, handler, ev) {
  $scope.$apply(function() {
    $scope.$eval(handler)
  })
  ev.preventDefault()
}

module.exports = function(directiveAttribute, applyIf) {
  return function($scope, $element, $attrs) {
    $element.bind('DOMMouseScroll mousewheel wheel', function(ev) {
      const delta = getScrollDelta(ev)
      if (applyIf(delta)) {
        apply($scope, $attrs[directiveAttribute], ev)
      }
    })
  }
}

},{}],2:[function(require,module,exports){
const makeLink = require('./makeLink');

function isDown(delta) {
  return delta < 0;
}

function createDirective() {
  return {
    restrict: 'A',
    link: makeLink('ngScrollDown', isDown)
  }
}

module.exports = function(mod) {
  mod.directive('ngScrollDown', createDirective);
}

},{"./makeLink":1}],3:[function(require,module,exports){
const makeLink = require('./makeLink');

function isUp(delta) {
  return delta > 0;
}

function createDirective() {
  return {
    restrict: 'A',
    link: makeLink('ngScrollUp', isUp)
  }
}

module.exports = function(mod) {
  mod.directive('ngScrollUp', createDirective);
}

},{"./makeLink":1}],4:[function(require,module,exports){
const 
  wheelUp = require('./ng-scroll-up.directive'),
  wheelDown = require('./ng-scroll-down.directive')

const scrollModule = angular.module('ng-scroll', []);
wheelUp(scrollModule);
wheelDown(scrollModule);

},{"./ng-scroll-down.directive":2,"./ng-scroll-up.directive":3}]},{},[4]);
