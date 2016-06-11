# ng-scroll
A simple angular directive to assist with handling mouse scroll events 

### Usage
Make use of the (data)-ng-scroll-up and (data)-ng-scroll-down attributes on your 
elements. The value placed inside these attributes is a function to evaluate in the
local scope.

For example:
```
<input type="text" 
  data-ng-model="value" 
  data-ng-scroll-up="increment()" 
  data-ng-scroll-down="decrement()" />
```
When used with a controller or directive with logic like so:
```
function linkOrController($scope) {
  $scope.value = 0;
  $scope.increment = function() {
    $scope.value++;
  };
  $scope.decrement = function() {
    $scope.value--;
  }
}
```
basically implements a numeric spinner which responds to scroll events -- a more fleshed
out example can be found in the test/demo.html file.