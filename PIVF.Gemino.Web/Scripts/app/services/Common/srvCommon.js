PIVF.service('srvCommon', function ($http, API) {
    const val = 0;
    var objResource = {};

    this.getResources = function () {
        var Response = $http.get(API.APIurl + 'CommonAPI/FillResources').then(function (i) {
            objResource = i.data;
        },function (error) {
            //
        })
        return Response;
    };

    this.setval = function (val) {
        
        val = val;
    };

    this.getval = function () {
        
        return val;
    };

    this.get = function () {
        return objResource;
    };
});