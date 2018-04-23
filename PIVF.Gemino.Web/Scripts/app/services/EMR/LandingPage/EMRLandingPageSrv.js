PIVF.service('EMRLandingPageSrv', function ($http, API, Common) {

    this.GetEMRLandingPageData = function (PID, UID) {
        debugger;
        var Response = $http.get(API.APIurl + 'EMRLandingPageAPI/GetEMRLandingPageData', { params: { PID: PID, UID: UID } }).error(function () {
        });
        return Response;
    };

})