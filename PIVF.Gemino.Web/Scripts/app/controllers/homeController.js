'use strict';

angular.module('PIVF').controller('homeController',
    function ($scope, localStorageService, $location) {
        $scope.checkURL = function () {
            debugger;
            if (localStorageService.get("UserInfo") && localStorageService.get("UserInfo").UnitID == 1) {
                $scope.isHOUser = true;
                $location.path('/UserList');
            } else {
                debugger;
                $scope.isHOUser = false;
                $location.path('/Queue');
            }
        };
    });