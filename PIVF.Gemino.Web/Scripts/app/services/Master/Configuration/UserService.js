PIVF.service('UserService', function ($http, API) {
    this.GetUnitList = function () {
        // 
        var Response = $http.get(API.APIurl + 'UserAPI/GetUnitList').error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetUserList = function (index, Name, LogName, UsrType, UsrRole,PgEn) {
        //
        if (angular.isUndefined(Name)) { Name = ''; }
        if (angular.isUndefined(LogName)) { LogName = ''; }
        if (angular.isUndefined(UsrType)) { UsrType = 0; }
        if (angular.isUndefined(UsrRole)) { UsrRole = 0; }
        var Response = $http.get(API.APIurl + 'UserAPI/GetUserList', { params: { index: index, Name: Name, LogName: LogName, UsrType: UsrType, UsrRole: UsrRole, PgEn: PgEn } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetUserByID = function (id) {
        //
        var Response = $http.get(API.APIurl + 'UserAPI/GetUserByID', { params: { id: id } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetRoleList = function () {
        //  
        var Response = $http.get(API.APIurl + 'UserAPI/GetRoleList').error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetRoleListUserwise = function (UserID) {
        //  
        var Response = $http.get(API.APIurl + 'UserAPI/GetUnitRoleListUserwise', { params: { UserID: UserID } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetDoctorList = function () {
     //   
        var Response = $http.get(API.APIurl + 'UserAPI/GetDocList').error(function () {
           // window.location = '/Error/CustomError';
        });
        return Response;
    }

    this.GetEmployeeList = function () {
  //      
        var Response = $http.get(API.APIurl + 'UserAPI/GetEmployeeList').error(function () {
          //  window.location = '/Error/CustomError';
        });
        return Response;
    }

    this.SaveUpdateUser = function (User) {
        
        var Response = $http({
            url: API.APIurl + 'UserAPI/SaveUser',
            data: User,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.ActivateDeactivateUser = function (user) {
         // 
        var Response = $http.post(API.APIurl + 'UserAPI/ActivateDeactivateUser',user).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.LockUnlockUser = function (user) {
        // 
        var Response = $http.post(API.APIurl + 'UserAPI/LockUnlockUser', user).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.LoginNameExists = function (logName,UID) {
        //
        var Response = $http.get(API.APIurl + 'UserAPI/LoginNameExists', { params: { logName: logName,UID:UID } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetDocListByDeptID = function (ID) {
         debugger;
        var Response = $http.get(API.APIurl + 'UserAPI/GetDocListByDeptID', { params: { ID: ID } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };
});