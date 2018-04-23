angular.module('PIVF').controller('EMRLandingPageCtr', function ($rootScope, $scope, EMRLandingPageSrv, Common, AlertMessage, srvCommon, $location, usSpinnerService) {
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    $rootScope.CycleDetails = null;
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;

    $scope.GetEMRLandingPageData = function () {
        debugger;
        if (selectPatient.ID === undefined)
            selectPatient = JSON.parse(sessionStorage.getItem('selectedPatient'));
        if (selectPatient.GenderID == 1) $rootScope.FormName = 'EMR Dashboard';
        else if (selectPatient.GenderID == 2) $rootScope.FormName = 'EMR Dashboard';

        usSpinnerService.spin('GridSpinner');
        var Promise = EMRLandingPageSrv.GetEMRLandingPageData(selectPatient.ID, selectPatient.UnitID);
        Promise.then(function (resp) {
            $scope.PrescriptionList = resp.data.lstPrescription;
            $scope.DiagnosisList = resp.data.lstDiagnosis;
            $scope.InvestigationList = resp.data.lstInvestigation;
            if ($scope.selectPatient === undefined) {
                Common.SetPatientContext(selectPatient);
                $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                if (selectPatient.GenderID === 2) {
                    var vdetails = JSON.parse(sessionStorage.getItem('femaleVisitDetails'));
                    if (vdetails) {
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = vdetails.visitid;
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = vdetails.visitunitid;
                    }
                } else {
                    var vdetails = JSON.parse(sessionStorage.getItem('maleVisitDetails'));
                    if (vdetails) {
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = vdetails.visitid;
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = vdetails.visitunitid;
                    }
                }
                usSpinnerService.stop('GridSpinner');
            } else {
                usSpinnerService.stop('GridSpinner');
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        })
    }

    $scope.Redirect = function (path) {

        var obj = {};
        if (path == 'Investigation') {
            obj.InvIsFromDashboard = true;
            obj.ProIsFromDashboard = false;
        }
        else if (path == 'Procedures') {
            obj.InvIsFromDashboard = false;
            obj.ProIsFromDashboard = true;
            path = 'Investigation';
        }
        $rootScope.FormName = path;
        Common.setObj(obj);
        $location.path('/' + path + '/');
    }

    $scope.RedirectNew = function (path) {
        $rootScope.FormName = path;
        $scope.obj = {};
        $scope.obj.IsNewPrescription = 11;
        Common.setObj($scope.obj);
        $location.path('/' + path + '/');
    }
})