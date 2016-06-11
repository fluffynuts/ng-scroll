function getScrollDelta(ev) {
  return Math.max(-1, Math.min(1, ev.wheelDelta))
}

function apply($scope, handler, ev) {
  $scope.$apply(function() {
    $scope.$eval(handler)
  })
  ev.preventDefault()
}

module.exports = function(directiveAttribute, applyIf) {
  return function($scope, $element, $attrs) {
    $element.bind('DOMMouseScroll mousewheel', function(ev) {
      const delta = getScrollDelta(ev)
      if (applyIf(delta)) {
        apply($scope, $attrs[directiveAttribute], ev)
      }
    })
  }
}
