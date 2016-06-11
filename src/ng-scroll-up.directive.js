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
