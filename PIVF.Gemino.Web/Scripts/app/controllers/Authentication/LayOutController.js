'use strict';
PIVF.controller('LayOutController', ['$scope', 'API', 'PatientInfo', 'authService', '$window', '$routeParams', '$location', '$rootScope', 'LogInServ', 'Common', '$uibModal', '$route', 'localStorageService', function ($scope, API, PatientInfo, authService, $window, $routeParams, $location, $rootScope, LogInServ, Common, $uibModal, $route, localStorageService) {
    //DATA Members Declaration
    $rootScope.CoupleDetails = {};
    $rootScope.CoupleDetails.FemalePatient = {};
    $rootScope.CoupleDetails.MalePatient = {};
    $scope.PatientCategory = 0;
    $rootScope.IsFemale = 0;
    $rootScope.IsMale = 0;
    $rootScope.OrderList = 0;   //By Umesh for order investigation and prescription
    $scope.width = '';
    $scope.path = '';
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    // var lstUserRights = [];
    $scope.logOut = function () {
        authService.logOut();

        var response2 = authService.activetickets($scope.landFirstName, $scope.landFirstName, false, 1).then(function (response2) {
            //;
            localStorageService.remove('authorizationData');
            $window.location.href = API.Baseurl;
        },
        function (err) {

            //;
            $scope.Message = err.error_description;
        });
        //$window.location.href = ngAuthSettings.apiServiceBaseUri;

        // $window.location.href = API.Baseurl;
    }
    if (localStorageService.get("UserInfo"))
        authService.authentication.FullName = localStorageService.get("UserInfo").UserName;
    $scope.authentication = authService.authentication;
    if (!authService.authentication.IsLogOut) {
        var responseData = LogInServ.GetCurrentUser();
        responseData.then(function (Response) {
            $scope.PatientId = Response.value;
            if ($scope.PatientId == "" || $scope.PatientId == 0) {
                //
                $window.location.href = API.Baseurl;
            }
            else {
                //;
                //crumble.context = { thing: 'Home' };
                //crumble.update();
                //$rootScope.scrumble = crumble;
            }
        }, function (error) {
            alert("error" + error.status);
        });
    }

    $scope.RedirectToEMRPage = function RedirectToEMRPage(model) {
        $scope.onSelect(model);
    };
    $scope.GetUserRights = function () {
        if (localStorageService.get("UserInfo") && localStorageService.get("UserInfo").UnitID == 1) {
            $scope.isHOUser = true;
            $location.path('/UserList');
        } else {
            $scope.isHOUser = false;
            //$location.path('/Queue');
        }
        authService.GetUserRoleRights().then(function (response) {
            Common.clearUserRights();
            Common.setUserRights(response.data);
            //       lstUserRights = response.data;
        },
       function (err) {
       });
    }
    //Added by Manohar
    $scope.CheckSinglePatient = function CheckSinglePatient(IsSinglePatient) {

        PatientInfo.IsSinglePatient = IsSinglePatient;
    }

    $scope.BindGrandParentList = function () {
        //by rohini for Patient List ON dashboard
        $scope.getpatientlist(7); //by default couple
        $scope.IsQueue = false;
        $scope.IsCycle = false;
        $scope.IsPatient = false;
        $scope.IsDonor = false;
        $scope.IsCryoBank = false;
        $scope.IsConfiguration = false;
        $scope.lsMPatient = false;
        //  
        var Response = authService.BindGrandParentList();
        Response.then(function (resp) {
            $scope.GrandParentList = resp.data;
            if ($scope.GrandParentList.length > 0) {
                var Menus = [];
                debugger;
                angular.forEach($scope.GrandParentList, function (i) {
                    if (i.Title == 'Administration') {
                        $scope.IsConfiguration = true;
                        $scope.ConfigID = i.MenuId;
                    }
                    else if (i.Title == 'Patient EMR') {
                        $scope.IsPatient = true;
                        //   $scope.ConfigID = i.MenuId;
                    }
                    else if (i.Title == 'Queue Management') {
                        $scope.IsQueue = true;
                        $scope.QID = i.MenuId;
                    }
                    else if (i.Title == 'Cycles') {
                        $scope.IsCycle = true;
                        $scope.CycleID = i.MenuId;
                    }
                    else if (i.Title == 'Donor/Surrogate') {
                        $scope.IsDonor = true;
                        $scope.DonorID = i.MenuId;
                    }
                    else if (i.Title == 'Cryo Bank') {
                        $scope.IsCryoBank = true;
                        $scope.CryoBankID = i.MenuId;
                    } else if (i.Title == 'Patient') {

                        $scope.IsMPatient = true;
                    } else if (i.Title == 'Billing') {

                        $scope.IsBilling = true;
                    } else if (i.Title == 'Appointment') {

                        $scope.IsAppointment = true;
                    }
                });
            }
        });
    }
    $scope.FemaleParentList = [];
    $scope.MaleParentList = [];
    $scope.BindParentList = function (Id) {
        var Response = authService.BindParentList(Id);
        Response.then(function (resp) {
            if (Id == 0) {
                $scope.MaleParentList.length = 0;
                $scope.FemaleParentList.length = 0;
                angular.forEach(resp.data, function (item) {

                    var Menus = item.Title.split(' ');
                    if (Menus.indexOf('Female') > -1) {
                        Menus.splice(0, 1);
                        item.IconTitle = Menus.join(' ');
                    }
                    else if (Menus.indexOf('Male') > -1) {
                        Menus.splice(0, 1);
                        item.IconTitle = Menus.join(' ');
                    }
                    else {
                        item.IconTitle = item.Title;
                    }
                    if (item.MenuFor == 1)
                        $scope.MaleParentList.push(item);
                    else if (item.MenuFor == 2)
                        $scope.FemaleParentList.push(item);
                })
                //  $scope.ParentList = resp.data;
            }
            else $scope.FirstLvlParentList = resp.data;
        });
    }

    $scope.BindChildList = function (parentid, Title) {
        var Response = authService.BindClildMenuList(parseInt(parentid));
        Response.then(function (resp) {
            $scope.DivTitle = Title;
            $scope.width = '100%';
            $scope.ChildList = resp.data;
        });
    }

    $scope.startNewRow = function (index, count) {
        return ((index) % count) === 0;
    };

    $scope.CloseChild = function (index) {
        $scope.width = '0%';
    };

    $scope.UpdateTicket = function UpdateTicket() {
        //;
        authService.UpdateTicket().then(function (response) {
            // //;
            $scope.CheckUser();
        }, function (err) {
            ////;;
        })
    }

    $scope.CheckUser = function CheckUser() {
        //;
        if (!authService.authentication.IsLogOut) {
            var responseData = LogInServ.GetCurrentUser();
            responseData.then(function (Response) {
                //;
                $scope.PatientId = Response.value;
                if ($scope.PatientId == "" || $scope.PatientId == 0) {
                    //;
                    $window.location.href = API.Baseurl;
                }
                else {
                    //;
                    //crumble.context = { thing: 'Home' };
                    //crumble.update();
                    //$rootScope.scrumble = crumble;
                }
            }, function (error) {
                alert("error" + error.status);
            });
        }
    }

    $scope.PatientCategory = 7;
    $scope.getpatientlist = function getpatientlist(PatientCategory) {
        var UserInfo = localStorageService.get("UserInfo");

        //var response = Common.getpatientlist(UserInfo.UnitID, $scope.PatientCategory);
        var response = Common.getpatientlist(UserInfo.UnitID, PatientCategory);
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.PatientList = resp.data;
                $scope.BindParentList(0);
                if (angular.element('#liQueue').length)
                    angular.element(liQueue).addClass('active');
            }
        });
    }


    $scope.getMatchingPatient = function ($viewValue) {
        var matchingStuffs = [];
        for (var i = 0; i < $scope.PatientList.length; i++) {
            if (
              $scope.PatientList[i].PatientName.toLowerCase().indexOf($viewValue.toLowerCase()) != -1 ||
              $scope.PatientList[i].MRNo.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {
                matchingStuffs.push($scope.PatientList[i]);
            }
        }
        return matchingStuffs;
    }

    $scope.onSelect = function (model) {
        debugger;
        $rootScope.Breadcrum.length = 0;
        $rootScope.hideWhenQueue = false;
        if (model) {
            $scope.SelectedPatient = angular.copy(model);   //selected patient details
            sessionStorage.setItem("selectedPatient", JSON.stringify($scope.SelectedPatient));
        }
        else {
            $scope.SelectedPatient = JSON.parse(sessionStorage.getItem("selectedPatient"));
        }
        angular.element('#liPatient').removeClass('open');
        if ($scope.SelectedPatient.PatientCategoryID == 7) {
            $rootScope.IsFemale = 1;
            $rootScope.IsMale = 1;
            $scope.GetCoupleDetails();
            if ($scope.SelectedPatient.GenderID == 2) {
                $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
            }
            else {
                $rootScope.IsMaleActive = true;
                $rootScope.IsFemaleActive = false;
            }
        }
        else {
            if ($scope.SelectedPatient.GenderID == 2) {
                $rootScope.IsFemale = 1;
                $rootScope.IsFemaleActive = true;
                $rootScope.IsMaleActive = false;
            }
            else {
                $rootScope.IsMale = 1;
                $rootScope.IsMaleActive = true;
                $rootScope.IsFemaleActive = false;
            }
            $scope.GetDonorDetails();
        }
    };
    //END
    //Get Couple Details 
    $scope.GetCoupleDetails = function GetCoupleDetails() {
        var response = Common.GetCoupleDetails($scope.SelectedPatient);
        response.then(function (resp) {

            if (resp.data != null) {
                $scope.IsEmrPrint = true; //for print action
                resp.data.FemalePatient.Allergies = resp.data.FemalePatient.Allergies
                if (resp.data.FemalePatient.AllergiesFood != '')
                    resp.data.FemalePatient.Allergies = resp.data.FemalePatient.Allergies + ',' + resp.data.FemalePatient.AllergiesFood;
                if (resp.data.FemalePatient.AllergiesOthers != '')
                    resp.data.FemalePatient.Allergies = resp.data.FemalePatient.Allergies + ',' + resp.data.FemalePatient.AllergiesOthers;
                if (resp.data.FemalePatient.IsAlcohol)
                    resp.data.FemalePatient.Addictions = 'Alcohol, ';
                if (resp.data.FemalePatient.IsTobacco)
                    resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions + 'Tobacco, ';
                if (resp.data.FemalePatient.IsSmoking)
                    resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions + 'Smoking, ';
                if (resp.data.FemalePatient.IsAddictionsOther)
                    resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions + 'Other';
                if (resp.data.FemalePatient.Addictions == null) resp.data.FemalePatient.Addictions = '';
                if (resp.data.FemalePatient.Addictions.slice(-2) == ', ')
                    resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions.slice(0, -2);
                if (resp.data.FemalePatient.Allergies == null) resp.data.FemalePatient.Allergies = '';
                if (resp.data.FemalePatient.Allergies.slice(1) == ',')
                    resp.data.FemalePatient.Allergies = resp.data.FemalePatient.Allergies.slice(1);
                // for Male
                if (resp.data.MalePatient.AllergiesFood != '')
                    resp.data.MalePatient.Allergies = resp.data.MalePatient.Allergies + ',' + resp.data.MalePatient.AllergiesFood;
                if (resp.data.MalePatient.AllergiesOthers != '')
                    resp.data.MalePatient.Allergies = resp.data.MalePatient.Allergies + ',' + resp.data.MalePatient.AllergiesOthers;
                if (resp.data.MalePatient.IsAlcohol)
                    resp.data.MalePatient.Addictions = 'Alcohol, ';
                if (resp.data.MalePatient.IsTobacco)
                    resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions + 'Tobacco, ';
                if (resp.data.MalePatient.IsSmoking)
                    resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions + 'Smoking, ';
                if (resp.data.MalePatient.IsAddictionsOther)
                    resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions + 'Other';
                if (resp.data.MalePatient.Addictions == null) resp.data.MalePatient.Addictions = '';
                if (resp.data.MalePatient.Addictions.slice(-2) == ', ')
                    resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions.slice(0, -2);
                if (resp.data.MalePatient.Allergies == null) resp.data.MalePatient.Allergies = '';
                if (resp.data.MalePatient.Allergies.slice(1) == ',')
                    resp.data.MalePatient.Allergies = resp.data.MalePatient.Allergies.slice(1);

                $rootScope.CoupleDetails = resp.data;

                $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                Common.clearSelectedPatient();
                Common.clearSelectedCouple();
                Common.setSelectedPatient($scope.SelectedPatient);
                Common.setSelectedCouple($rootScope.CoupleDetails);
                // by default 
                $scope.VisitPopUP($scope.SelectedPatient);

                $scope.GetDashBoardData();
                $location.path('/EMRLandingPage/');
            }
        });
    }
    //END
    //=============================================================================================================================================================
    //Get The Latest Visit
    $scope.VisitPopUP = function (Patient) {

        if (!angular.equals({}, Patient)) {

            var response = Common.GetActiveVisitByPatient(Patient.ID, Patient.UnitID); //Get Visit list For selected patient
            response.then(function (resp) {
                if (resp.data.length > 1) { //Go cursor this scope when multiple visit

                    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                        templateUrl: 'visitmodel',
                        controller: 'visitmodelInfo',
                        backdrop: false,
                        keyboard: false,
                        size: 'md',
                        resolve: {
                            VisitInfo: function () {
                                return resp.data;
                            }
                        }
                    });
                    modalInstance.result.then(function (data) { // return here after cancel reason entered

                        if (!angular.equals({}, data)) {
                            //this scope is executed when particular one visit is selected
                            if (Patient.GenderID == 2) {
                                //for female
                                var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 2);
                                response.then(function (resp) {
                                    var vdetails = { "visitid": data.VisitID, "visitunitid": data.VisitUnitID };
                                    sessionStorage.setItem("femaleVisitDetails", JSON.stringify(vdetails));
                                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = data.VisitID;
                                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                    $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                    $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                    $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;
                                    Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient);
                                })
                            }
                            else {
                                //for male
                                var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 1);
                                response.then(function (resp) {
                                    var vdetails = { "visitid": data.VisitID, "visitunitid": data.VisitUnitID };
                                    sessionStorage.setItem("maleVisitDetails", JSON.stringify(vdetails));
                                    $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = data.VisitID;
                                    $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                    $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                    $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                    $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;
                                    Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient);

                                });
                            }
                            //      $location.path('/EMRLandingPage/');
                            //$location.path('/EMRLandingPage/');
                        }
                    });
                }
                else if (resp.data.length == 1)  //this scope is executed when only one active visit
                {

                    if (!angular.equals({}, resp.data)) {
                        if (Patient.GenderID == 2) {
                            //for female
                            var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, resp.data[0], 2);
                            response.then(function (resp1) {
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                $scope.selectPatient = {};
                                $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;

                                Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                                Common.setSelectedPatient($scope.selectPatient);
                                Common.SetSelectedPatientInAPI($scope.selectPatient);
                            })
                        }
                        else {
                            //for male
                            var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, resp.data[0], 1);
                            response.then(function (resp2) {
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                $scope.selectPatient = {};
                                $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;

                                Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                                Common.setSelectedPatient($scope.selectPatient);
                                Common.SetSelectedPatientInAPI($scope.selectPatient);
                            });
                        }
                    }
                }
                else {
                    if (Patient.GenderID == 2) {
                        Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                        Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, null, 2);
                    }
                    else if (Patient.GenderID == 1) {
                        Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                        Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, null, 1);
                    }
                    Common.setSelectedPatient($scope.SelectedPatient);
                    Common.setSelectedCouple($rootScope.CoupleDetails);
                    //alert("There is no active visit");
                }
            });
        }
    }
    //=============================================================================================================================================================
    //Nevigate visitPopup
    $scope.NevigateVisitPopUP = function (Patient, Redirectto) {
        if (!angular.equals({}, Patient)) {
            var response = Common.GetActiveVisitByPatient(Patient.ID, Patient.UnitID); //Get Visit list For selected patient
            response.then(function (resp) {
                if (resp.data.length > 1) { //Go cursor this scope when multiple visit
                    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                        templateUrl: 'visitmodel',
                        controller: 'visitmodelInfo',
                        backdrop: false,
                        keyboard: false,
                        size: 'md',
                        resolve: {
                            VisitInfo: function () {
                                return resp.data;
                            }
                        }
                    });
                    modalInstance.result.then(function (data) { // return here after cancel reason entered

                        if (!angular.equals({}, data)) {  //this scope is executed when particular one visit is selected
                            if (Patient.GenderID == 2) {
                                //for female
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = data.VisitID;
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                                response.then(function (resp) {
                                    if (resp.status == 200) {

                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                        $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                        $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                        $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;

                                        Common.setSelectedPatient($scope.selectPatient);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        $location.path(Redirectto);
                                    }
                                });
                            }
                            else {
                                //for male
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = data.VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                                response.then(function (resp) {

                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                        $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                        $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                        $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;

                                        Common.setSelectedPatient($scope.selectPatient);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        $rootScope.CoupleDetails = Common.getSelectedCouple();
                                        $location.path(Redirectto);
                                    }
                                });
                            }
                        }
                    });
                }
                else if (resp.data.length == 1)  //this scope is executed when only one active visit
                {

                    if (!angular.equals({}, resp.data)) {
                        if (Patient.GenderID == 2) {
                            //for female
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                            response.then(function (resp) {

                                if (resp.status == 200) {
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                    $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                    $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                    $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;

                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient);
                                    Common.setSelectedCouple($rootScope.CoupleDetails);
                                    $rootScope.CoupleDetails = Common.getSelectedCouple();
                                    $location.path(Redirectto);
                                }
                            });
                        }
                        else {
                            //for male
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                            response.then(function (resp) {

                                if (resp.status == 200) {
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                    $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                    $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                    $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;

                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient);
                                    Common.setSelectedCouple($rootScope.CoupleDetails);
                                    $rootScope.CoupleDetails = Common.getSelectedCouple();
                                    $location.path(Redirectto);
                                }
                            });
                        }
                    }
                }
                else {

                    //alert("There is no active visit");
                    Common.setSelectedPatient($scope.SelectedPatient);
                    Common.setSelectedCouple($rootScope.CoupleDetails);

                    $location.path(Redirectto);
                }
            });
        }
    }
    //=============================================================================================================================================================
    $scope.GetDonorDetails = function GetDonorDetails() {

        var response = Common.GetDonorDetails($scope.SelectedPatient);
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.IsEmrPrint = true; //for print action
                Common.clearSelectedPatient();
                Common.clearSelectedCouple();

                Common.SetSelectedPatientInAPI($scope.SelectedPatient);
                if (resp.data.GenderID == 1) {

                    $rootScope.CoupleDetails.MalePatient.MalePhotoStr = resp.data.PhotoString;
                    $rootScope.CoupleDetails.MalePatient.MalePatientName = resp.data.PatientName;
                    $rootScope.CoupleDetails.MalePatient.MaleDOB = resp.data.DOB;
                    $rootScope.CoupleDetails.MalePatient.MaleMRNO = resp.data.MRNo;
                    $rootScope.CoupleDetails.MalePatient.MaleAgeInYr = resp.data.Age;
                    $rootScope.CoupleDetails.MalePatient.MaleHeight = resp.data.MaleHeight;
                    $rootScope.CoupleDetails.MalePatient.MaleWeight = resp.data.MaleWeight;
                    $rootScope.CoupleDetails.MalePatient.MaleBMI = resp.data.MaleBMI;
                    $rootScope.CoupleDetails.MalePatient.MaleId = resp.data.ID;
                    $rootScope.CoupleDetails.MalePatient.MAleUnitID = resp.data.UnitID;
                    $rootScope.CoupleDetails.MalePatient.MaleMRNO = resp.data.MRNo;
                    $rootScope.CoupleDetails.MalePatient.GenderID = resp.data.GenderID;
                    $rootScope.CoupleDetails.MalePatient.PatientCategoryID = resp.data.PatientCategoryID;
                    $rootScope.CoupleDetails.MalePatient.IsDonor = true;
                    $rootScope.CoupleDetails.MalePatient.IsDonorUsed = resp.data.IsDonorUsed;
                    $rootScope.IsFemale = 0;
                    $rootScope.IsMale = 1;
                    $rootScope.CoupleDetails.FemalePatient = {};
                    $scope.VisitPopUP($scope.SelectedPatient);
                }
                else if (resp.data.GenderID == 2) {

                    $rootScope.CoupleDetails.FemalePatient.FemalePhotoStr = resp.data.PhotoString;
                    $rootScope.CoupleDetails.FemalePatient.FemalePatientName = resp.data.PatientName;
                    $rootScope.CoupleDetails.FemalePatient.FemaleDOB = resp.data.DOB;
                    $rootScope.CoupleDetails.FemalePatient.FemaleMRNO = resp.data.MRNo;
                    $rootScope.CoupleDetails.FemalePatient.FemaleAgeInYr = resp.data.Age;
                    $rootScope.CoupleDetails.FemalePatient.FemaleHeight = resp.data.MaleHeight;
                    $rootScope.CoupleDetails.FemalePatient.FemaleWeight = resp.data.MaleWeight;
                    $rootScope.CoupleDetails.FemalePatient.FemaleBMI = resp.data.MaleBMI;
                    $rootScope.CoupleDetails.FemalePatient.FemalePatientID = resp.data.ID;
                    $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID = resp.data.UnitID;
                    $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO = resp.data.MRNo;
                    $rootScope.CoupleDetails.FemalePatient.PatientCategoryID = resp.data.PatientCategoryID;
                    $rootScope.CoupleDetails.FemalePatient.GenderID = resp.data.GenderID;
                    $rootScope.CoupleDetails.FemalePatient.CoupleCode = resp.data.CoupleCode;
                    $rootScope.CoupleDetails.FemalePatient.CoupleFemailID = resp.data.CoupleFemailID;
                    $rootScope.CoupleDetails.FemalePatient.CoupleFemailUnitID = resp.data.CoupleFemailUnitID;
                    $rootScope.CoupleDetails.FemalePatient.IsDonor = true;
                    $rootScope.CoupleDetails.FemalePatient.IsDonorUsed = resp.data.IsDonorUsed;
                    $rootScope.IsMale = 0;
                    $rootScope.IsFemale = 1;
                    $rootScope.CoupleDetails.MalePatient = {};
                    $scope.VisitPopUP($scope.SelectedPatient);

                }

                $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};

                Common.setSelectedPatient($scope.SelectedPatient);
                Common.setSelectedCouple($rootScope.CoupleDetails);

                $scope.GetDashBoardData();
                $location.path('/EMRLandingPage/');
            }
        });
    }
    //=============================================================================================================================================================
    //by rohini to navigte and set selected respective patient on icon click ModuleId for emr template 
    $scope.Navigate = function Navigate(GenderID, Str, Title, ModuleId) {
        Common.clearID();
        Common.setID(ModuleId);
        Common.SetTherapyDetails(0, 0, 0, 0);//clear therapy by rohini
        $rootScope.CoupleDetails.FemalePatient.TherapyUnitID = 0; //clear therapy  by rohini
        $rootScope.CoupleDetails.FemalePatient.TherapyID = 0;//clear therapy by rohini
        $rootScope.hideWhenQueue = false;
        $rootScope.Breadcrum.length = 0;
        $rootScope.CycleDetails = null;
        $rootScope.FormName = null;
        $rootScope.FormName = Title;
        $scope.IsEmrPrint = true;// for print cation show
        if (Title == 'Male Investigations' || Title == 'Female Investigations ')
            $rootScope.FormName = 'Investigations';
        //   angular.element(lblFormName).text(Title);
        //Code Added By manohar to check Single Patient in Banks.
        if (Str == "SpermBank" || Str == "OocyteBank" || Str == "EmbryoBank") {
            PatientInfo.IsSinglePatient = true;
            $rootScope.IsSinglePatient = true;
        }
        else {
            PatientInfo.IsSinglePatient = false;
            $rootScope.IsSinglePatient = false;
        }

        $rootScope.OrderList = 0;
        if (GenderID == 1) {
            $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = true;
            angular.element(document.querySelector("#menu--slide-left2")).removeClass("active-sm");
            if (!angular.equals($rootScope.CoupleDetails.MalePatient.Selectedvisit, {}) && $rootScope.CoupleDetails.MalePatient.Selectedvisit != null) {
                if ($rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID != undefined && $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID != undefined) {
                    //Already select patient in serach box
                    var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                    response.then(function (resp) {
                        if (resp.status == 200) {
                            $scope.selectPatient = {};
                            $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                            $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                            $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                            $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                            $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                            $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                            $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;
                            Common.setSelectedPatient($scope.selectPatient);

                            Common.clearID();
                            Common.setID(ModuleId);
                            $location.path(Str);
                        }
                    });
                }
            }
            else {
                //patient not selected in serach box
                $scope.selectPatient = {};
                $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;
                Common.clearID();
                Common.setID(ModuleId);
                $scope.NevigateVisitPopUP($scope.selectPatient, Str);
            }
        }
        else if (GenderID == 2) {
            $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = false;
            angular.element(document.querySelector("#menu--slide-left")).removeClass("active-sm");
            if ($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID != undefined && $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID != undefined) {
                var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                response.then(function (resp) {
                    if (resp.status == 200) {
                        $scope.selectPatient = {};
                        $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                        $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                        $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                        $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                        $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                        $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;

                        Common.setSelectedPatient($scope.selectPatient);

                        //Common.clearID();
                        //Common.setID(ModuleId);
                        $location.path(Str);
                    }
                });
            }
            else {
                //patient not selected in serach box
                $scope.selectPatient = {};
                $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;
                //Common.clearID();
                //Common.setID(ModuleId);
                $scope.NevigateVisitPopUP($scope.selectPatient, Str);
            }
        }

        $route.reload();
    }
    $scope.ClosePopUp = function (Gender) {
        var selectPatient = {};
        if (Gender == 2) {
            /////
            selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
            selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
            selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
            selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
            selectPatient.Gender = 'Female';
            selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
            if ($rootScope.CoupleDetails.FemalePatient.Selectedvisit) {
                selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID
                selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID
            }
            Common.setSelectedPatient(selectPatient);
            Common.SetSelectedPatientInAPI(selectPatient);//.then(function () {
            //$scope.GetReportList();
            //$scope.btnText = 'Male Report';
            //})
            ////
            angular.element(document.querySelector("#menu--slide-left2")).removeClass("active-sm");//Male close
            $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = false;
            $rootScope.IsCycleActive = false;
            //   $rootScope.showFemalePopUp = !$rootScope.showFemalePopUp;
            if (angular.element(document.querySelector("#menu--slide-left")).hasClass("active-sm"))
                angular.element(document.querySelector("#menu--slide-left")).removeClass("active-sm")
            else angular.element(document.querySelector("#menu--slide-left")).addClass("active-sm")
        }
        if (Gender == 1) {
            //////
            selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
            selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
            selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
            selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
            selectPatient.Gender = 'Male';
            selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.MalePatientName;
            if ($rootScope.CoupleDetails.MalePatient.Selectedvisit != null) {
                selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID
                selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID
            }
            Common.setSelectedPatient(selectPatient);
            Common.SetSelectedPatientInAPI(selectPatient);//.then(function () {
            //    $scope.GetReportList();
            //    $scope.btnText = 'Female Report';
            //})

            //////
            $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = true;
            $rootScope.IsCycleActive = false;
            angular.element(document.querySelector("#menu--slide-left")).removeClass("active-sm"); //Female close
            //  $rootScope.showMalePopUp = !$rootScope.showMalePopUp;
            if (angular.element(document.querySelector("#menu--slide-left2")).hasClass("active-sm"))
                angular.element(document.querySelector("#menu--slide-left2")).removeClass("active-sm")
            else angular.element(document.querySelector("#menu--slide-left2")).addClass("active-sm")
        }
        if (Gender == 3) {
            $scope.IsEmrPrint = false; // for print cation hide
            $scope.Breadcrum.length = 0;
            $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = false;
            $rootScope.IsCycleActive = true;
            angular.element(document.querySelector("#menu--slide-left2")).removeClass("active-sm");//Male close
            angular.element(document.querySelector("#menu--slide-left")).removeClass("active-sm"); //Female close

        }
    }
    $scope.OpenInvestigation = function (templateUrl) {

        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: templateUrl,
            controller: 'InvestigationPopUp',
            backdrop: false,
            keyboard: false,
            size: 'lg',
            //resolve: {
            //    Info: function () {
            //        return Info;
            //    }
            //}
        });
        modalInstance.result.then(function () {

        })
    }
    $scope.OpenPreScription = function (templateUrl) {

        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: templateUrl,
            controller: 'PrescriptionPopUp',
            backdrop: false,
            keyboard: false,
            size: 'lg',
            //resolve: {
            //    Info: function () {
            //        return Info;
            //    }
            //}
        });
        modalInstance.result.then(function () {

        })
    }
    $scope.OpenMedia = function (templateUrl) {

        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: templateUrl,
            controller: 'MediaPopUp',
            backdrop: false,
            keyboard: false,
            size: 'lg',
            //resolve: {
            //    Info: function () {
            //        return Info;
            //    }
            //}
        });
        modalInstance.result.then(function () {
        })
    }
    $scope.OpenConsent = function (templateUrl) {

        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: templateUrl,
            controller: 'ConsentPopUp',
            backdrop: false,
            keyboard: false,
            size: 'lg',
            //resolve: {
            //    Info: function () {
            //        return Info;
            //    }
            //}
        });
        modalInstance.result.then(function () {
        })
    }
    $scope.OpenPrint = function (templateUrl) {
        if (!angular.equals({}, $scope.selectPatient)) {

            var modalInstance = $uibModal.open({
                templateUrl: templateUrl,
                controller: 'PrintPopUp',
                backdrop: false,
                keyboard: false,
                size: 'lg',
                resolve: {
                    selectPatient: function () {
                        return $scope.selectPatient;
                    }
                }
            });
        }
        modalInstance.result.then(function () {
        });
    }
    $scope.GetDashBoardData = function () {
        var Mid = 0; var Fid = 0;
        //var selectPatient = {};
        //selectPatient = Common.getSelectedPatient();
        var Promise = Common.GetDashBoardData();
        Promise.then(function (resp) {
            if (resp.data.objFemale.OutSide == ',') resp.data.objFemale.OutSide = '';
            if (resp.data.objFemale.Diagnosis == null) resp.data.objFemale.Diagnosis = '';
            if (resp.data.objFemale.TrayingToConvinceYears == null || resp.data.objFemale.TrayingToConvinceYears == 0) resp.data.objFemale.TrayingToConvinceYears = '';
            if (resp.data.objFemale.TrayingToConvinceMonths == null || resp.data.objFemale.TrayingToConvinceMonths == 0) resp.data.objFemale.TrayingToConvinceMonths = '';
            if (resp.data.objFemale.MenstrualDays == null || resp.data.objFemale.MenstrualDays == 0) resp.data.objFemale.MenstrualDays = '';
            if (resp.data.objFemale.CycleDuration == null || resp.data.objFemale.CycleDuration == 0) resp.data.objFemale.CycleDuration = '';
            if (resp.data.objFemale.InfertilityType == null || resp.data.objFemale.InfertilityType == 0) resp.data.objFemale.InfertilityType = '';

            $scope.FemaleDashboard = resp.data.objFemale;
            $scope.MaleDashboard = resp.data.objMale;
            if ($scope.SelectedPatient.PatientCategoryID == 7) {
                $scope.FemaleDashboard.Name = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
                $scope.FemaleDashboard.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                $scope.MaleDashboard.Name = $rootScope.CoupleDetails.MalePatient.MalePatientName;
                $scope.MaleDashboard.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
            }
            else {
                if ($scope.SelectedPatient.GenderID == 1) {
                    $scope.MaleDashboard.Name = $rootScope.CoupleDetails.MalePatient.MalePatientName;
                    $scope.MaleDashboard.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                }
                else {
                    $scope.FemaleDashboard.Name = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
                    $scope.FemaleDashboard.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                }
            }
        }, function (error) {

        })
    }

    $scope.aciveTab = function (tab) {
        $scope.IsEmrPrint = false;
        if (tab == 'liCryobank') {
            $rootScope.IsSinglePatient = false;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).addClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
        }
        else if (tab == 'liQueue') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).addClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
        }
        else if (tab == 'liCycles') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).addClass('active');
            if (angular.element('#liPatient'))
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
        }
        else if (tab == 'liPatient') {
            //angular.element(txtfullName).focus();
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element('#liCycles').removeClass('active');
            if (angular.element(liPatient).length)
                angular.element('#liPatient').addClass('active');
            if (angular.element(liDonor).length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
        }
        else if (tab == 'liDonor') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).addClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
        }
        else if (tab == 'liConfiguration') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).addClass('active');
        }
        else if (tab == 'liMPatient') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).addClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
        }
        else if (tab == 'liBilling') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).addClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
        }
        else if (tab == 'liAppointment') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).addClass('active');
        }
    }

    $scope.openDashboard = function () {
        $scope.GetDashBoardData(); // by rohini
        if (angular.element(document.querySelector("#menu--slide-right")).hasClass("active-sm"))
            angular.element(document.querySelector("#menu--slide-right")).removeClass("active-sm")
        else angular.element(document.querySelector("#menu--slide-right")).addClass("active-sm")
    }

    $scope.closeAsideMenu = function () {
        angular.element(document.querySelector("#menu--slide-left2")).removeClass("active-sm");//Male close
        angular.element(document.querySelector("#menu--slide-left")).removeClass("active-sm"); //Female close
    }


}]);
PIVF.controller('visitmodelInfo', function ($scope, $uibModalInstance, VisitInfo) {
    $scope.visitInformation = VisitInfo;
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.SelectPatient = function (Item) {
        $uibModalInstance.close(Item);
    }
});
//added by rohini for print EMR
PIVF.controller('PrintPopUp', function ($scope, $uibModalInstance, selectPatient, Common) {

    //for paging================================================================
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.GetData = function () {
        var response = Common.GetAllVisitByPatient(selectPatient.ID, selectPatient.UnitID, $scope.CurrentPage - 1); //Get Visit list For selected patient
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.PatientVisitList = resp.data;
            }
        });
    }
    $scope.GetData();
    $scope.PageChange = function PageChange() {
        $scope.GetData();
    }
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.PrintHistory = function (Item) {

    }
    $scope.PrintPrescriptions = function (Item) {

        var a = encodeURIComponent('U=' + Item.UnitID + '&VU=' + Item.VisitUnitID + '&V=' + Item.VisitID + '&P=' + Item.PatientID + '&PU=' + Item.PatientUnitID);
        window.open('/Reports/EMR/PriscriptionWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab  
    }
    $scope.PrintPathology = function (Item) {

        var Cat = 1;
        var a = encodeURIComponent('U=' + Item.UnitID + '&VU=' + Item.VisitUnitID + '&V=' + Item.VisitID + '&P=' + Item.PatientID + '&PU=' + Item.PatientUnitID + '&Cat=' + Cat);
        window.open('/Reports/EMR/InvestigationSrvWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab  
    }
    $scope.PrintRadiology = function (Item) {

        var Cat = 2;
        var a = encodeURIComponent('U=' + Item.UnitID + '&VU=' + Item.VisitUnitID + '&V=' + Item.VisitID + '&P=' + Item.PatientID + '&PU=' + Item.PatientUnitID + '&Cat=' + Cat);
        window.open('/Reports/EMR/InvestigationSrvWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab  
    }
    $scope.PrintSummary = function (Item) {

    }
});
PIVF.controller('InvestigationPopUp', function ($rootScope, $scope, $uibModalInstance, InvestigationSrv, $filter, Common, AlertMessage) {
    // For investigation start
    $scope.SelectedServiceListLab = [];
    $scope.SelectedServiceListRadiology = [];
    $scope.setFavList = [];
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.dateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 120), //new Date(2016, 8, 01),
        minDate: new Date(),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker

    $scope.openLabDtPickr = function ($event, i) {
        $event.preventDefault();
        $event.stopPropagation();
        i.dtpickropened = true;
    };

    $scope.GetCatwiseServiceList = function (CatID) {
        var Promise = InvestigationSrv.GetCatwiseServiceList(CatID);
        Promise.then(function (resp) {
            $scope.ServiceList = resp.data;
        }, function (error) {
        })
    }

    $scope.SelectedService = function (selSer) {

        if ($scope.CatID == 1) {     //$scope.CatID == 1 is for investigation lab 
            $scope.SelectedServiceListLab.push({
                ServiceID: selSer.Id,
                ServiceCode: selSer.ServiceCode,
                Service: selSer.Description,
                PlannedDate: '',
                Instruction: '',
                CategoryID: $scope.CatID,
                chkSelect: false,
                ArttypeID: 0,
                ArtSubTypeID: 0,
                DonorID: 0,
                DonorUnitID: 0,
                OrderFrom: $rootScope.FormName
            });
        }
        else if ($scope.CatID == 2) {
            $scope.SelectedServiceListRadiology.push({
                ServiceID: selSer.Id,
                ServiceCode: selSer.ServiceCode,
                Service: selSer.Description,
                PlannedDate: '',
                Instruction: '',
                CategoryID: $scope.CatID,
                chkSelect: false,
                ArttypeID: 0,
                ArtSubTypeID: 0,
                DonorID: 0,
                DonorUnitID: 0,
                OrderFrom: $rootScope.FormName
            });
        }

        $scope.selSer.id = 0;
        $scope.selSer.ServiceCode = '';
        $scope.selSer.Description = '';
        $scope.selSer.ServiceCodeDesc = '';
    }

    $scope.AddRow = function () {

        if ($scope.CatID == 1) {
            if ($scope.SelectedServiceListLab.length < 3) {
                $scope.SelectedServiceListLab.push({
                    ServiceID: 0,
                    ServiceCode: '',
                    Service: '',
                    PlannedDate: '',
                    Instruction: '',
                    CategoryID: $scope.CatID,
                    chkSelect: false,
                    ArttypeID: 0,
                    ArtSubTypeID: 0,
                    DonorID: 0,
                    DonorUnitID: 0,
                    OrderFrom: $rootScope.FormName
                });
            }
            else {
                AlertMessage.info('Palash IVF', 'You can add only 3 new services.');
            }
        }

        else if ($scope.CatID == 2) { // || $scope.CatID == 4
            if ($scope.SelectedServiceListLab.length < 3) {
                $scope.SelectedServiceListRadiology.push({
                    ServiceID: 0,
                    ServiceCode: '',
                    Service: '',
                    PlannedDate: '',
                    Instruction: '',
                    CategoryID: $scope.CatID,
                    chkSelect: false,
                    ArttypeID: 0,
                    ArtSubTypeID: 0,
                    DonorID: 0,
                    DonorUnitID: 0,
                    OrderFrom: $rootScope.FormName
                });
            }
            else {
                AlertMessage.info('Palash IVF', 'You can add only 3 new services.');
            }
        }
    }

    $scope.SaveInvestigation = function () {

        var lstToSave = [];
        lstToSave = $scope.SelectedServiceListLab.concat($scope.SelectedServiceListRadiology);
        angular.forEach(lstToSave, function (item) {
            if (angular.isNumber(item.ID))
                lstToSave.splice(item, 1);
        })

        $scope.EmptyNameList = $filter('filter')(lstToSave, function (v) { return v.Service == '' || v.Service == undefined || v.Service == null });

        angular.forEach(lstToSave, function (x) { x.PlannedDate = $filter('date')(x.PlannedDate, 'medium') });
        if ($scope.EmptyNameList.length > 0) {
            AlertMessage.warning('Palash IVF', 'Enter Service Name.');
        }
        else if (lstToSave.length > 0) {
            var Promise = InvestigationSrv.SaveInvestigation(lstToSave);
            Promise.then(function (resp) {
                if (resp.data == 1) {
                    AlertMessage.success('Palash IVF', 'Record saved successfully.');
                    ClearSaveInvestigation();
                    $scope.GetTodaysInvestigation($scope.CatID);
                }
                else if (resp.data == 3) {
                    AlertMessage.success('Palash IVF', 'Record already saved.');
                }
            }, function (error) {

            })
        }
        else {
            AlertMessage.warning('Palash IVF', 'Add atleast 1 service.');
        }
    }

    function ClearSaveInvestigation() {
        angular.element(rdbLab).prop("checked", true);
        $scope.CatID = 1;
        $scope.GetCatwiseServiceList(1);
        $scope.SelectedServiceListLab.length = 0;
        $scope.SelectedServiceListRadiology.length = 0;
    }

    $scope.GetTodaysInvestigation = function (CatID) {

        //$scope.IsVisitMark();
        var Promise = InvestigationSrv.GetTodaysInvestigation(CatID);
        Promise.then(function (resp) {

            resp.data.forEach(function (x) { x.PlannedDate = new Date(x.PlannedDate) });
            $scope.SelectedServiceListLab = $filter('filter')(resp.data, function (v) { return v.CategoryID == 1 });
            $scope.SelectedServiceListRadiology = $filter('filter')(resp.data, function (v) {
                return v.CategoryID == 2;
            });
        }, function (error) {
        })
    }

    $scope.DeleteService = function (item) {

        if (angular.isNumber(item.ID) && item.ID > 0) {
            Common.clearObj();
            Common.setObj(item);
            angular.element(reasonModel1).modal('show');
        }
        else {
            if (item.CategoryID == 1) {   //item.CategoryID == 1 is for lab && item.CategoryID == 3 for procedure
                //  $scope.SelectedServiceListLab.splice($scope.SelectedServiceListLab.findIndex(x=>x.Service == item.Service), 1)
                var idx = -1; //$rootScope.Breadcrum.findIndex(z=>z.Title == Breadcrum);
                for (var i = 0; i < $scope.SelectedServiceListLab.length; ++i) {
                    if ($scope.SelectedServiceListLab[i].Service == item.Service) {
                        idx = i;
                        break;
                    }
                }
                $scope.SelectedServiceListLab.splice(idx, 1);
            }
            else if (item.CategoryID == 2) { //item.CategoryID == 2 is for  radiology && item.CategoryID == 4 for cycles
                //  $scope.SelectedServiceListRadiology.splice($scope.SelectedServiceListRadiology.findIndex(x=>x.Service == item.Service), 1)
                var idx = -1; //$rootScope.Breadcrum.findIndex(z=>z.Title == Breadcrum);
                for (var i = 0; i < $scope.SelectedServiceListRadiology.length; ++i) {
                    if ($scope.SelectedServiceListRadiology[i].Service == item.Service) {
                        idx = i;
                        break;
                    }
                }
                $scope.SelectedServiceListRadiology.splice(idx, 1)
            }
        }
    }

    $scope.DeleteSavedService = function (deleteReason) {
        if (angular.isString(deleteReason)) {
            var obj = {};
            obj = Common.getObj();
            var Promise = InvestigationSrv.DeleteSavedService(obj.ID, obj.UnitID, deleteReason);
            Promise.then(function (resp) {
                if (resp.data == 1) {
                    AlertMessage.success('Palash IVF', 'Record deleted successfully.');
                    if (obj.CategoryID == 1) {
                        // $scope.SelectedServiceListLab.splice($scope.SelectedServiceListLab.findIndex(x=>x.ServiceID == obj.ServiceID), 1);
                        var idx = -1;
                        for (var i = 0; i < $scope.SelectedServiceListLab.length; ++i) {
                            if ($scope.SelectedServiceListLab[i].Service == item.Service) {
                                idx = i;
                                break;
                            }
                        }
                        $scope.SelectedServiceListLab.splice(idx, 1);
                    }
                    else if (obj.CategoryID == 2) {
                        //  $scope.SelectedServiceListRadiology.splice($scope.SelectedServiceListRadiology.findIndex(x=>x.ServiceID == obj.ServiceID), 1);
                        var idx = -1; //$rootScope.Breadcrum.findIndex(z=>z.Title == Breadcrum);
                        for (var i = 0; i < $scope.SelectedServiceListRadiology.length; ++i) {
                            if ($scope.SelectedServiceListRadiology[i].Service == item.Service) {
                                idx = i;
                                break;
                            }
                        }
                        $scope.SelectedServiceListRadiology.splice(idx, 1)
                    }

                    $scope.deleteReason = '';
                    angular.element(reasonModel1).modal('hide');
                    $scope.GetTodaysInvestigation($scope.CatID);
                }
            }, function (error) {
                AlertMessage.error('Palash IVF', 'Error occured.');
            });
        }
        else {
            $scope.frmInv.txtReason.$dirty = true;
            AlertMessage.info('Palash IVF', 'Enter reason.');
        }
    }

    $scope.IsVisitMark = function () {

        //$scope.btnSaveDisabled = false;
        if (selectPatient.GenderID == 1) {
            if (angular.isUndefined($rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID == 0) {
                $scope.btnDisabled = true;
                $scope.Message = 'Mark visit to save Investigation.';
            }
        }
        else if (selectPatient.GenderID == 2) {
            if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
                $scope.btnDisabled = true;
                $scope.Message = 'Mark visit to save Investigation.';
            }
        }
    }

    $scope.ShowFavModal = function (item) {

        //  $scope.TemplateID = item.TemplateID;
        Common.clearObj();
        Common.setObj(item);
        angular.element(modFavourite).modal('show');
    }

    $scope.GetTemplateList = function () {

        var ResponseData = Common.getMasterList('M_Investigation_Template', 'ID', 'Template');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.TemplateList = Response.data;
            //if ($scope.TemplateID > 0) {
            //    $scope.templateType = 'Existing';
            //}
            //else {
            //    $scope.templateType = 'New';
            $scope.TemplateID = 0;
            //}
        }, function (error) {
        });
    }

    $scope.SaveFavourite = function () {
        //
        $scope.setFavList[0].Template = $scope.Template;
        if (!angular.isNumber($scope.TemplateID)) $scope.TemplateID = 0;
        $scope.setFavList[0].TemplateID = $scope.TemplateID;
        var Promise = InvestigationSrv.SaveFavourite($scope.setFavList);
        Promise.then(function (resp) {
            if (resp.data == 1) {
                AlertMessage.success('Palash IVF', 'Record saved successfully.');
                $scope.setFavList.length = 0;
                $scope.Template = '';
                $scope.TemplateID = 0;
            }
        }, function (error) {

        })
    }

    $scope.SetFavouriteUnsaved = function (Temp, Tid) {

        var item = Common.getObj();
        if (angular.isUndefined(Temp)) Temp = '';
        if (angular.isUndefined(Tid)) Tid = 0;
        if (angular.isNumber(item.ID) && item.ID > 0) {
            item.TemplateID = Tid;
            item.Template = Temp;
            var Promise = InvestigationSrv.SetFavouriteInvestigation(item);
            Promise.then(function (resp) {
                if (resp.data == 1) {
                    angular.element(modFavourite).modal('hide');
                    AlertMessage.success('Palash IVF', 'Add to favourite successfully.');
                }
                else if (resp.data == 3)
                    AlertMessage.success('Palash IVF', 'Already set as favourite for this template.');
            }, function (error) {
            });


        }
        else {
            if (item.CategoryID == 1) {   //item.CategoryID == 1 is for lab && item.CategoryID == 3 for procedure
                //  var idx = $scope.SelectedServiceListLab.findIndex(x=>x.Service == item.Service);
                var idx = -1; //$rootScope.Breadcrum.findIndex(z=>z.Title == Breadcrum);
                for (var i = 0; i < $scope.SelectedServiceListLab.length; ++i) {
                    if ($scope.SelectedServiceListLab[i].Service == item.Service) {
                        idx = i;
                        break;
                    }
                }
                $scope.SelectedServiceListLab[idx].Template = Temp;
                $scope.SelectedServiceListLab[idx].TemplateID = Tid;
            }
            else if (item.CategoryID == 2) { //item.CategoryID == 2 is for  radiology && item.CategoryID == 4 for cycles
                //var idx = $scope.SelectedServiceListRadiology.findIndex(x=>x.Service == item.Service);
                var idx = -1; //$rootScope.Breadcrum.findIndex(z=>z.Title == Breadcrum);
                for (var i = 0; i < $scope.SelectedServiceListRadiology.length; ++i) {
                    if ($scope.SelectedServiceListRadiology[i].Service == item.Service) {
                        idx = i;
                        break;
                    }
                }
                //$scope.SelectedServiceListRadiology[idx].Template = Temp;
                //$scope.SelectedServiceListRadiology[idx].TemplateID = Tid;
            }
            angular.element(modFavourite).modal('hide');
        }
    }

    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    // For investigation end   

});
PIVF.controller('PrescriptionPopUp', function ($rootScope, $scope, $uibModal, $uibModalInstance, PrescriptionSrv, $filter, Common, AlertMessage) {
    //======================================================= For prescription start=============================
    $scope.IsBrand = true;
    $scope.IsMolecule = false
    var UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

    $scope.getMatchingBrand = function ($viewValue) {
        var matchingStuffs = [];

        for (var i = 0; i < $scope.DrugList.length; i++) {
            if (
              $scope.DrugList[i].Code.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {

                matchingStuffs.push($scope.DrugList[i]);
            }
        }
        return matchingStuffs;
    }
    $scope.getMatchingMolecule = function ($viewValue) {
        var matchingStuffs = [];

        for (var i = 0; i < $scope.MoleculeList.length; i++) {
            if ($scope.MoleculeList[i].Description.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {

                matchingStuffs.push($scope.MoleculeList[i]);
            }
        }
        return matchingStuffs;
    }
    $scope.PageSetup = function PageSetup() {
        $scope.GetDrugList();
        $scope.GetMoliculeList();
        $scope.FillDropDowns();
        $scope.GetTodaysPrecscription();
        $scope.GetTemplateAndItems();

    }
    $scope.GetDrugList = function GetDrugList() {
        var response = PrescriptionSrv.GetDrugList(UserInfo.UnitID);
        response.then(function (resp) {

            if (resp.data != null) {

                $scope.DrugList = resp.data;
            }
        });
    }
    $scope.GetMoliculeList = function GetDrugList() {
        var ResponseData = Common.getMasterList('M_Molecule', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MoleculeList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FillDropDowns = function () {
        var ResponseData = Common.getMasterList('M_Route', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.RouteList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_Frequency', 'FrequencyID', 'FreqDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.FrequencyList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_Instruction', 'InstructionID', 'InsDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.InstructionList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
        //var ResponseData = Common.getMasterList('T_TemplateForPrescription', 'ID', 'TemplateName');
        //ResponseData.then(function (Response) {
        //    $scope.FavTemplateList = Response.data;
        //    //$scope.FavTemplateList.DrugList = [];
        //}, function (error) {
        //    $scope.Error = error;
        //});
        var ResponseData = Common.getMasterList('T_TemplateForPrescription', 'ID', 'TemplateName');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.TemplateList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_DrugSource', 'ID', 'Code');
        ResponseData.then(function (Response) {
            //Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.DrugSourceList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });

    }
    $scope.GetTodaysPrecscription = function GetTodaysPrecscription() {

        var ResponseData = PrescriptionSrv.GetTodaysPrescriptionDetails();
        ResponseData.then(function (Response) {
            $scope.TodaysDrugs = Response.data;
            if ($scope.TodaysDrugs == null) {
                $scope.TodaysDrugs = {};
                $scope.TodaysDrugs.DrugList = [];
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.GetTemplateAndItems = function GetTemplateAndItems() {

        var response = PrescriptionSrv.GetTemplateAndItems();
        response.then(function (resp) {

            if (resp.data != null) {

                $scope.FavTemplateList = resp.data;
            }
        });
    }
    $scope.OnChange = function OnChange(i) {
        if (i == 1) {
            $scope.IsBrand = 1;
            $scope.IsMolecule = 0;
            $scope.SelectedDrug = null;
            $scope.SelectedMolecule = null;
        }
        else if (i == 2) {
            $scope.IsMolecule = 1;
            $scope.IsBrand = 0;
            $scope.SelectedDrug = null;
            $scope.SelectedMolecule = null;
        }
    }
    $scope.onSelect = function ($item, $model, $label) {

        $scope.SelectedDrug = $model;   //selected drugs details   
    };
    $scope.AddDrug = function () {

        if ($scope.IsBrand == true) {
            if ($scope.frmTdrugs.SelectedDrug.$valid) {
                var response = PrescriptionSrv.GetDrugDetailByItemID($scope.SelectedDrug.ID, UserInfo.UnitID);
                response.then(function (resp) {

                    if (resp.data != null) {

                        resp.data.AddedByName = UserInfo.UserName;
                        resp.data.Status = true;
                        if (resp.data.FrequencyID == undefined || resp.data.FrequencyID == null)
                            resp.data.FrequencyID = 0;
                        if (resp.data.RouteID == undefined || resp.data.RouteID == null)
                            resp.data.RouteID = 0;
                        if (resp.data.InstructionID == undefined || resp.data.InstructionID == null)
                            resp.data.InstructionID = 0;
                        if (SourceFrom == "Cycle Overview")
                            resp.data.DrugSourceId = 1;
                        else if (SourceFrom == "Stimulation")
                            resp.data.DrugSourceId = 2;
                        else if (SourceFrom == "Trigger")
                            resp.data.DrugSourceId = 3;
                        else if (SourceFrom == "Ovum Pick Up")
                            resp.data.DrugSourceId = 4;
                        else if (SourceFrom == "Embryo Transfer")
                            resp.data.DrugSourceId = 6;
                        else if (SourceFrom == "Outcome")
                            resp.data.DrugSourceId = 7;
                        else
                            resp.data.DrugSourceId = 0;

                        $scope.TodaysDrugs.DrugList.push(resp.data);
                    }
                });
            }
            else {
                $scope.frmTdrugs.SelectedDrug.$dirty = true;
            }
        }
        else {
            if ($scope.frmTdrugs.SelectedMolecule.$valid) {

                $scope.Molecule = $scope.SelectedMolecule;
                //for drug source set
                if (SourceFrom == "Cycle Overview")
                    $scope.DrugSourceId = 1;
                else if (SourceFrom == "Stimulation")
                    $scope.DrugSourceId = 2;
                else if (SourceFrom == "Trigger")
                    $scope.DrugSourceId = 3;
                else if (SourceFrom == "Ovum Pick Up")
                    $scope.DrugSourceId = 4;
                else if (SourceFrom == "Embryo Transfer")
                    $scope.DrugSourceId = 6;
                else if (SourceFrom == "Outcome")
                    $scope.DrugSourceId = 7;
                else
                    $scope.DrugSourceId = 0;

                $scope.Item = {
                    'Code': '', 'BrandName': '', 'ItemName': '', 'DrugID': 0, 'ID': 0, 'UOMID': 0, 'RouteID': 0, 'FrequencyID': 0, 'InstructionID': 0, 'DrugSourceId': $scope.DrugSourceId,
                    'MRP': 0, 'RouteName': '', 'AvailableStock': 0.0, 'UOM': '', 'Strength': '', 'IsABC': 0, 'StrengthUnitTypeID': 0, 'IsFNS': false, 'IsVED': false, 'IssueStatus': false,
                    'Days': '', 'Quantity': 0, 'Warning': '', 'ResultStatus': 0, 'Dose': '', 'Frequency': '', 'IsOther': 0, 'Reason': '',
                    'MoleculeID': $scope.Molecule.ID, 'MoleculeName': $scope.Molecule.Description, 'AddedByName': UserInfo.UserName, 'IsMolecule': true, Status: true
                }
                $scope.TodaysDrugs.DrugList.push($scope.Item);
            }
            else {
                $scope.frmTdrugs.SelectedMolecule.$dirty = true;
            }
        }
    }
    $scope.AddOtherDrug = function () {
        $scope.Item = {
            'Code': '', 'BrandName': '', 'ItemName': '', 'DrugID': 0, 'ID': 0, 'UOMID': 0, 'RouteID': 0, 'FrequencyID': 0, 'InstructionID': 0, 'DrugSourceId': 0,
            'MRP': 0, 'RouteName': '', 'AvailableStock': 0.0, 'UOM': '', 'Strength': '', 'IsABC': 0, 'StrengthUnitTypeID': 0, 'IsFNS': 0, 'IsVED': 0, 'IssueStatus': 0,
            'Days': '', 'Quantity': 0, 'Warning': '', 'ResultStatus': 0, 'Dose': '', 'Frequency': '', 'IsOther': 1, 'Reason': '',
            'MoleculeID': 0, 'MoleculeName': '', 'AddedByName': UserInfo.UserName, 'IsMolecule': 0
        }
        $scope.TodaysDrugs.DrugList.push($scope.Item);
    }
    $scope.RemoveAddDrugRow = function (Index, Item) {

        if (Item.ID >= 1) {

            var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                templateUrl: 'DeleteTodaysmodel',
                controller: 'DeleteTodaysModelInfo',
                backdrop: false,
                keyboard: false,
                size: 'md',
                //resolve: {
                //    DeleteInfo: function () {
                //        return Item;
                //    }
                //}
            });
            modalInstance.result.then(function (data) { // return here after cancel reason entered
                debugger
                if (!angular.equals({}, data)) {  //this scope is executed when save is click
                    Item.Comment = data.Comment;
                    Item.Status = false;
                    $scope.SavePrescription();
                }
                else {
                    AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
                }
            });
        }
        else {
            $scope.TodaysDrugs.DrugList.splice(Index, 1);
        }
    };
    $scope.SavePrescription = function SavePrescription() {

        var ResponseData = PrescriptionSrv.SavePrescription($scope.TodaysDrugs);
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                if (Response.data > 0) {
                    AlertMessage.success("Save Sucessfully");
                    $scope.PageSetup();
                }
                else {
                    AlertMessage.success("Error Occured While Processing");
                }
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    // For prescription end
});
PIVF.controller('DeleteTodaysModelInfo', function ($scope, $uibModalInstance, AlertMessage) { //DeleteInfo,
    //$scope.DeleteInfo = DeleteInfo;
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.Delete = function (Item) {

        if ($scope.frmTodaysReason.Comment.$valid) {
            if (Item != undefined)
            { $uibModalInstance.close(Item); }
        }
        else { AlertMessage.warning("Please Enter Reason"); }
    }
});
PIVF.controller('MediaPopUp', function ($rootScope, $scope, $uibModal, $uibModalInstance, MediaConsumptionSrv, $filter, Common, AlertMessage) {
    //======================================================= For Media start=============================
    var UserInfo = localStorageService.get("UserInfo");
    $scope.SearchData = {};
    $scope.SearchData.UnitID = 0;
    $scope.MediaConsumption = [];
    $scope.MediaDetails = [];
    $scope.Search = "";
    $scope.popup1 = {
        opened1: false
    };
    $scope.open1 = function ($event, item) {

        $event.preventDefault();
        $event.stopPropagation();
        item.opened1 = true;
    };
    $scope.PageSetup = function () {
        $scope.GetItemList();
        $scope.GetMediaList();
        $scope.FillDropDowns();
    }
    $scope.GetItemList = function () {
        var response = MediaConsumptionSrv.GetItemsByClinic($scope.SearchData.UnitID);
        response.then(function (resp) {

            if (resp.data != null) {

                $scope.ItemList = resp.data;
            }
        });
    }
    $scope.GetMediaList = function () {
        var response = MediaConsumptionSrv.GetMediaList($scope.Search);
        response.then(function (resp) {

            if (resp.data != null) {

                $scope.MediaDetails = resp.data;
                angular.forEach($scope.MediaDetails, function (Item) {
                    if (Item.Finalized) {
                        Item.RowDisable = true;
                    }
                });
            }
        });
    }
    $scope.FillDropDowns = function () {
        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ClinicList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_MediaProcedure', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MediaProcedureList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_UnitOfMeasure', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.UOMList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.GetMatchingItems = function ($viewValue) {
        var matchingStuffs = [];

        for (var i = 0; i < $scope.ItemList.length; i++) {
            if (
              $scope.ItemList[i].Code.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {

                matchingStuffs.push($scope.ItemList[i]);
            }
        }
        return matchingStuffs;
    }
    $scope.AddDrug = function () {

        $scope.ProcedureID = 0;
        if ($rootScope.FormName == "Semen Details")
            $scope.ProcedureID = 12;
        if ($rootScope.FormName == "Embrology")
            $scope.ProcedureID = 1;
        if ($rootScope.FormName == "Oocyte Vitrification")
            $scope.ProcedureID = 8;
        if ($rootScope.FormName == "Oocyte Thowing")
            $scope.ProcedureID = 10;
        if ($rootScope.FormName == "Embryo Vitrification")
            $scope.ProcedureID = 9;
        if ($rootScope.FormName == "Embryo Thawing")
            $scope.ProcedureID = 11;

        var ItemDetails = $scope.SelectedItem;
        $scope.Item = {
            'ID': 0, 'UnitID': 0, 'ItemID': ItemDetails.ID, 'ItemCode': ItemDetails.Code, 'ItemName': ItemDetails.ItemName, 'BatchID': 0,
            'BatchName': '', 'ExpiryDate': null, 'UsedQty': 0, 'UOMID': 0, 'ProcedureID': $scope.ProcedureID, 'Status': true, 'Finalized': false
        }
        $scope.MediaConsumption.push($scope.Item);
    }
    $scope.RemoveAddDrugRow = function (Index, Item) {
        $scope.MediaConsumption.splice(Index, 1);
    }
    $scope.RemoveAddDrugRow1 = function (Index, Item) {

        if (Item.ID >= 1) {

            var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                templateUrl: 'DeleteTodaysmodel',
                controller: 'DeleteTodaysModelInfo',
                backdrop: false,
                keyboard: false,
                size: 'md',
                //resolve: {
                //    DeleteInfo: function () {
                //        return Item;
                //    }
                //}
            });
            modalInstance.result.then(function (data) { // return here after cancel reason entered
                debugger
                if (!angular.equals({}, data)) {  //this scope is executed when save is click
                    Item.Reason = data.Comment;
                    Item.Status = false;
                    $scope.SaveFinalizedMedia();
                }
                else {
                    AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
                }
            });
        }
        else {
            $scope.MediaDetails.splice(Index, 1);
        }
    };
    $scope.SaveMedia = function () {

        var ResponseData = MediaConsumptionSrv.SaveMedia($scope.MediaConsumption);
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                if (Response.data > 0) {
                    AlertMessage.success("Save Sucessfully");
                    $scope.MediaConsumption = [];
                    $scope.PageSetup();
                }
                else {
                    AlertMessage.success("Error Occured While Processing");
                }
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.SaveFinalizedMedia = function () {

        var ResponseData = MediaConsumptionSrv.SaveFinalizedMedia($scope.MediaDetails);
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                if (Response.data > 0) {
                    AlertMessage.success("Save Sucessfully");
                    $scope.MediaDetails = [];
                    $scope.PageSetup();
                }
                else {
                    AlertMessage.success("Error Occured While Processing");
                }
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    // For prescription end
});
PIVF.controller('ConsentPopUp', function ($rootScope, $scope, $uibModal, $uibModalInstance, ConsentActionSrv, $filter, Common, AlertMessage, localStorageService) {
    //======================================================= For Media start=============================
    var UserInfo = localStorageService.get("UserInfo");
    $scope.ConsentDetails = {};
    $scope.ConsentList = {};
    $scope.Search = {};
    $scope.model = {};
    $scope.PageSetup = function () {
        $scope.GetConsenGrid();
        $scope.FillDropDowns();
    }
    $scope.GetConsenGrid = function () {
        var response = ConsentActionSrv.GetConsenGrid();
        response.then(function (resp) {

            if (resp.data != null) {

                $scope.ConsentGridList = resp.data;
            }
        });
    }
    $scope.FillDropDowns = function () {

        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ClinicList = Response.data;
            $scope.ConsentDetails.SelectedUnitID = 0
        }, function (error) {
            $scope.Error = error;
        });
        //fill Available Consent List
        $scope.SelectedPatient = Common.getSelectedPatient();
        $scope.SelectedCouple = Common.getSelectedCouple();
        $scope.ArtTypeID = $scope.SelectedCouple.FemalePatient.ArtTypeID;
        $scope.ArtSubTypeID = $scope.SelectedCouple.FemalePatient.ArtSubTypeID;
        var response = ConsentActionSrv.GetConsentList($scope.ArtTypeID, $scope.ArtSubTypeID);
        response.then(function (resp) {

            if (resp.data != null) {

                resp.data.splice(0, 0, { ID: 0, Description: 'Select' });
                $scope.ConsentList = resp.data;
                $scope.Search.ConsentID = 0;
            }
        });
    }
    $scope.AddConsent = function (ID, UnitID) {

        $scope.ConsentDetails.ConsentID = $scope.Search.ConsentID;
        if ($scope.ConsentDetails.ID == undefined)
            $scope.ConsentDetails.ID = 0;
        var response = ConsentActionSrv.GetConsentDetails(UnitID, ID, $scope.ConsentDetails.ConsentID);
        response.then(function (resp) {

            if (resp.data != null) {
                $scope.ConsentDetails = resp.data;
                $scope.ConsentDetails.SelectedUnitID = UserInfo.UnitID;
                $scope.form = null;
                $scope.form = JSON.parse($scope.ConsentDetails.FormDesc);
                $scope.schema = null;
                $scope.schema = JSON.stringify($scope.ConsentDetails.SchemaDesc);
                $scope.model = null;
                $scope.model = JSON.stringify($scope.ConsentDetails.ModelDesc);
                $scope.htmlForm = null;
                $scope.htmlForm = $scope.ConsentDetails.HTMLDesc;
            }
        })
    }
    $scope.ViewReport = function (item) {
        var obj = {};
        obj.ID = item.ID;
        obj.UnitID = item.UnitID;
        var Promise = ConsentActionSrv.ViewReport(obj.ID, obj.UnitID);
        Promise.then(function (resp) {

            $scope.extn = resp.data.strReport.substring(resp.data.strReport.indexOf(':') + 1, resp.data.strReport.indexOf('/'));
            $scope.FileName = resp.data.FileName;
            if ($scope.extn == 'image') {
                $scope.Image = null;
                $scope.Image = resp.data.strReport;
                $scope.content = '';
            }
            else {
                $scope.content = resp.data.strReport;
                $scope.Image = null;
                //window.open($scope.content);
            }
            angular.element(myModal_con).modal('show');
        }, function (error) {
        })
    }
    String.prototype.replaceAt = function (index, replacement) {

        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }
    $scope.SaveConsent = function () {

        $scope.UpdateForm();
        $scope.ConsentDetails.FormDesc = JSON.stringify($scope.form);
        $scope.ConsentDetails.SchemaDesc = JSON.stringify($scope.schema);
        $scope.ConsentDetails.HTMLDesc = $scope.htmlForm;
        $scope.ConsentDetails.ModelDesc = JSON.stringify($scope.model);
        var ResponseData = ConsentActionSrv.SaveConsent($scope.ConsentDetails);
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                if (Response.data > 0) {
                    AlertMessage.success("Save Sucessfully");
                    $scope.PageSetup();
                }
                else {
                    AlertMessage.success("Error Occured While Processing");
                }
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.SaveUpdateFile = function () {

        $scope.FileStr = $scope.myImage;
        var ResponseData = ConsentActionSrv.SaveUpdateFile($scope.ConsentGridList);
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                if (Response.data > 0) {
                    AlertMessage.success("Save Sucessfully");
                    $scope.PageSetup();
                }
                else {
                    AlertMessage.success("Error Occured While Processing");
                }
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    //$scope.OpenForm = function (templateUrl) {

    //    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
    //        templateUrl: templateUrl,
    //        controller: 'ShowForm',
    //        backdrop: false,
    //        keyboard: false,
    //        size: 'lg',
    //        resolve: {
    //            htmlForm: function () {
    //                return $scope.htmlForm;
    //            }
    //        }
    //    });
    //    modalInstance.result.then(function (data) {
    //        debugger
    //        if (!angular.equals({}, data)) {
    //            Item.Reason = data;
    //        }
    //        else {
    //            AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
    //        }
    //    })
    //}
    $scope.UpdateForm = function () {
        $scope.PatientDetails = {};
        $scope.PatientDetails.PName = '{{PName}}';
        $scope.PatientDetails.PAge = '{{PAge}}';
        $scope.PatientDetails.PAddr = '{{PAddr}}';
        $scope.PatientDetails.SName = '{{SName}}';
        $scope.PatientDetails.SAge = '{{SAge}}';
        $scope.PatientDetails.SAddr = '{{SAddr}}';
        $scope.PatientDetails.MDName = '{{MDName}}';
        $scope.PatientDetails.MDMrn = '{{MDMrn}}';
        $scope.PatientDetails.MDAddr = '{{MDAddr}}';
        $scope.PatientDetails.FDName = '{{FDName}}';
        $scope.PatientDetails.FDMrn = '{{FDMrn}}';
        $scope.PatientDetails.FDAddr = '{{FDAddr}}';
        $scope.PatientDetails.DocName = '{{DocName}}';
        $scope.PatientDetails.SurrName = '{{SurrName}}';
        $scope.PatientDetails.SurrAge = '{{SurrAge}}';
        $scope.PatientDetails.SurrAddr = '{{SurrAddr}}';
        $scope.PatientDetails.SurrSName = '{{SurrSName}}';
        $scope.PatientDetails.SurrSAge = '{{SurrSAge}}';
        $scope.PatientDetails.SurrSAddr = '{{SurrSAddr}}';

        var i = -1;
        var ch_ind = [];
        var tb_ind = [];
        var dt_ind = [];
        while ((i = $scope.htmlForm.indexOf("checkbox1", i + 1)) != -1) {
            ch_ind.push(i);
        }
        i = -1;
        while ((i = $scope.htmlForm.indexOf("input1", i + 1)) != -1) {
            tb_ind.push(i);
        }
        i = -1;
        while ((i = $scope.htmlForm.indexOf("datepicker1", i + 1)) != -1) {
            dt_ind.push(i);
        }
        for (var j = 0; j < ch_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(ch_ind[j] + 8, String.fromCharCode(49 + j));
        }
        for (var j = 0; j < tb_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(tb_ind[j] + 5, String.fromCharCode(49 + j));
        }
        for (var j = 0; j < dt_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(dt_ind[j] + 10, String.fromCharCode(49 + j));
        }
        $scope.schema = {
            "type": "object",
            "title": "Consent",
            "properties": {
                "template1": {
                    "type": "template",
                    "title": "Consent"
                }
            }
        };
        $scope.form = [
            {
                type: "template",
                name: "template1",
                template: $scope.htmlForm,
                doctorname: $scope.myname,
                checkbox1: false,
                checkbox2: false,
                checkbox3: false,
                checkbox4: false,
                checkbox5: false,
                checkbox6: false,
                checkbox7: false,
                checkbox8: false,
                checkbox9: false,
                checkbox10: false,
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                input6: '',
                input7: '',
                input8: '',
                input9: '',
                input10: '',
                datepicker1: '',
                datepicker2: '',
                datepicker3: '',
                datepicker4: '',
                datepicker5: '',
                datepicker6: '',
                datepicker7: '',
                datepicker8: '',
                datepicker9: '',
                datepicker10: '',
                PName: $scope.PatientDetails.PName,
                PAge: $scope.PatientDetails.PAge,
                PAddr: $scope.PatientDetails.PAddr,
                SName: $scope.PatientDetails.SName,
                SAge: $scope.PatientDetails.SAge,
                SAddr: $scope.PatientDetails.SAddr,
                MDName: $scope.PatientDetails.MDName,
                MDMrn: $scope.PatientDetails.MDMrn,
                MDAddr: $scope.PatientDetails.MDAddr,
                FDName: $scope.PatientDetails.FDName,
                FDMrn: $scope.PatientDetails.FDMrn,
                FDAddr: $scope.PatientDetails.FDAddr,
                DocName: $scope.PatientDetails.DocName,
                SurrName: $scope.PatientDetails.SurrName,
                SurrAge: $scope.PatientDetails.SurrAge,
                SurrAddr: $scope.PatientDetails.SurrAddr,
                SurrSName: $scope.PatientDetails.SurrSName,
                SurrSAge: $scope.PatientDetails.SurrSAge,
                SurrSAddr: $scope.PatientDetails.SurrSAddr,
            },
        ];
    }
    $scope.handleFileSelect = function (evt) {

        //var file = evt.currentTarget.files[0];
        $scope.ID = parseInt(evt.id);
        var file = evt.files[0];
        var extn = file.name.split(".").pop().toLowerCase();
        var extensions = ['png', 'pdf', 'jpeg', 'jpg'];
        var validExtension = false;
        $scope.filename = file.name;
        extensions.forEach(function (x) {
            if (x === extn) {
                validExtension = true;
            }
        });
        var maxSize = 2097152;  // 2mb
        var valid = (file.size) <= maxSize;
        //
        if (validExtension) {
            if (valid) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;

                        if (angular.isDefined($scope.myImage) && $scope.myImage != '') {
                            angular.forEach($scope.ConsentGridList, function (Item) {
                                if (Item.ID == $scope.ID) {
                                    Item.FileStr = $scope.myImage;
                                    Item.FileName = $scope.filename;
                                    Item.IsFileUploaded = true;
                                    $scope.ID = 0;
                                }
                            });
                        }
                    });
                };
                reader.readAsDataURL(file);


            }
            else {
                AlertMessage.info('PalashIVF', 'Attactment should be not greater than 2 MB.');
            }
        }
        else {
            AlertMessage.info('PalashIVF', 'Attactment should be in png ,jpeg , pdf format.');
        }

    }
    $scope.SaveReport = function () {

        // window.win = open($scope.Image);
        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href', $scope.Image);
        downloadLink.attr('download', $scope.FileName);
        downloadLink.attr('target', '_self');
        angular.element(document.body).append(downloadLink);
        downloadLink[0].click();//call click function
        //  url.revokeObjectURL($scope.Image);//revoke the object from URL
    }
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.Close = function () {
        angular.element(myModal_con).modal('hide');
    }
});