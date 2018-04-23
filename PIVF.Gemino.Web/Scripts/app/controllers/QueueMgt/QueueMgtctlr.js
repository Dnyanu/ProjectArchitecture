'use strict';

angular.module('PIVF').controller('QueueController', function ($rootScope, $scope, QueueService, $location, AlertMessage, srvCommon, Common, swalMessages, $uibModal, $filter) {
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.Que = {};
    var objResource = {};
    $rootScope.CycleDetails = null;
    $rootScope.FormName = 'Patient Queue';
    $rootScope.ForPrint = 1;
    $rootScope.ForConsent = 0;
    $scope.Que.VisitFromDate = new Date();
    $scope.Que.VisitToDate = new Date();
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }// for globalization

    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.open3 = function () {
        $scope.popup3.opened = true;
    };

    $scope.popup3 = {
        opened: false
    };

    $scope.dateOptionsDOB = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 120),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    // Date pickr End

    $scope.PageChange = function PageChange() {
        $scope.GetQueueList($scope.Que);
    };

    $scope.LoadData = function Loaddata() {
        $scope.GetDepartmentList();
        $scope.GetDocList();
        $scope.GetSpeclRegTypeList();
        $scope.GetQueueList($scope.Que, false);
        $scope.Que.Date = new Date();
    }   //for filling all ddls

    $scope.VisitStatusList = [         // to fill Appt status ddl for search criteria
              { ID: 0, Type: objResource.lblVisitStatus },
              { ID: 1, Type: 'Started' },
              { ID: 2, Type: 'Consultation' },
              { ID: 3, Type: 'Billing' },
              { ID: 4, Type: 'Closed' }
            //  { ID: 5, Type: 'Reopen' },
    ];
    $scope.Que.VisitStatusID = 0;

    $scope.GetDepartmentList = function GetDepartmentList() {
        var Response = Common.GetDepartmentList();
        Response.then(function (resp) {
            resp.data.splice(0, 0, { ID: 0, Description: 'Department' })
            $scope.DeptList = resp.data;
            $scope.Que.DeptID = 0;
        })
    };

    $scope.GetDocList = function GetDocList() {
        var responseData = Common.GetDoctorList(false);
        responseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Doctor' })
            $scope.DocList = Response.data;
            $scope.Que.DocID = 0;
        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetSpeclRegTypeList = function GetSpeclRegTypeList() {
        var responseData = Common.GetSpeclRegTypeList();
        responseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'RegistrationType' })
            $scope.SpeclRegTypeList = Response.data;
            $scope.Que.SpclRegID = 0;
        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }


    $scope.RedirectToEMR = function RedirectToEMR(model) {
        debugger;
        var DataModel = {};
        DataModel.UnitID = model.UnitId;
        DataModel.ID = model.RegID;
        DataModel.PatientCategoryID = model.PatientCategoryID;
        $scope.onSelect(DataModel);

    };
    $scope.RedirectToBill = function (model) {
        debugger;
        $rootScope.BillLandingData = model;
        $rootScope.BillLandingData.RegUnitID = model.RegUnitID;
        $rootScope.BillLandingData.RegID = model.RegID;
        $rootScope.BillLandingData.PatientFullName = model.PatientName;
        $rootScope.BillLandingData.Age = model.age;
        $rootScope.BillLandingData.Email = model.Email;
        $rootScope.BillLandingData.MobileNo = model.MobNo;
        $rootScope.BillLandingData.RegType = model.PatientCategoryID;
        $rootScope.BillLandingData.GenderId = model.GenderId;
        $rootScope.BillLandingData.ClinicID = model.UnitId; 
        $location.path('/BillLanding/');
    };

    $scope.RedirectToAdvance = function (model) {
        $rootScope.AdvBillLandingData = model;
        $rootScope.AdvBillLandingData.RegUnitID = model.RegUnitID;
        $rootScope.AdvBillLandingData.PatientFullName = model.PatientName;
        $rootScope.AdvBillLandingData.Age = model.age;
        $rootScope.AdvBillLandingData.MobileNo = model.MobNo;
        $rootScope.AdvBillLandingData.RegType = model.PatientCategoryID;
        $rootScope.AdvBillLandingData.GenderId = model.GenderId;
        $rootScope.AdvBillLandingData.ClinicID = model.UnitId;
        $location.path('/PatientAdvance/');
    };

    $scope.GetQueueList = function GetQueueList(Que, exptoexcl) {
        //   usSpinnerService.spin('GridSpinner');
        var Q = [];
        if (angular.isUndefined(Que.PatientName)) { Que.PatientName = ''; }
        if (angular.isUndefined(Que.DeptID)) { Que.DeptID = 0; }
        if (angular.isUndefined(Que.DocID)) { Que.DocID = 0; }
        if (angular.isUndefined(Que.SpclRegID)) { Que.SpclRegID = 0; }
        if (angular.isUndefined(Que.VisitStatusID)) { Que.VisitStatusID = 0; }
        if (angular.isUndefined(Que.MRN)) { Que.MRN = ''; }
        if (angular.isUndefined(Que.MobNo)) { Que.MobNo = ''; }
        if (angular.isUndefined(Que.TokenNo)) { Que.TokenNo = ''; }
        if (angular.isUndefined(Que.OPDNo)) { Que.OPDNo = ''; }
        if (angular.isUndefined(Que.Date)) { Que.Date = null; }
        if (angular.isUndefined(Que.VisitToDate)) { Que.VisitToDate = null; }
        if (angular.isUndefined(Que.VisitFromDate)) { Que.VisitFromDate = null; }
        if ((Que.VisitToDate != null && Que.VisitFromDate == null) || (Que.VisitToDate == null && Que.VisitFromDate != null)) {
            AlertMessage.info(objResource.msgTitle, objResource.msgSelVisFrmDtAndVisToDt);
        } else {
            if (Que.VisitFromDate <= Que.VisitToDate) {
                Q.push($scope.CurrentPage - 1);
                Q.push(Que.DeptID.toString());
                Q.push(Que.DocID.toString());
                Q.push(Que.SpclRegID.toString());
                Q.push(Que.VisitStatusID.toString());
                Q.push(Que.PatientName.toString());
                Q.push(Que.MRN.toString());
                Q.push(Que.MobNo.toString());
                Q.push(Que.TokenNo.toString());
                Q.push(Que.OPDNo.toString());
                Q.push($filter('date')(Que.Date, 'shortDate'));
                Q.push($filter('date')(Que.VisitFromDate, 'shortDate'));
                Q.push($filter('date')(Que.VisitToDate, 'shortDate'));
                if (exptoexcl) Q.push(false);
                else {
                    if ($scope.IsPostBack == true) {   //for set today's date when loading first time
                        Q[11] = $filter('date')(new Date(), 'shortDate');    //VisitFromDate
                        Q[12] = $filter('date')(new Date(), 'shortDate');    //VisitToDate
                    }
                    Q.push(false);       //Paging enabled
                }
                var responseData = QueueService.GetQueueList(Q);
                responseData.then(function (Response) {
                    if (exptoexcl == true) {
                        $scope.exportToExcel(Response);
                    }
                    else {

                        if (Response.data.length > 0) {
                            $scope.TotalItems = Response.data[0].TotalCount;
                            angular.forEach(Response.data, function (i) {
                                if (i.ReferredDoctor == '- Select -') i.ReferredDoctor = '';
                                if (i.CurrentVisitStatus == 1)
                                    i.VisitStatus = 'Started';
                                else if (i.CurrentVisitStatus == 2)
                                    i.VisitStatus = 'Consultation';
                                else if (i.CurrentVisitStatus == 3)
                                    i.VisitStatus = 'Billing ';
                                else if (i.CurrentVisitStatus == 4) {
                                    i.VisitStatus = 'Closed  ';
                                    i.IsVisitClosed = !i.Status;
                                }
                            })
                        }
                        else $scope.TotalItems = 0;

                        $scope.QueueList = Response.data;
                    }
                    $scope.IsPostBack = false;
                    //   usSpinnerService.stop('GridSpinner');
                }, function (error) {
                    debugger;
                    //    usSpinnerService.stop('GridSpinner');
                    //AlertMessage.error(objResource.msgTitle, objResource.msgError);
                });
            }
            else {
                debugger;
                //   usSpinnerService.stop('GridSpinner');
                AlertMessage.warning(objResource.msgTitle, objResource.msgVisFrmDtGrtrThnVisToDt);
            }
        }
    };  //for landing page

    $scope.ShowAddInfo = function ShowAddInfo(Patient) {

        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: 'AddInfo',
            controller: 'ctrlAddInfo',
            backdrop: false,
            keyboard: false,
            size: 'md',
            resolve: {
                Patient: function () {
                    return Patient;
                }
            }
        });
        modalInstance.result.then(function () {     // return here after cancel reason entered
            var User = [];

        });
    }  //show patient additional info

    $scope.CloseVisit = function CloseVisit(Que) {
        if (Que.IsVisitClosed == true) {
            swalMessages.MessageBox("Palash IVF", 'Do you want to close visit?', "info", function (isConfirmed) {
                if (isConfirmed) {
                    var responseData = QueueService.CloseVisit(Que.VisitID, Que.UnitId);
                    responseData.then(function (Response) {
                        if (Response.data == 1)
                            AlertMessage.success(objResource.msgTitle, objResource.msgVisClosed);
                        //  Que.IsVisitClosed = Que.IsVisitClosed;
                    }, function (error) {
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    });
                }
                else {
                    Que.IsVisitClosed = !Que.IsVisitClosed;
                }
            });
        }
        else {
            Que.IsVisitClosed = !Que.IsVisitClosed;
            AlertMessage.info(objResource.msgTitle, objResource.msgVisAlrdyClosed);
        }
    };  //close visit

    $scope.high = 20;
    $scope.HighliteRow = function HighliteRow(idx) {
        $scope.high = idx;
    }

    $scope.exportToExcel = function (Response) { // ex: '#my-table'
        var filteredData = _.map(Response.data, function (data) {
            var users = {
                'Token No': data.TokenNo, 'OPD No': data.OPDNo, 'Cabin': data.Cabin, 'MRN': data.MRN, 'Patient Name': data.Prefix + ' ' + data.PatientName, 'Visit Type': data.VisitType, 'Department': data.Department, 'Doctor': data.Doctor, 'Remarks': data.Remarks, 'Visit Status': data.VisitStatus
            }
            return users;
        })
        alasql('SELECT * INTO XLSX("Queue.xlsx",{headers:true}) FROM ?', [filteredData]);
    }

    $scope.ClearSearch = function ClearSearch() {
        $scope.Que.Date = new Date();
        $scope.Que.PatientName = '';
        $scope.Que.DeptID = 0;
        $scope.Que.DocID = 0;
    };

    $scope.ClearAdvSearch = function ClearAdvSearch() {
        $scope.Que.MRN = '';
        $scope.Que.MobNo = '';
        $scope.Que.VisitStatusID = 0;
        $scope.Que.SpclRegID = 0;
        $scope.Que.TokenNo = '';
        $scope.Que.OPDNo = '';
        $scope.Que.VisitFromDate = new Date();
        $scope.Que.VisitToDate = new Date();
    }

    $scope.MRNoClick = function (item, link) {
        var SelectedPatient = {};
        $rootScope.hideWhenQueue = false;
        //  var CoupleDetails = {};
        $rootScope.showFemalePopUp = false;
        $rootScope.showMalePopUp = false;
        $rootScope.IsFemale = 0;
        $rootScope.IsMale = 0;
        SelectedPatient.ID = item.PatientID;
        SelectedPatient.UnitID = item.PatientUnitID;
        SelectedPatient.GenderID = item.GenderId;
        SelectedPatient.PatientCategoryID = item.PatientCategoryID;
        SelectedPatient.MRNo = item.MRNo;
        SelectedPatient.PatientName = item.PatientName;
        SelectedPatient.VisitID = item.VisitID;
        SelectedPatient.VisitUnitID = item.UnitId;
        SelectedPatient.VisitStatusID = item.CurrentVisitStatus;
        if (item.PatientCategoryID == 7) {
            var response = Common.GetCoupleDetails(SelectedPatient);
            response.then(function (resp) {
                if (resp.data != null) {
                    if (item.GenderId == 2) $rootScope.showFemalePopUp = false;
                    if (item.GenderId == 1) $rootScope.showMalePopUp = false;
                    $rootScope.IsFemale = 1;
                    $rootScope.IsMale = 1;
                    $rootScope.CoupleDetails = resp.data;
                    if (item.GenderId == 2) {
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = item.VisitID;
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = item.UnitId;
                    }
                    if (item.GenderId == 1) {
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = item.VisitID;
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = item.UnitId;
                    }
                    Common.clearSelectedPatient();
                    Common.clearSelectedCouple();
                    Common.setSelectedPatient(SelectedPatient);
                    Common.setSelectedCouple($rootScope.CoupleDetails);
                    if (SelectedPatient.GenderID == 2) {
                        $rootScope.IsFemaleActive = false;
                        $rootScope.IsMaleActive = false;
                        $rootScope.IsCycleActive = false;
                    }
                    else {
                        $rootScope.IsMaleActive = true;
                        $rootScope.IsFemaleActive = false;
                        $rootScope.IsCycleActive = false;
                    }
                    if (link == 'EMR') {
                        $location.path('/EMRLandingPage/');
                    }
                    else {
                        $location.path('/ARTCycle/');
                        $rootScope.IsCycleActive = true;
                        $rootScope.IsFemaleActive = false;
                        $rootScope.IsMaleActive = false;
                    }
                }
            })
        }
        else {
            var response = Common.GetDonorDetails(SelectedPatient);
            response.then(function (resp) {
                if (resp.data != null) {
                    if (resp.data.GenderID == 1) {
                        $rootScope.showMalePopUp = false; $rootScope.IsMale = 1;
                        $rootScope.CoupleDetails.MalePatient.MalePhotoStr = resp.data.Photo;
                        $rootScope.CoupleDetails.MalePatient.MalePatientName = resp.data.PatientName;
                        $rootScope.CoupleDetails.MalePatient.MaleDOB = resp.data.DOB;
                        $rootScope.CoupleDetails.MalePatient.MaleMRNO = resp.data.MRNo;
                        $rootScope.CoupleDetails.MalePatient.MaleAgeInYr = resp.data.Age;
                        $rootScope.CoupleDetails.MalePatient.MaleHeight = resp.data.MaleHeight;
                        $rootScope.CoupleDetails.MalePatient.MaleWeight = resp.data.MaleWeight;
                        $rootScope.CoupleDetails.MalePatient.MaleBMI = resp.data.MaleBMI;
                        $rootScope.IsMaleActive = true;
                        $rootScope.IsFemaleActive = false;
                    }
                    else if (resp.data.GenderID == 2) {
                        $rootScope.showFemalePopUp = false; $rootScope.IsFemale = 1;
                        $rootScope.CoupleDetails.FemalePatient = {};
                        $rootScope.CoupleDetails.FemalePatient.FemalePhotoStr = resp.data.Photo;
                        $rootScope.CoupleDetails.FemalePatient.FemalePatientName = resp.data.PatientName;
                        $rootScope.CoupleDetails.FemalePatient.FemaleDOB = resp.data.DOB;
                        $rootScope.CoupleDetails.FemalePatient.FemaleMRNO = resp.data.MRNo;
                        $rootScope.CoupleDetails.FemalePatient.FemaleAgeInYr = resp.data.Age;
                        $rootScope.CoupleDetails.FemalePatient.FemaleHeight = resp.data.MaleHeight;
                        $rootScope.CoupleDetails.FemalePatient.FemaleWeight = resp.data.MaleWeight;
                        $rootScope.CoupleDetails.FemalePatient.FemaleBMI = resp.data.MaleBMI;
                        $rootScope.IsMaleActive = false;
                    }
                    //$rootScope.CoupleDetails = resp.data;
                    Common.clearSelectedPatient();
                    Common.clearSelectedCouple();
                    Common.setSelectedPatient(SelectedPatient);
                    if (link == 'EMR') {
                        $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
                        $location.path('/EMRLandingPage/');
                    }
                    else {
                        $location.path('/ARTCycle/');
                        $rootScope.IsCycleActive = true;
                    }
                }
            });
        }
    }
});

PIVF.controller('ctrlAddInfo', function ($scope, $uibModalInstance, Patient, srvCommon) {
    $scope.Pat = Patient;
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    $scope.ReasonCancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

