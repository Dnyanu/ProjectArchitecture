
'use strict';

var PIVF = angular.module('PIVF', ['ngRoute', 'ui.bootstrap', 'LocalStorageModule', 'oc.lazyLoad', 'angular-toasty', 'angularSpinner']);
var Baseurl = 'http://localhost:55960/';
PIVF.constant('API', {
    url: Baseurl + 'odata/',
    APIurl: Baseurl + 'api/',
    Baseurl: Baseurl
});

PIVF.config(function ($routeProvider, $ocLazyLoadProvider, usSpinnerConfigProvider) {
    debugger;
    /* START : Spinner functionality */
    usSpinnerConfigProvider.setDefaults({ color: 'orange' });
    /* END : Spinner functionality */

    /* START : URL Routing start form here*/
    $routeProvider
     .when('/Login', {
         templateUrl: '/home/home',
         controller: 'homeController',
         resolve: {
             HomeController: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load({
                     name: 'homeController',
                     files: ['/Scripts/app/controllers/homeController.js']
                 });
             }]
         }
     })
    .when('/Queue', {
        templateUrl: 'QueueMgt/QueueList',
        resolve: {
            QueueController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'QueueController',
                    files: ['/Scripts/app/controllers/QueueMgt/QueueMgtctlr.js', '/Scripts/app/services/QueueMgt/QueueMgtSrv.js']
                });
            }]
        },
        Breadcrum: 'Queue'
    })
    .when('/EMRLandingPage', {
        templateUrl: 'EMRLandingPageMVC/EMRLandingPage',
        resolve: {
            EMRLandingPageCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'EMRLandingPageCtr',
                    files: ['/Scripts/app/controllers/EMR/LandingPage/EMRLandingPageCtr.js', '/Scripts/app/services/EMR/LandingPage/EMRLandingPageSrv.js']
                });
            }]
        },
        Breadcrum: 'EMR Dashboard'
    })
    .when('/Investigation', {
        templateUrl: 'InvestigationMVC/Investigation',
        resolve: {
            InvestigationCtr: ['$ocLazyLoad', '$injector', function ($ocLazyLoad, $injector) {
                return $ocLazyLoad.load({
                    name: 'InvestigationCtr',
                    files: ['/Scripts/app/controllers/EMR/Investigation/InvestigationCtr.js', '/Scripts/app/services/EMR/Investigation/InvestigationSrv.js', '/Scripts/app/services/EMR/MaleHistory/SemenPrepService.js']
                });
            }],
        },
        Breadcrum: 'Investigation'
    })
     .when('/DefaultPage', {
         templateUrl: '/Home/DefaultPage',
         controller: 'DefaultPageCtlr',
     })
        .otherwise(
        {
            redirectTo: '/Login'
        });
    /* END : URL Routing start form here*/
    $ocLazyLoadProvider.config({
        debug: true,
        events: true
    });
});

PIVF.constant('ngAuthSettings', {
    apiServiceBaseUri: Baseurl,
    clientId: 'ngAuthApp'
});

PIVF.constant('PatientInfo', {
    IsSingle: false
});

PIVF.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

PIVF.run(['$rootScope', 'authService', function ($rootScope, authService) {
    authService.fillAuthData();
    $rootScope.Breadcrum = [];
    $rootScope.Breadcrum.length = 0;
}]);

PIVF.config(['toastyConfigProvider', function (toastyConfigProvider) {
    toastyConfigProvider.setConfig({
        timeout: 5000,
        limit: 1,
        sound: false,
    });
}]);

PIVF.factory('AlertMessage', function (toasty) {
    return {
        success: function (Title, Text) {
            toasty.success({
                title: Title,
                msg: Text
                //sound: true,
                //shake: true,
            });
        },

        error: function (Title, Text) {
            toasty.error({
                title: Title,
                msg: Text
            });
        },

        warning: function (Title, Text) {
            toasty.warning({
                title: Title,
                msg: Text
            });
        },

        wait: function (Title, Text) {
            toasty.wait({
                title: Title,
                msg: Text
            });
        },

        info: function (Title, Text) {
            toasty.info({
                title: Title,
                msg: Text
            });
        },

        Default: function (Title, Text) {
            toasty({
                title: Title,
                msg: Text
            });
        },
    }
})

PIVF.factory('swalMessages', function () {
    return {
        MessageBox: function (Title, Text, Type, callback) {
            swal({
                html: true,
                title: Title,
                text: "<b>" + Text + "</b>",
                type: Type,
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                closeOnConfirm: true,
                closeOnCancel: true,
                animation: false
            },
 function (isConfirm) {
     if (isConfirm) {
         callback(isConfirm);
     }
     else {
         callback(isConfirm);
     }
 }
            );
        }
    };
});

PIVF.run(['$rootScope', '$location', '$route', function ($rootScope, $location, $route) {
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {

        if (angular.isDefined($route.current.$$route))
            var Breadcrum = $route.current.$$route.Breadcrum;
        if (angular.isDefined(Breadcrum))
            if (['Donor', 'Design EMR', 'Queue', 'Users', 'User Role', 'Consent', 'EMR Dashboard'].indexOf(Breadcrum) > -1) {
                $rootScope.Breadcrum.length = 0;
            }
            else if (['Outcome', 'Semen Details', 'Overview', 'IUI', 'Embryo Transfer', 'Stimulation Chart', 'Embryology', 'Ovum Pick Up'].indexOf(Breadcrum) > -1) {
                $rootScope.Breadcrum.splice(1);
            }
            else if (['Oocyte Thaw', 'Embryo Thaw', 'Embryo Vitrification', 'Oocyte Vitrification'].indexOf(Breadcrum) > -1) {
                $rootScope.Breadcrum.splice(1);
                $rootScope.Breadcrum.push({ Title: 'Cryo Preservation', Path: $location.path() });
            }
            else if (['Embryo Bank', 'Oocyte Bank', 'Sperm Bank'].indexOf(Breadcrum) > -1 && !$rootScope.IsSinglePatient) {
                $rootScope.Breadcrum.length = 0;
                $rootScope.Breadcrum.push({ Title: 'Cryo Bank', Path: $location.path() });
            }
        var idx = -1;
        for (var i = 0; i < $rootScope.Breadcrum.length; ++i) {
            if ($rootScope.Breadcrum[i].Title == Breadcrum) {
                idx = i;
                break;
            }
        }
        if (idx > -1) {
            $rootScope.Breadcrum.splice(idx);
        }
        var count = ($rootScope.Breadcrum.join(',').match('/' + Breadcrum + '/g') || []).length;
        if (count == 0 && angular.isDefined(Breadcrum)) {
            if (angular.isDefined(current) && angular.isDefined(pre)) {
                if (current.Breadcrum != pre.Breadcrum)
                    $rootScope.Breadcrum.push({ Title: Breadcrum, Path: $location.path() });
            }
            else
                $rootScope.Breadcrum.push({ Title: Breadcrum, Path: $location.path() });
        }
    });
}]);

