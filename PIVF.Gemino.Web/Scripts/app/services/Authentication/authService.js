'use strict';
PIVF.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', '$window', 'API', function ($http, $q, localStorageService, ngAuthSettings, $window, API) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false,
        IsLogOut: false
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: ""
    };

    var _saveRegistration = function (registration) {
      //  
        _logOut();
        var a = [];
        a.push(registration.LoginName);
        a.push(registration.Password);
        return $http.post(serviceBase + 'api/Authentication/register', a).then(function (response) {
            return response;
        });

    };

    var _activetickets = function (UserName, generatedToken, checkStatus, flag) {
        debugger;
        var Response = $http({
            url: serviceBase + 'odata/GetActiveTickets(UserName=' + '\'' + UserName + '\'' + ',generatedToken=' + '\'' + generatedToken + '\'' + ',checkStatus=' + checkStatus + ',flag=' + flag +')',
            method: 'Put'
        }).error(function () {
            //;
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    var _UpdateTicket = function () {
        //;
        var Response = $http({
            url: serviceBase + 'odata/UpdateTicket()',
            method: 'Post'
        }).error(function () {
            //;
            //window.location = '/Error/CustomError';
        });
        return Response;
    };
    
    var deferred = $q.defer();
    var _login = function (loginData) {
        debugger;
        var duplicateTicketResponse = _activetickets(loginData.userName, loginData.userName, true, 0).then(function (duplicateTicketResponse) {
            if (duplicateTicketResponse.data.value == 0) {
                var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

                if (loginData.useRefreshTokens) {
                    data = data + "&client_id=" + ngAuthSettings.clientId;
                }
                var deferred1 = $q.defer();
                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                    //;
                    if (loginData.useRefreshTokens) {
                        localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, Clinic: loginData.Clinic, refreshToken: response.refresh_token, useRefreshTokens: false });
                    }
                    else {
                        localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, Clinic: loginData.Clinic, refreshToken: "", useRefreshTokens: false
                    });
                    var activeTicketsUpdateResponse = _activetickets(loginData.userName, loginData.userName, true, 1).then(function (activeTicketsUpdateResponse) {
                                window.location = "Gemino";
                                //;
                    },
                    function (err) {
                        //;
                        //$scope.Message = err.error_description;
                    });
                    }
                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;
                    _authentication.Clinic = loginData.Clinic;
                    _authentication.useRefreshTokens = loginData.useRefreshTokens;

                     deferred1.resolve(response);

                    }).error(function (err, status) {
                        _logOut();
                        deferred1.reject(err);
                    });

                return deferred1.promise;
            }
            else {
               //alert("Someone has already logged in by these credentials,please use other credentials !!!");
               //$window.location.href = API.Baseurl;
            }
            deferred.resolve(duplicateTicketResponse.data);
        },
        function (err) {
               //;
               //$scope.Message = err.error_description;
               deferred.reject(err);
        });
        return deferred.promise;
    };

    //var _login = function (loginData) {
    //    
    //    var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

    //    if (loginData.useRefreshTokens) {
    //        data = data + "&client_id=" + ngAuthSettings.clientId;
    //    }

    //    var deferred = $q.defer();

    //    $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
    //      //  
    //        if (loginData.useRefreshTokens) {
    //            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, Clinic: loginData.Clinic, refreshToken: response.refresh_token, useRefreshTokens: false });
    //        }
    //        else {
    //            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName,Clinic : loginData.Clinic, refreshToken: "", useRefreshTokens: false });
    //        }
    //        //
    //        _authentication.isAuth = true;
    //        _authentication.userName = loginData.userName;
    //        _authentication.Clinic = loginData.Clinic;
    //        _authentication.useRefreshTokens = loginData.useRefreshTokens;

    //        deferred.resolve(response);

    //    }).error(function (err, status) {
    //        _logOut();
    //        deferred.reject(err);
    //    });

    //    return deferred.promise;

    //};

    var _logOut = function () {
      //  
        

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.useRefreshTokens = false;
        _authentication.IsLogOut = true;
        _authentication.FullName = '';

    };

    var _fillAuthData = function () {
        //;
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.Clinic = authData.Clinic;
            _authentication.useRefreshTokens = authData.useRefreshTokens;
            _authentication.FullName = '';
        }

    };

    var _refreshToken = function () {
        var deferred = $q.defer();
      //  
        var authData = localStorageService.get('authorizationData');

        if (authData) {

            if (authData.useRefreshTokens) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                localStorageService.remove('authorizationData');

                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: false });

                    deferred.resolve(response);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });
            }
        }

        return deferred.promise;
    };

    var _obtainAccessToken = function (externalData) {
        //;
        var deferred = $q.defer();

        $http.get(serviceBase + 'api/Authentication/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {
        //;
        var deferred = $q.defer();

        $http.post(serviceBase + 'api/Authentication/registerexternal', registerExternalData).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _resetPassword = function (reset) {
        //;
       // _logOut();

        return $http.post(serviceBase + 'api/Authentication/ResetPassword', reset).then(function (response) {
            return response;
        });

    };

    var _forgotPassword = function (userid) {
        var buser = { UserName: userid };
        var Response = $http.post(serviceBase + 'api/Authentication/ForgotPassword', buser).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    var _checkCurrentPassword = function (reset) {
        //;
        // _logOut();

        return $http.post(serviceBase + 'api/Authentication/checkCurrentPassword', reset).then(function (response) {
            return response;
        });

    };
    var _lockUnlockUser = function (user) {
        var Response = $http.post(serviceBase + 'api/UserAPI/LockUnlockUser', user).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    }

    var _fillUnit = function (loginName) {
        var Response = $http.get(serviceBase + 'api/Authentication/GetUnitListLogNameWise', { params: { logName: loginName } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    }

    var _BindGrandParentList = function () {
        var Response = $http.get(serviceBase + 'api/UserAPI/GetGrandParentList').error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    }

    var _BindParentList = function (grandpaid) {
        var Response = $http.get(serviceBase + 'api/UserAPI/GetParentList', { params: { grandpaid: grandpaid } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    }

    var _BindClildMenuList = function (parentid) {
        var Response = $http.get(serviceBase + 'api/UserAPI/GetClildMenuList', { params: { parentid: parentid } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    }

    var _validateUser = function (LoginBO) {
        //;
            var Response = $http({
                url: serviceBase + 'api/Authentication/ValidateUser/',
                data: LoginBO,
                method: 'post'
            }).error(function () {
                //;
                //window.location = '/Error/CustomError';
            });
            return Response;
    };

    var _GetUserRoleRights = function () {
        var Response = $http.get(serviceBase + 'api/UserAPI/GetUserRoleRights').error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    }

    authServiceFactory.forgotPassword = _forgotPassword;
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;

    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;
    authServiceFactory.resetPassword = _resetPassword;
    authServiceFactory.ValidateUser = _validateUser;
    authServiceFactory.LockUnlockUser = _lockUnlockUser;
    authServiceFactory.Fillunit = _fillUnit;
    authServiceFactory.BindGrandParentList = _BindGrandParentList;
    authServiceFactory.BindParentList = _BindParentList;
    authServiceFactory.BindClildMenuList = _BindClildMenuList;
    authServiceFactory.activetickets = _activetickets;
    authServiceFactory.UpdateTicket = _UpdateTicket;
    authServiceFactory.GetUserRoleRights = _GetUserRoleRights;
    authServiceFactory.checkCurrentPassword = _checkCurrentPassword;
    return authServiceFactory;
}]);