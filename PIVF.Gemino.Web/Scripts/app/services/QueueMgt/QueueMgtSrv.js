PIVF.service('QueueService', function ($http, API) {

    this.GetQueueList = function (Que) {
        var Response = $http.post(API.APIurl + 'QueueMgt/GetQueueList', Que).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetSpeclRegTypeList = function () {
        //   
        var Response = $http.get(API.APIurl + 'QueueMgt/GetSpeclRegTypeList').error(function () {
            // window.location = '/Error/CustomError';
        });
        return Response;
    }

    this.CloseVisit = function (vid, UnitId) {
        //   
        var Response = $http.get(API.APIurl + 'QueueMgt/CloseVisit', { params: { vid: vid, UnitId: UnitId } }).error(function () {
            // window.location = '/Error/CustomError';
        });
        return Response;
    };


    this.GetDepartmentList = function (UID, flag) {
        // debugger;
        var Response = $http.get(API.APIurl + 'QueueMgt/GetDepartmentListForStaff', { params: { UID: UID, flag: flag } }).error(function () {
            debugger;
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetDoctorList = function () {
        //   debugger;
        var Response = $http.get(API.APIurl + 'QueueMgt/GetDocList').error(function () {
            // window.location = '/Error/CustomError';
        });
        return Response;
    };
})