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
