'use strict';
PIVF.factory('authInterceptorService', ['$q', '$injector', '$window', 'localStorageService','API', function ($q, $injector, $window, localStorageService,API) {

    var authInterceptorServiceFactory = {};
   // 
    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
         //   
            var authService = $injector.get('authService');
            var authData = localStorageService.get('authorizationData');

            if (authData) {
                if (authData.useRefreshTokens) {
                  //  $location.path('/refresh');
                    return $q.reject(rejection);
                }
            }
            authService.logOut();
            //  $location.path('/login');
            $window.location.href = API.Baseurl;
          //  $location.path('/home/index');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);