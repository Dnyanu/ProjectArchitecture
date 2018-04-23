'use strict';
PIVF.controller('signupController', ['$scope','API', '$timeout', 'authService', '$window', 'AlertMessage', 'srvCommon', function ($scope, API, $timeout, authService, $window, AlertMessage, srvCommon) {

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        userName: "",
        password: "",
        confirmPassword: ""
    };
    var objResource = {};
    
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    $scope.signUp = function () {
        
        authService.saveRegistration($scope.registration).then(function (response) {
            
            $scope.savedSuccessfully = true;
            $scope.message = "User has been registered successfully, you will be redicted to login page in 5 seconds.";
            //  startTimer();
            $timeout(function () {
            //    window.location = "Login";
                $window.location.href = API.Baseurl;
            //    $window.open('Login');
            }, 5000);

        },
         function (response) {
             
             if(response.data.Message=="3")
             AlertMessage.error(objResource.msgTitle, "User name already exists.");
           //  var errors = [];
             //for (var key in response.data.ModelState) {
             //    for (var i = 0; i < response.data.ModelState[key].length; i++) {
             //        errors.push(response.data.modelState[key][i]);
             //    }
             //}
         //    $scope.message = "Failed to register user";// due to:" + errors.join(' ');
         });
    };

    var startTimer = function () {
        
        $timeout(function () {
         //   $timeout.cancel(timer);
            $location.path('Authentication/Login');
        }, 3000);
    }

}]);