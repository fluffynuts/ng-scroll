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
