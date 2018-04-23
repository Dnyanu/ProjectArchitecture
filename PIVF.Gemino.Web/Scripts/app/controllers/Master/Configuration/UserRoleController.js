'use strict';
angular.module('PIVF').controller('UserRoleController', function ($rootScope, $scope, $http, UserRoleService, $uibModal, srvCommon, $location, AlertMessage, Common, usSpinnerService) { //usSpinnerService,
    $scope.maxSize = 5;
    $rootScope.isAction = false;
    $scope.CurrentPage = 1;
    $scope.Role = {};
    $scope.selectedMenus = [];
    $rootScope.CycleDetails = null;
    var objResource = {};
    $scope.isAddRole = false;
    $rootScope.hideWhenQueue = true;
    $rootScope.ForPrint = 0;
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    //$rootScope.FormName = '';
    //Used to set condition for already exists functionality while page loads
    var selRoleh = sessionStorage.getItem('SelRole');
    if (angular.isUndefined(selRoleh) || selRoleh == null) {
        $scope.IsCheckAlreadyExists = true;
    }
    else {
        $scope.IsCheckAlreadyExists = false;
    }

    //Used for localization & globalization
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    $scope.$on('inputModified.formChanged', function (event, modified, formCtrl) {

        if (!$scope.isAddRole) {
            $scope.frmAddRole.modifiedModels = [];
        }

    });

    //Used while paging
    $scope.PageChange = function PageChange() {

        $scope.GetRoleList($scope.Role);
    }

    //Get User Role List
    $scope.GetRoleList = function (Role) {
        $rootScope.FormName = 'User Role';
        usSpinnerService.spin('GridSpinner');
        var Promise = UserRoleService.GetRoleList($scope.CurrentPage - 1, Role, true);
        Promise.then(function (Response) {
            //$scope.GetUserrights();
            if (Response.data != null && Response.data.length > 0) {
                $scope.RoleList = Response.data;
                $scope.TotalItems = $scope.RoleList[0].TotalItems;
            } else {
                $scope.RoleList = [];
                $scope.TotalItems = 0;
            }
            usSpinnerService.stop('GridSpinner');
        }, function (err) {
            usSpinnerService.stop('GridSpinner');
        });
    }

    //Migrate to Add Page
    $scope.GoToAddUserRolePage = function () {
        $rootScope.FormName = 'New User Role';
        $scope.IsCheckAlreadyExists = true;
        $location.path('/AddUserRole').search({ Edit: false });
    }

    //Get Menu's List
    $scope.GetMenuList = function () {
        usSpinnerService.spin('GridSpinner');
        var selRole = JSON.parse(sessionStorage.getItem('SelRole'));
        $scope.btnText = 'Save';
        var Promise = UserRoleService.GetMenuList();
        Promise.then(function (Response) {
            //$scope.GetUserrights();
            //$scope.MenuArray = [];
            //angular.forEach(Response.data.lstRoles, function (Test) {
            //    $scope.MenuArray.push(Test.objMenu);

            $scope.MenuArray = [];
            $scope.MenuArray1 = [];
            var totRowCnt = Response.data.lstRoles.length;
            var halfRowCnt = Math.ceil(totRowCnt / 2);
            angular.forEach(Response.data.lstRoles, function (Test) {
                if ($scope.MenuArray.length != halfRowCnt) {
                    $scope.MenuArray.push(Test.objMenu);
                }
                else {
                    $scope.MenuArray1.push(Test.objMenu);
                }
            })

            if (angular.isDefined(selRole) && selRole != null) {
                // $scope.Role = {};
                $scope.Role.Code = selRole.Code;
                $scope.Role.Description = selRole.Description;
                $scope.Role.RoleId = selRole.RoleId;
                $scope.btnText = 'Update';
                var Promise = UserRoleService.GetRoleDetails(selRole.RoleId);
                var z = 0;
                var x = 0;
                var y = 0;
                var w = 0;
                Promise.then(function (resp) {
                    for (var j = 0; j < resp.data.lstMenu.length; j++) {
                        angular.forEach($scope.MenuArray, function (Test) {

                            angular.forEach(Test.lstMenu, function (item) {
                                if (item.MenuId == resp.data.lstMenu[z].MenuId) {//&& item.Status == resp.data.lstMenu[z].Status
                                    item.IsAll = resp.data.lstMenu[z].IsAll;
                                    item.IsCreate = resp.data.lstMenu[z].IsCreate;
                                    item.IsUpdate = resp.data.lstMenu[z].IsUpdate;
                                    item.IsRead = resp.data.lstMenu[z].IsRead;
                                    item.IsPrint = resp.data.lstMenu[z].IsPrint;
                                    item.ParentId = resp.data.lstMenu[z].ParentId;
                                    $scope.selectedMenus.push({ MenuId: item.MenuId, ParentId: item.ParentId, IsAll: item.IsAll, IsCreate: item.IsCreate, IsUpdate: item.IsUpdate, IsRead: item.IsRead, IsPrint: item.IsPrint });
                                    // z++;
                                }

                            })
                        })
                        z++;
                    }

                    for (var j = 0; j < resp.data.lstMenu.length; j++) {
                        angular.forEach($scope.MenuArray, function (Test) {
                            angular.forEach(Test.lstInnerMenu, function (item) {
                                if (item.MenuId == resp.data.lstMenu[x].MenuId) {//&& item.Status == resp.data.lstMenu[z].Status
                                    item.IsAll = resp.data.lstMenu[x].IsAll;
                                    item.IsCreate = resp.data.lstMenu[x].IsCreate;
                                    item.IsUpdate = resp.data.lstMenu[x].IsUpdate;
                                    item.IsRead = resp.data.lstMenu[x].IsRead;
                                    item.IsPrint = resp.data.lstMenu[x].IsPrint;
                                    item.ParentId = resp.data.lstMenu[x].SubMenuID;
                                    $scope.selectedMenus.push({ MenuId: item.MenuId, ParentId: item.ParentId, IsAll: item.IsAll, IsCreate: item.IsCreate, IsUpdate: item.IsUpdate, IsRead: item.IsRead, IsPrint: item.IsPrint });
                                    // x++;
                                }

                            })
                        })
                        x++;
                    }

                    for (var j = 0; j < resp.data.lstMenu.length; j++) {
                        angular.forEach($scope.MenuArray1, function (Test) {

                            angular.forEach(Test.lstMenu, function (item) {
                                if (item.MenuId == resp.data.lstMenu[y].MenuId) {//&& item.Status == resp.data.lstMenu[y].Status
                                    item.IsAll = resp.data.lstMenu[y].IsAll;
                                    item.IsCreate = resp.data.lstMenu[y].IsCreate;
                                    item.IsUpdate = resp.data.lstMenu[y].IsUpdate;
                                    item.IsRead = resp.data.lstMenu[y].IsRead;
                                    item.IsPrint = resp.data.lstMenu[y].IsPrint;
                                    item.ParentId = resp.data.lstMenu[y].ParentId;
                                    $scope.selectedMenus.push({ MenuId: item.MenuId, ParentId: item.ParentId, IsAll: item.IsAll, IsCreate: item.IsCreate, IsUpdate: item.IsUpdate, IsRead: item.IsRead, IsPrint: item.IsPrint });
                                }

                            })
                        })
                        y++;
                    }

                    for (var j = 0; j < resp.data.lstMenu.length; j++) {
                        angular.forEach($scope.MenuArray1, function (Test) {
                            angular.forEach(Test.lstInnerMenu, function (item) {
                                if (item.MenuId == resp.data.lstMenu[w].MenuId) {//&& item.Status == resp.data.lstMenu[z].Status
                                    item.IsAll = resp.data.lstMenu[w].IsAll;
                                    item.IsCreate = resp.data.lstMenu[w].IsCreate;
                                    item.IsUpdate = resp.data.lstMenu[w].IsUpdate;
                                    item.IsRead = resp.data.lstMenu[w].IsRead;
                                    item.IsPrint = resp.data.lstMenu[w].IsPrint;
                                    item.ParentId = resp.data.lstMenu[w].SubMenuID;
                                    $scope.selectedMenus.push({ MenuId: item.MenuId, ParentId: item.ParentId, IsAll: item.IsAll, IsCreate: item.IsCreate, IsUpdate: item.IsUpdate, IsRead: item.IsRead, IsPrint: item.IsPrint });
                                }

                            })
                        })
                        w++;
                    }

                    $scope.frmAddRole.$setPristine();
                });
                sessionStorage.removeItem('SelRole');
            }
            $scope.MenuList = $scope.MenuArray;
            $scope.MenuList1 = $scope.MenuArray1;
            usSpinnerService.stop('GridSpinner');
        }, function (err) {
            usSpinnerService.stop('GridSpinner');
        });
    }

    //Update Status
    $scope.UpdateRoleStatus = function (item) {

        var Promise = UserRoleService.UpdateRoleStatus(item.RoleId, !item.Status);
        Promise.then(function (Response) {

            if (Response.data == 1) {
                item.Status = !item.Status;
                // alert("Status Updated Successfully");
                AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
            }
            else {
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            }
        });
    }

    //to open popup for reason for change on listing page
    $scope.ReasonForChange = function (index) {

        $scope.index = index;
        var modalInstance = $uibModal.open({
            templateUrl: 'ReasonModel',
            controller: 'ctrlImageUR',
            keyboard: false,
            backdrop: false,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            },
            size: 'md',
        })
        modalInstance.result.then(function (items) {     // return here umploaded image

            if (items == "") {
                // $scope.DoctorList[$scope.index].Status = !$scope.DoctorList[$scope.index].Status;
            }
            else {
                //$scope.Role = $scope.RoleList[$scope.index];
                $scope.Role.RoleId = $scope.RoleList[$scope.index].RoleId;
                $scope.Role.ReasonForAD = items;
                $scope.Role.TotalItems = $scope.RoleList[$scope.index].TotalItems;
                $scope.Role.Status = !$scope.RoleList[$scope.index].Status;
                $scope.AddRole($scope.Role);
            }

        })['finally'](function () {
            $scope.modalInstance = undefined  // <--- This fixes
        });;
    }

    //Migrate to Listing Page
    $scope.Back = function () {
        $location.path('/UserRoleList/');
    }

    //Inserting User Role
    $scope.AddRole = function (Role) {

        if (Role.ReasonForAD != null) {
            Role.lstMenuForSave = $scope.selectedMenus;

            var promise = UserRoleService.AddUserRole(Role);
            promise.then(function (Response) {
                if (Response.data.SuccessStatus == 1) {
                    //  $scope.Role = {};
                    $scope.Role.RoleId = Response.data.RoleId;
                    if ($scope.index != undefined) {
                        $scope.RoleList[$scope.index].Status = !$scope.RoleList[$scope.index].Status;
                    }
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    $scope.IsCheckAlreadyExists = false;
                }
                if (Response.data.SuccessStatus == 2) {
                    $scope.Role.RoleId = Response.data.RoleId;
                    if ($scope.index != undefined) {
                        $scope.RoleList[$scope.index].Status = !$scope.RoleList[$scope.index].Status;
                    }
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                    $scope.IsCheckAlreadyExists = false;
                }
            }, function (err) {

            });
        }
        else if ($scope.frmAddRole.$valid) {
            Role.lstMenuForSave = $scope.selectedMenus;

            var OldDataValue = [];
            //for (var i = 0; i < $scope.frmAddRole.modifiedModels.length; i++)
            //{
            //    if ($scope.frmAddRole.modifiedModels[i].masterValue === undefined || $scope.frmAddRole.modifiedModels[i].masterValue === null)
            //        $scope.frmAddRole.modifiedModels[i].masterValue = "";
            //    var jmodel = {
            //        field: $scope.frmAddRole.modifiedModels[i].$name,
            //        oldvalue: $scope.frmAddRole.modifiedModels[i].masterValue.toString(),
            //        newvalue: $scope.frmAddRole.modifiedModels[i].$viewValue.toString(),
            //        ID: i
            //    };
            //    OldDataValue.push(jmodel);
            //}

            var promise = UserRoleService.AddUserRole(Role, OldDataValue);
            promise.then(function (Response) {
                if (Response.data.SuccessStatus == 1) {
                    //  $scope.Role = {};
                    $scope.Role.RoleId = Response.data.RoleId;
                    if ($scope.index != undefined) {
                        $scope.RoleList[$scope.index].Status = !$scope.RoleList[$scope.index].Status;
                    }
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    $scope.IsCheckAlreadyExists = false;
                    $scope.frmAddRole.modifiedModels = [];
                    $scope.frmAddRole.$setPristine();

                }
                if (Response.data.SuccessStatus == 2) {
                    $scope.Role.RoleId = Response.data.RoleId;
                    if ($scope.index != undefined) {
                        $scope.RoleList[$scope.index].Status = !$scope.RoleList[$scope.index].Status;
                    }
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                    $scope.IsCheckAlreadyExists = false;
                    $scope.frmAddRole.modifiedModels = [];
                    $scope.frmAddRole.$setPristine();

                }
            }, function (err) {

            });
        }
        else {
            $scope.frmAddRole.Code.$dirty = true;
            $scope.frmAddRole.Description.$dirty = true;
            AlertMessage.warning(objResource.msgTitle, objResource.lblFillMandatoryFields);
        }
    }

    //Code,Description check for already exists
    $scope.CheckAlreadyExists = function CheckAlreadyExists(Role) {

        if ($scope.IsCheckAlreadyExists) {
            $scope.Role.IsInsertToRoleMaster = true;
            var promise = UserRoleService.CheckAlreadyExists(Role);
            promise.then(function (Response) {
                if (Response.data == 1) {
                    //alert("Code Already Exists");
                    AlertMessage.error(objResource.msgTitle, objResource.msgDuplication_Code);
                    return false;
                }
                else if (Response.data == 2) {
                    // alert("Description Already Exists");
                    AlertMessage.error(objResource.msgTitle, objResource.msgDuplication_Description);
                    return false;
                }
                else {

                    $scope.AddRole(Role);
                }
            }, function (err) {
            });
        }
        else {
            $scope.Role.IsInsertToRoleMaster = false;
            $scope.AddRole(Role);
        }
    }

    //Used to set condition for already exists functionality ,
    //when Code, Description changed
    $scope.CheckExists = function CheckExists() {

        $scope.isAddRole = true;
        $scope.IsCheckAlreadyExists = true;
    }

    //Used to toggle all buttons of left pane on check/uncheck of All button.
    $scope.toggleAll = function (ParentId, itemFromUI, index, IsOuter) {

        $scope.isAddRole = true;
        var IndexOuter;
        if (itemFromUI.IsAll == true) {
            if (IsOuter) {
                angular.forEach($scope.MenuList, function (item) {
                    if (item.MenuId == itemFromUI.ParentId) {
                        IndexOuter = $scope.MenuList.indexOf(item);
                    }
                });
                $scope.MenuList[IndexOuter].lstMenu[index].IsCreate = true;
                $scope.MenuList[IndexOuter].lstMenu[index].IsUpdate = true;
                $scope.MenuList[IndexOuter].lstMenu[index].IsRead = true;
                $scope.MenuList[IndexOuter].lstMenu[index].IsPrint = true;
                $scope.MenuList[IndexOuter].lstMenu[index].IsAll = true;

                itemFromUI.IsCreate = true;
                itemFromUI.IsUpdate = true;
                itemFromUI.IsRead = true;
                itemFromUI.IsPrint = true;
                itemFromUI.IsAll = true;

                angular.forEach($scope.MenuList[IndexOuter].lstInnerMenu, function (inItem) {
                    if (itemFromUI.MenuId == inItem.ParentId) {
                        inItem.IsCreate = true;
                        inItem.IsUpdate = true;
                        inItem.IsRead = true;
                        inItem.IsPrint = true;
                        inItem.IsAll = true;
                    }
                })
            }
            else {
                angular.forEach($scope.MenuList, function (item) {
                    if (item.MenuId == ParentId) {
                        IndexOuter = $scope.MenuList.indexOf(item);
                    }
                });
                //angular.forEach($scope.MenuList[IndexOuter].lstMenu, function (item) {
                //    if (item.MenuId == itemFromUI.ParentId) {
                //        IndexOuter = $scope.MenuList[IndexOuter].lstMenu.indexOf(item);
                //    }
                //});
                $scope.MenuList[IndexOuter].lstInnerMenu[index].IsCreate = true;
                $scope.MenuList[IndexOuter].lstInnerMenu[index].IsUpdate = true;
                $scope.MenuList[IndexOuter].lstInnerMenu[index].IsRead = true;
                $scope.MenuList[IndexOuter].lstInnerMenu[index].IsPrint = true;
                $scope.MenuList[IndexOuter].lstInnerMenu[index].IsAll = true;

                itemFromUI.IsCreate = true;
                itemFromUI.IsUpdate = true;
                itemFromUI.IsRead = true;
                itemFromUI.IsPrint = true;
                itemFromUI.IsAll = true;
            }

            var IsMatch = false;
            for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                var item = $scope.selectedMenus[index];
                if (item.MenuId == itemFromUI.MenuId) {
                    IsMatch = true;
                    item.IsCreate = true;
                    item.IsUpdate = true;
                    item.IsRead = true;
                    item.IsPrint = true;
                    item.IsAll = true;
                    //break;
                }
                if (item.ParentId == itemFromUI.MenuId) {
                    //  IsMatch = true;
                    item.IsCreate = true;
                    item.IsUpdate = true;
                    item.IsRead = true;
                    item.IsPrint = true;
                    item.IsAll = true;
                    //break;
                }
            }
            if (IsMatch == false) {
                $scope.selectedMenus.push({ MenuId: itemFromUI.MenuId, ParentId: itemFromUI.ParentId, IsAll: true, IsCreate: true, IsUpdate: true, IsRead: true, IsPrint: true });
                angular.forEach($scope.MenuList[IndexOuter].lstInnerMenu, function (inItem) {

                    if (itemFromUI.MenuId == inItem.ParentId) {
                        $scope.selectedMenus.push({ MenuId: inItem.MenuId, ParentId: inItem.ParentId, IsAll: true, IsCreate: true, IsUpdate: true, IsRead: true, IsPrint: true });
                    }
                })
            }

        }
        else {

            if (IsOuter) {
                angular.forEach($scope.MenuList, function (item) {
                    if (item.MenuId == itemFromUI.ParentId) {
                        IndexOuter = $scope.MenuList.indexOf(item);
                    }
                });
                $scope.MenuList[IndexOuter].lstMenu[index].IsCreate = false;
                $scope.MenuList[IndexOuter].lstMenu[index].IsUpdate = false;
                $scope.MenuList[IndexOuter].lstMenu[index].IsRead = false;
                $scope.MenuList[IndexOuter].lstMenu[index].IsPrint = false;
                $scope.MenuList[IndexOuter].lstMenu[index].IsAll = false;

                itemFromUI.IsCreate = false;
                itemFromUI.IsUpdate = false;
                itemFromUI.IsRead = false;
                itemFromUI.IsPrint = false;
                itemFromUI.IsAll = false;
                angular.forEach($scope.MenuList[IndexOuter].lstInnerMenu, function (inItem) {

                    if (itemFromUI.MenuId == inItem.ParentId) {
                        inItem.IsCreate = false;
                        inItem.IsUpdate = false;
                        inItem.IsRead = false;
                        inItem.IsPrint = false;
                        inItem.IsAll = false;
                    }
                })
            }
            else {
                angular.forEach($scope.MenuList, function (item) {
                    if (item.MenuId == ParentId) {
                        IndexOuter = $scope.MenuList.indexOf(item);
                    }
                });
                //angular.forEach($scope.MenuList[IndexOuter].lstMenu, function (item) {
                //    if (item.MenuId == itemFromUI.ParentId) {
                //        IndexOuter = $scope.MenuList[IndexOuter].lstMenu.indexOf(item);
                //    }
                //});
                $scope.MenuList[IndexOuter].lstInnerMenu[index].IsCreate = false;
                $scope.MenuList[IndexOuter].lstInnerMenu[index].IsUpdate = false;
                $scope.MenuList[IndexOuter].lstInnerMenu[index].IsRead = false;
                $scope.MenuList[IndexOuter].lstInnerMenu[index].IsPrint = false;
                $scope.MenuList[IndexOuter].lstInnerMenu[index].IsAll = false;

                itemFromUI.IsCreate = false;
                itemFromUI.IsUpdate = false;
                itemFromUI.IsRead = false;
                itemFromUI.IsPrint = false;
                itemFromUI.IsAll = false;
            }
            if ($scope.Role.RoleId == 0 || $scope.Role.RoleId == undefined) {
                for (var i = $scope.selectedMenus.length - 1; i >= 0; i--) {

                    if ($scope.selectedMenus[i].MenuId == itemFromUI.MenuId) {
                        $scope.selectedMenus.splice(i, 1);

                    }
                    if ($scope.selectedMenus[i].ParentId == itemFromUI.MenuId) {
                        $scope.selectedMenus.splice(i, 1);

                    }
                }

            }
            else {
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == itemFromUI.MenuId) {
                        item.IsCreate = false;
                        item.IsUpdate = false;
                        item.IsRead = false;
                        item.IsPrint = false;
                        item.IsAll = false;
                        //  break;
                    }
                    if (item.ParentId == itemFromUI.MenuId) {
                        item.IsCreate = false;
                        item.IsUpdate = false;
                        item.IsRead = false;
                        item.IsPrint = false;
                        item.IsAll = false;
                        //break;
                    }
                }

            }
        }
    }

    //Used to toggle all buttons of right pane on check/uncheck of All button.
    $scope.toggleAll1 = function (ParentId, itemFromUI, index, IsOuter) {

        $scope.isAddRole = true;
        var IndexOuter;
        if (itemFromUI.IsAll == true) {
            if (IsOuter) {
                angular.forEach($scope.MenuList1, function (item) {
                    if (item.MenuId == itemFromUI.ParentId) {
                        IndexOuter = $scope.MenuList1.indexOf(item);
                    }
                });
                $scope.MenuList1[IndexOuter].lstMenu[index].IsCreate = true;
                $scope.MenuList1[IndexOuter].lstMenu[index].IsUpdate = true;
                $scope.MenuList1[IndexOuter].lstMenu[index].IsRead = true;
                $scope.MenuList1[IndexOuter].lstMenu[index].IsPrint = true;
                $scope.MenuList1[IndexOuter].lstMenu[index].IsAll = true;

                itemFromUI.IsCreate = true;
                itemFromUI.IsUpdate = true;
                itemFromUI.IsRead = true;
                itemFromUI.IsPrint = true;
                itemFromUI.IsAll = true;

                angular.forEach($scope.MenuList1[IndexOuter].lstInnerMenu, function (inItem) {
                    if (itemFromUI.MenuId == inItem.ParentId) {
                        inItem.IsCreate = true;
                        inItem.IsUpdate = true;
                        inItem.IsRead = true;
                        inItem.IsPrint = true;
                        inItem.IsAll = true;
                    }
                })
            }
            else {
                angular.forEach($scope.MenuList1, function (item) {
                    if (item.MenuId == ParentId) {
                        IndexOuter = $scope.MenuList1.indexOf(item);
                    }
                });
                //angular.forEach($scope.MenuList1[IndexOuter].lstMenu, function (item) {
                //    if (item.MenuId == itemFromUI.ParentId) {
                //        IndexOuter = $scope.MenuList1[IndexOuter].lstMenu.indexOf(item);
                //    }
                //});
                $scope.MenuList1[IndexOuter].lstInnerMenu[index].IsCreate = true;
                $scope.MenuList1[IndexOuter].lstInnerMenu[index].IsUpdate = true;
                $scope.MenuList1[IndexOuter].lstInnerMenu[index].IsRead = true;
                $scope.MenuList1[IndexOuter].lstInnerMenu[index].IsPrint = true;
                $scope.MenuList1[IndexOuter].lstInnerMenu[index].IsAll = true;

                itemFromUI.IsCreate = true;
                itemFromUI.IsUpdate = true;
                itemFromUI.IsRead = true;
                itemFromUI.IsPrint = true;
                itemFromUI.IsAll = true;
            }

            var IsMatch = false;
            for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                var item = $scope.selectedMenus[index];
                if (item.MenuId == itemFromUI.MenuId) {
                    IsMatch = true;
                    item.IsCreate = true;
                    item.IsUpdate = true;
                    item.IsRead = true;
                    item.IsPrint = true;
                    item.IsAll = true;
                    //break;
                }
                if (item.ParentId == itemFromUI.MenuId) {
                    //  IsMatch = true;
                    item.IsCreate = true;
                    item.IsUpdate = true;
                    item.IsRead = true;
                    item.IsPrint = true;
                    item.IsAll = true;
                    //break;
                }
            }
            if (IsMatch == false) {
                $scope.selectedMenus.push({ MenuId: itemFromUI.MenuId, ParentId: itemFromUI.ParentId, IsAll: true, IsCreate: true, IsUpdate: true, IsRead: true, IsPrint: true });
                angular.forEach($scope.MenuList1[IndexOuter].lstInnerMenu, function (inItem) {

                    if (itemFromUI.MenuId == inItem.ParentId) {
                        $scope.selectedMenus.push({ MenuId: inItem.MenuId, ParentId: inItem.ParentId, IsAll: true, IsCreate: true, IsUpdate: true, IsRead: true, IsPrint: true });
                    }
                })
            }
            // $scope.frmAddRole.$setPristine();

        }
        else {

            if (IsOuter) {
                angular.forEach($scope.MenuList1, function (item) {
                    if (item.MenuId == itemFromUI.ParentId) {
                        IndexOuter = $scope.MenuList1.indexOf(item);
                    }
                });
                $scope.MenuList1[IndexOuter].lstMenu[index].IsCreate = false;
                $scope.MenuList1[IndexOuter].lstMenu[index].IsUpdate = false;
                $scope.MenuList1[IndexOuter].lstMenu[index].IsRead = false;
                $scope.MenuList1[IndexOuter].lstMenu[index].IsPrint = false;
                $scope.MenuList1[IndexOuter].lstMenu[index].IsAll = false;

                itemFromUI.IsCreate = false;
                itemFromUI.IsUpdate = false;
                itemFromUI.IsRead = false;
                itemFromUI.IsPrint = false;
                itemFromUI.IsAll = false;
                angular.forEach($scope.MenuList1[IndexOuter].lstInnerMenu, function (inItem) {

                    if (itemFromUI.MenuId == inItem.ParentId) {
                        inItem.IsCreate = false;
                        inItem.IsUpdate = false;
                        inItem.IsRead = false;
                        inItem.IsPrint = false;
                        inItem.IsAll = false;
                    }
                })
            }
            else {
                angular.forEach($scope.MenuList1, function (item) {
                    if (item.MenuId == ParentId) {
                        IndexOuter = $scope.MenuList1.indexOf(item);
                    }
                });
                //angular.forEach($scope.MenuList1[IndexOuter].lstMenu, function (item) {
                //    if (item.MenuId == itemFromUI.ParentId) {
                //        IndexOuter = $scope.MenuList1[IndexOuter].lstMenu.indexOf(item);
                //    }
                //});             
                $scope.MenuList1[IndexOuter].lstInnerMenu[index].IsCreate = false;
                $scope.MenuList1[IndexOuter].lstInnerMenu[index].IsUpdate = false;
                $scope.MenuList1[IndexOuter].lstInnerMenu[index].IsRead = false;
                $scope.MenuList1[IndexOuter].lstInnerMenu[index].IsPrint = false;
                $scope.MenuList1[IndexOuter].lstInnerMenu[index].IsAll = false;

                itemFromUI.IsCreate = false;
                itemFromUI.IsUpdate = false;
                itemFromUI.IsRead = false;
                itemFromUI.IsPrint = false;
                itemFromUI.IsAll = false;
            }
            if ($scope.Role.RoleId == 0 || $scope.Role.RoleId == undefined) {
                for (var i = $scope.selectedMenus.length - 1; i >= 0; i--) {

                    if ($scope.selectedMenus[i].MenuId == itemFromUI.MenuId) {
                        $scope.selectedMenus.splice(i, 1);

                    }
                    if ($scope.selectedMenus[i].ParentId == itemFromUI.MenuId) {
                        $scope.selectedMenus.splice(i, 1);

                    }
                }

            }
            else {
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == itemFromUI.MenuId) {
                        item.IsCreate = false;
                        item.IsUpdate = false;
                        item.IsRead = false;
                        item.IsPrint = false;
                        item.IsAll = false;
                        //  break;
                    }
                    if (item.ParentId == itemFromUI.MenuId) {
                        item.IsCreate = false;
                        item.IsUpdate = false;
                        item.IsRead = false;
                        item.IsPrint = false;
                        item.IsAll = false;
                        //break;
                    }
                }

            }
            //$scope.frmAddRole.$setPristine();

        }
    }

    //Used to toggle each button separately of left pane on check/uncheck.
    $scope.ToggleIs = function (Istoggle, MenuId, ToggleCriteria, IsOuter, MainParentId, ChildParentId, indexUI) {
        $scope.isAddRole = true;
        var IndexOuter;
        if (ToggleCriteria == 1) {
            if (Istoggle == true) {
                var IsMatch = false;
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        IsMatch = true;
                        item.IsCreate = true;
                        if (item.IsCreate && item.IsUpdate && item.IsRead && item.IsPrint) {
                            item.IsAll = true;
                            if (IsOuter) {
                                angular.forEach($scope.MenuList, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList.indexOf(item);
                                    }
                                });
                                $scope.MenuList[IndexOuter].lstMenu[indexUI].IsAll = true;
                            }
                            else {
                                angular.forEach($scope.MenuList, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList.indexOf(item);
                                    }
                                });
                                //angular.forEach($scope.MenuList[IndexOuter].lstMenu, function (item) {
                                //    if (item.MenuId == ChildParentId) {
                                //        IndexOuter = $scope.MenuList[IndexOuter].lstMenu.indexOf(item);
                                //    }
                                //});
                                $scope.MenuList[IndexOuter].lstInnerMenu[indexUI].IsAll = true;
                            }
                        }
                        break;
                    }
                }
                if (IsMatch == false) {
                    $scope.selectedMenus.push({ MenuId: MenuId, IsAll: false, IsCreate: true, IsUpdate: false, IsRead: false, IsPrint: false });
                }
            }
            else {
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        item.IsAll = false;
                        item.IsCreate = false;
                        if (!item.IsUpdate && !item.IsRead && !item.IsPrint) {
                            if ($scope.Role.RoleId == 0 || $scope.Role.RoleId == undefined) {
                                $scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);
                            }
                        }
                        break;
                    }
                }
                if (IsOuter) {
                    angular.forEach($scope.MenuList, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList.indexOf(item);
                        }
                    });
                    $scope.MenuList[IndexOuter].lstMenu[indexUI].IsAll = false;
                }
                else {
                    angular.forEach($scope.MenuList, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList.indexOf(item);
                        }
                    });
                    //angular.forEach($scope.MenuList[IndexOuter].lstMenu, function (item) {
                    //    if (item.MenuId == ChildParentId) {
                    //        IndexOuter = $scope.MenuList[IndexOuter].lstMenu.indexOf(item);
                    //    }
                    //});
                    $scope.MenuList[IndexOuter].lstInnerMenu[indexUI].IsAll = false;
                }
            }
        }
        else if (ToggleCriteria == 2) {
            if (Istoggle == true) {
                var IsMatch = false;
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        IsMatch = true;
                        item.IsUpdate = true;
                        if (item.IsCreate && item.IsUpdate && item.IsRead && item.IsPrint) {
                            item.IsAll = true;
                            if (IsOuter) {
                                angular.forEach($scope.MenuList, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList.indexOf(item);
                                    }
                                });
                                $scope.MenuList[IndexOuter].lstMenu[indexUI].IsAll = true;
                            }
                            else {
                                angular.forEach($scope.MenuList, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList.indexOf(item);
                                    }
                                });
                                //angular.forEach($scope.MenuList[IndexOuter].lstMenu, function (item) {
                                //    if (item.MenuId == ChildParentId) {
                                //        IndexOuter = $scope.MenuList[IndexOuter].lstMenu.indexOf(item);
                                //    }
                                //});
                                $scope.MenuList[IndexOuter].lstInnerMenu[indexUI].IsAll = true;
                            }
                        }
                        break;
                    }
                }
                if (IsMatch == false) {
                    $scope.selectedMenus.push({ MenuId: MenuId, IsAll: false, IsCreate: false, IsUpdate: true, IsRead: false, IsPrint: false });
                }
            }
            else {
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        item.IsAll = false;
                        item.IsUpdate = false;
                        if (!item.IsCreate && !item.IsRead && !item.IsPrint) {
                            if ($scope.Role.RoleId == 0 || $scope.Role.RoleId == undefined) {
                                $scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);
                            }
                        }
                        break;
                    }
                }
                if (IsOuter) {
                    angular.forEach($scope.MenuList, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList.indexOf(item);
                        }
                    });
                    $scope.MenuList[IndexOuter].lstMenu[indexUI].IsAll = false;
                }
                else {
                    angular.forEach($scope.MenuList, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList.indexOf(item);
                        }
                    });
                    //angular.forEach($scope.MenuList[IndexOuter].lstMenu, function (item) {
                    //    if (item.MenuId == ChildParentId) {
                    //        IndexOuter = $scope.MenuList[IndexOuter].lstMenu.indexOf(item);
                    //    }
                    //});
                    $scope.MenuList[IndexOuter].lstInnerMenu[indexUI].IsAll = false;
                }
                //$scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);
            }
        }
        else if (ToggleCriteria == 3) {
            if (Istoggle == true) {
                var IsMatch = false;
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        IsMatch = true;
                        item.IsRead = true;
                        if (item.IsCreate && item.IsUpdate && item.IsRead && item.IsPrint) {
                            item.IsAll = true;
                            if (IsOuter) {
                                angular.forEach($scope.MenuList, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList.indexOf(item);
                                    }
                                });
                                $scope.MenuList[IndexOuter].lstMenu[indexUI].IsAll = true;
                            }
                            else {
                                angular.forEach($scope.MenuList, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList.indexOf(item);
                                    }
                                });
                                //angular.forEach($scope.MenuList[IndexOuter].lstMenu, function (item) {
                                //    if (item.MenuId == ChildParentId) {
                                //        IndexOuter = $scope.MenuList[IndexOuter].lstMenu.indexOf(item);
                                //    }
                                //});
                                $scope.MenuList[IndexOuter].lstInnerMenu[indexUI].IsAll = true;
                            }
                        }
                        break;
                    }
                }
                if (IsMatch == false) {
                    $scope.selectedMenus.push({ MenuId: MenuId, IsAll: false, IsCreate: false, IsUpdate: false, IsRead: true, IsPrint: false });
                }
            }
            else {
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        item.IsAll = false;
                        item.IsRead = false;
                        if (!item.IsCreate && !item.IsUpdate && !item.IsPrint) {
                            if ($scope.Role.RoleId == 0 || $scope.Role.RoleId == undefined) {
                                $scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);
                            }
                        }
                        break;
                    }
                }
                if (IsOuter) {
                    angular.forEach($scope.MenuList, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList.indexOf(item);
                        }
                    });
                    $scope.MenuList[IndexOuter].lstMenu[indexUI].IsAll = false;
                }
                else {
                    angular.forEach($scope.MenuList, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList.indexOf(item);
                        }
                    });
                    //angular.forEach($scope.MenuList[IndexOuter].lstMenu, function (item) {
                    //    if (item.MenuId == ChildParentId) {
                    //        IndexOuter = $scope.MenuList[IndexOuter].lstMenu.indexOf(item);
                    //    }
                    //});
                    $scope.MenuList[IndexOuter].lstInnerMenu[indexUI].IsAll = false;
                }
                //$scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);
            }
        }
        else if (ToggleCriteria == 4) {
            if (Istoggle == true) {
                var IsMatch = false;
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        IsMatch = true;
                        item.IsPrint = true;
                        if (item.IsCreate && item.IsUpdate && item.IsRead && item.IsPrint) {
                            item.IsAll = true;
                            if (IsOuter) {
                                angular.forEach($scope.MenuList, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList.indexOf(item);
                                    }
                                });
                                $scope.MenuList[IndexOuter].lstMenu[indexUI].IsAll = true;
                            }
                            else {
                                angular.forEach($scope.MenuList, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList.indexOf(item);
                                    }
                                });
                                //angular.forEach($scope.MenuList[IndexOuter].lstMenu, function (item) {
                                //    if (item.MenuId == ChildParentId) {
                                //        IndexOuter = $scope.MenuList[IndexOuter].lstMenu.indexOf(item);
                                //    }
                                //});
                                $scope.MenuList[IndexOuter].lstInnerMenu[indexUI].IsAll = true;
                            }
                        }
                        break;
                    }
                }
                if (IsMatch == false) {
                    $scope.selectedMenus.push({ MenuId: MenuId, IsAll: false, IsCreate: false, IsUpdate: false, IsRead: false, IsPrint: true });
                }
            }
            else {
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        item.IsAll = false;
                        item.IsPrint = false;
                        if (!item.IsCreate && !item.IsUpdate && !item.IsRead) {
                            if ($scope.Role.RoleId == 0 || $scope.Role.RoleId == undefined) {
                                $scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);
                            }
                        }
                        break;
                    }
                }
                // $scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);

                if (IsOuter) {
                    angular.forEach($scope.MenuList, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList.indexOf(item);
                        }
                    });
                    $scope.MenuList[IndexOuter].lstMenu[indexUI].IsAll = false;
                }
                else {
                    angular.forEach($scope.MenuList, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList.indexOf(item);
                        }
                    });
                    //angular.forEach($scope.MenuList[IndexOuter].lstMenu, function (item) {
                    //    if (item.MenuId == ChildParentId) {
                    //        IndexOuter = $scope.MenuList[IndexOuter].lstMenu.indexOf(item);
                    //    }
                    //});
                    $scope.MenuList[IndexOuter].lstInnerMenu[indexUI].IsAll = false;
                }

            }
        }

    }

    //Used to toggle each button separately of right pane on check/uncheck.
    $scope.ToggleIs1 = function (Istoggle, MenuId, ToggleCriteria, IsOuter, MainParentId, ChildParentId, indexUI) {
        $scope.isAddRole = true;
        var IndexOuter;
        if (ToggleCriteria == 1) {
            if (Istoggle == true) {
                var IsMatch = false;
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        IsMatch = true;
                        item.IsCreate = true;
                        if (item.IsCreate && item.IsUpdate && item.IsRead && item.IsPrint) {
                            item.IsAll = true;
                            if (IsOuter) {
                                angular.forEach($scope.MenuList1, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList1.indexOf(item);
                                    }
                                });
                                $scope.MenuList1[IndexOuter].lstMenu[indexUI].IsAll = true;
                            }
                            else {
                                angular.forEach($scope.MenuList1, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList1.indexOf(item);
                                    }
                                });
                                //angular.forEach($scope.MenuList1[IndexOuter].lstMenu, function (item) {
                                //    if (item.MenuId == ChildParentId) {
                                //        IndexOuter = $scope.MenuList1[IndexOuter].lstMenu.indexOf(item);
                                //    }
                                //});
                                $scope.MenuList1[IndexOuter].lstInnerMenu[indexUI].IsAll = true;
                            }
                        }
                        break;
                    }
                }
                if (IsMatch == false) {
                    $scope.selectedMenus.push({ MenuId: MenuId, IsAll: false, IsCreate: true, IsUpdate: false, IsRead: false, IsPrint: false });
                }
            }
            else {
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        item.IsAll = false;
                        item.IsCreate = false;
                        if (!item.IsUpdate && !item.IsRead && !item.IsPrint) {
                            if ($scope.Role.RoleId == 0 || $scope.Role.RoleId == undefined) {
                                $scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);
                            }
                        }
                        break;
                    }
                }
                if (IsOuter) {
                    angular.forEach($scope.MenuList1, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList1.indexOf(item);
                        }
                    });
                    $scope.MenuList1[IndexOuter].lstMenu[indexUI].IsAll = false;
                }
                else {
                    angular.forEach($scope.MenuList1, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList1.indexOf(item);
                        }
                    });
                    //angular.forEach($scope.MenuList1[IndexOuter].lstMenu, function (item) {
                    //    if (item.MenuId == ChildParentId) {
                    //        IndexOuter = $scope.MenuList1[IndexOuter].lstMenu.indexOf(item);
                    //    }
                    //});
                    $scope.MenuList1[IndexOuter].lstInnerMenu[indexUI].IsAll = false;
                }
            }
        }
        else if (ToggleCriteria == 2) {
            if (Istoggle == true) {
                var IsMatch = false;
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        IsMatch = true;
                        item.IsUpdate = true;
                        if (item.IsCreate && item.IsUpdate && item.IsRead && item.IsPrint) {
                            item.IsAll = true;
                            if (IsOuter) {
                                angular.forEach($scope.MenuList1, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList1.indexOf(item);
                                    }
                                });
                                $scope.MenuList1[IndexOuter].lstMenu[indexUI].IsAll = true;
                            }
                            else {
                                angular.forEach($scope.MenuList1, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList1.indexOf(item);
                                    }
                                });
                                //angular.forEach($scope.MenuList1[IndexOuter].lstMenu, function (item) {
                                //    if (item.MenuId == ChildParentId) {
                                //        IndexOuter = $scope.MenuList1[IndexOuter].lstMenu.indexOf(item);
                                //    }
                                //});
                                $scope.MenuList1[IndexOuter].lstInnerMenu[indexUI].IsAll = true;
                            }
                        }
                        break;
                    }
                }
                if (IsMatch == false) {
                    $scope.selectedMenus.push({ MenuId: MenuId, IsAll: false, IsCreate: false, IsUpdate: true, IsRead: false, IsPrint: false });
                }
            }
            else {
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        item.IsAll = false;
                        item.IsUpdate = false;
                        if (!item.IsCreate && !item.IsRead && !item.IsPrint) {
                            if ($scope.Role.RoleId == 0 || $scope.Role.RoleId == undefined) {
                                $scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);
                            }
                        }
                        break;
                    }
                }
                if (IsOuter) {
                    angular.forEach($scope.MenuList1, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList1.indexOf(item);
                        }
                    });
                    $scope.MenuList1[IndexOuter].lstMenu[indexUI].IsAll = false;
                }
                else {
                    angular.forEach($scope.MenuList1, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList1.indexOf(item);
                        }
                    });
                    //angular.forEach($scope.MenuList1[IndexOuter].lstMenu, function (item) {
                    //    if (item.MenuId == ChildParentId) {
                    //        IndexOuter = $scope.MenuList1[IndexOuter].lstMenu.indexOf(item);
                    //    }
                    //});
                    $scope.MenuList1[IndexOuter].lstInnerMenu[indexUI].IsAll = false;
                }
                //$scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);
            }
        }
        else if (ToggleCriteria == 3) {
            if (Istoggle == true) {
                var IsMatch = false;
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        IsMatch = true;
                        item.IsRead = true;
                        if (item.IsCreate && item.IsUpdate && item.IsRead && item.IsPrint) {
                            item.IsAll = true;
                            if (IsOuter) {
                                angular.forEach($scope.MenuList1, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList1.indexOf(item);
                                    }
                                });
                                $scope.MenuList1[IndexOuter].lstMenu[indexUI].IsAll = true;
                            }
                            else {
                                angular.forEach($scope.MenuList1, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList1.indexOf(item);
                                    }
                                });
                                //angular.forEach($scope.MenuList1[IndexOuter].lstMenu, function (item) {
                                //    if (item.MenuId == ChildParentId) {
                                //        IndexOuter = $scope.MenuList1[IndexOuter].lstMenu.indexOf(item);
                                //    }
                                //});
                                $scope.MenuList1[IndexOuter].lstInnerMenu[indexUI].IsAll = true;
                            }
                        }
                        break;
                    }
                }
                if (IsMatch == false) {
                    $scope.selectedMenus.push({ MenuId: MenuId, IsAll: false, IsCreate: false, IsUpdate: false, IsRead: true, IsPrint: false });
                }
            }
            else {
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        item.IsAll = false;
                        item.IsRead = false;
                        if (!item.IsCreate && !item.IsUpdate && !item.IsPrint) {
                            if ($scope.Role.RoleId == 0 || $scope.Role.RoleId == undefined) {
                                $scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);
                            }
                        }
                        break;
                    }
                }
                if (IsOuter) {
                    angular.forEach($scope.MenuList1, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList1.indexOf(item);
                        }
                    });
                    $scope.MenuList1[IndexOuter].lstMenu[indexUI].IsAll = false;
                }
                else {
                    angular.forEach($scope.MenuList1, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList1.indexOf(item);
                        }
                    });
                    //angular.forEach($scope.MenuList1[IndexOuter].lstMenu, function (item) {
                    //    if (item.MenuId == ChildParentId) {
                    //        IndexOuter = $scope.MenuList1[IndexOuter].lstMenu.indexOf(item);
                    //    }
                    //});
                    $scope.MenuList1[IndexOuter].lstInnerMenu[indexUI].IsAll = false;
                }
                //$scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);
            }
        }
        else if (ToggleCriteria == 4) {
            if (Istoggle == true) {
                var IsMatch = false;
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        IsMatch = true;
                        item.IsPrint = true;
                        if (item.IsCreate && item.IsUpdate && item.IsRead && item.IsPrint) {
                            item.IsAll = true;
                            if (IsOuter) {
                                angular.forEach($scope.MenuList1, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList1.indexOf(item);
                                    }
                                });
                                $scope.MenuList1[IndexOuter].lstMenu[indexUI].IsAll = true;
                            }
                            else {
                                angular.forEach($scope.MenuList1, function (item) {
                                    if (item.MenuId == MainParentId) {
                                        IndexOuter = $scope.MenuList1.indexOf(item);
                                    }
                                });
                                //angular.forEach($scope.MenuList1[IndexOuter].lstMenu, function (item) {
                                //    if (item.MenuId == ChildParentId) {
                                //        IndexOuter = $scope.MenuList1[IndexOuter].lstMenu.indexOf(item);
                                //    }
                                //});
                                $scope.MenuList1[IndexOuter].lstInnerMenu[indexUI].IsAll = true;
                            }
                        }
                        break;
                    }
                }
                if (IsMatch == false) {
                    $scope.selectedMenus.push({ MenuId: MenuId, IsAll: false, IsCreate: false, IsUpdate: false, IsRead: false, IsPrint: true });
                }
            }
            else {
                for (var index = 0; index < $scope.selectedMenus.length; ++index) {
                    var item = $scope.selectedMenus[index];
                    if (item.MenuId == MenuId) {
                        item.IsAll = false;
                        item.IsPrint = false;
                        if (!item.IsCreate && !item.IsUpdate && !item.IsRead) {
                            if ($scope.Role.RoleId == 0 || $scope.Role.RoleId == undefined) {
                                $scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);
                            }
                        }
                        break;
                    }
                }
                // $scope.selectedMenus.splice($scope.selectedMenus.indexOf(MenuId), 1);

                if (IsOuter) {
                    angular.forEach($scope.MenuList1, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList1.indexOf(item);
                        }
                    });
                    $scope.MenuList1[IndexOuter].lstMenu[indexUI].IsAll = false;
                }
                else {
                    angular.forEach($scope.MenuList1, function (item) {
                        if (item.MenuId == MainParentId) {
                            IndexOuter = $scope.MenuList1.indexOf(item);
                        }
                    });
                    //angular.forEach($scope.MenuList1[IndexOuter].lstMenu, function (item) {
                    //    if (item.MenuId == ChildParentId) {
                    //        IndexOuter = $scope.MenuList1[IndexOuter].lstMenu.indexOf(item);
                    //    }
                    //});
                    $scope.MenuList1[IndexOuter].lstInnerMenu[indexUI].IsAll = false;
                }

            }
        }

    }

    ///Used to clear data
    function Clear() {
        //   $scope.Role = {};
        $scope.selectedMenus = [];
        //  var selectedMenus = '';
        $scope.MenuArray = [];
        $scope.frmAddRole.$setPristine();
    }

    //Used while editing
    $scope.ViewRole = function (item) {
        $rootScope.FormName = 'View/Edit User Role';
        $scope.IsCheckAlreadyExists = false;
        sessionStorage.setItem('SelRole', JSON.stringify(item));
        $location.path('/AddUserRole').search({ Edit: true });
    }

    //to export data to excel
    $scope.exportToExcel = function exportToExcel(tableId, $event) {

        if ($event.srcElement.className == "glyphicon glyphicon-print") {
            var Promise = UserRoleService.GetRoleList($scope.CurrentPage - 1, $scope.Role, false);
            Promise.then(function (Response) {
                var filteredData = _.map(Response.data, function (data) {

                    var users = {
                        'Code': data.Code,
                        'Description': data.Description,
                    }
                    return users;
                });

                alasql('SELECT * INTO XLSX("UserRoleList.xlsx",{headers:true}) FROM ?', [filteredData]);
            },
                function (error) {
                    $scope.Message = "Error" + error.status;
                });
        }
        // }
    }

    $scope.GetUserrights = function () {
        debugger;
        var lstUserRights = Common.getUserRights();
        //if (selectPatient.GenderID == 1) {
        for (var z = 0; z <= lstUserRights.length - 1; z++) {
            if (lstUserRights[z].MenuId == 101 && lstUserRights[z].Active)//User Role
            {
                $scope.objRgt = lstUserRights[z];
                break;
            }
        }
        //}
        if (!$scope.objRgt.IsCreate && (angular.isUndefined(selRoleh) || selRoleh == null)) {
            //angular.element(btnAddNewRole).prop('disabled', true);
            angular.element(btnSave).prop('disabled', true);
        }
        else if (!$scope.objRgt.IsUpdate && (angular.isDefined(selRoleh) || selRoleh != null)) {
            //angular.element(btnAddNewRole).prop('disabled', true);
            angular.element(btnSave).prop('disabled', true);
        }
        else {
            //angular.element(btnAddNewRole).prop('disabled', false);
            angular.element(btnSave).prop('disabled', false);
        }
    }  // For User rights configuration
});

//to open popup for reason for change on listing page
PIVF.controller('ctrlImageUR', function ($scope, $uibModalInstance, items) {
    $scope.myCroppedImage = '';

    $scope.items = { myCroppedImage: '' };

    $scope.ClosePopUp = function ClosePopUp() {

        $uibModalInstance.close("");
    }

    $scope.ReasonOk = function (Reason) {
        $uibModalInstance.close(Reason);
    };
});