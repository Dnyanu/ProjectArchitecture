//======================================================================================================================
PIVF.controller('crumbCtrl', ['$scope', '$location', '$route', 'breadcrumbs',
  function ($scope, $location, $route, breadcrumbs) {
      $scope.location = $location;
      $scope.breadcrumbs = breadcrumbs;
  }]);
//======================================================================================================================