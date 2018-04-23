PIVF.service('UserRoleService', function ($http, API) {

    this.GetRoleList = function (PageIndex, RoleData, PagingEnabled) {
        if (angular.isUndefined(RoleData.Code)) { RoleData.Code = '' }
        if (angular.isUndefined(RoleData.Description)) { RoleData.Description = '' }
        var Response = $http.get(API.APIurl + 'UserRole/RoleList', {
            params: { PageIndex: PageIndex, Code: RoleData.Code, Description: RoleData.Description, PagingEnabled: PagingEnabled }
     }
    ).error(function () {
    });
    return Response;
    }

    this.GetMenuList = function () {
        
        var Response = $http.get(API.APIurl + 'UserRole/MenuList')
            .error(function () {
        });
        return Response;
    }

    this.UpdateRoleStatus = function (RoleId, Status) {
               
        var Response = $http.get(API.APIurl + 'UserRole/UpdateRoleStatus', {
            params: { RoleId: RoleId, Status: Status }
        }
    ).error(function () {
    });
        return Response;
    }

    this.AddUserRole = function (Role, OldDataValue) {
        var Response = $http({
            url: API.APIurl + 'UserRole/AddRole/',
            data: JSON.stringify(Role),
            dataType: "json",
            method: 'post'
        }).success(function () {
            
        }).error(function () {
        });
        return Response;

    }

    this.CheckAlreadyExists = function (Role) {
        var Response = $http({
            url: API.APIurl + 'UserRole/CheckAlreadyExists/',
            data: JSON.stringify(Role),
            dataType: "json",
            method: 'post'
        }).error(function () {
        });
        return Response;
    }

    this.GetRoleDetails = function (RoleID) {
        var Response = $http.get(API.APIurl + 'UserRole/RoleDetails/', { params: { RoleID: RoleID } }
            ).error(function () {
        });
        return Response;
    }
});