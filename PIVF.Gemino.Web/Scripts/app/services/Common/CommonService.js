PIVF.service('Common', function ($http, API, $rootScope) {
    var ID = 0;
    var obj = {};
    var objSelectedPatient = {};
    var objSelectedCouple = {};
    var lstUserRights = [];

    this.SetPatientContext = function (selectedPatient) {
        debugger;
        if (selectedPatient.PatientCategoryID == 7) {
            $rootScope.IsFemale = 1;
            $rootScope.IsMale = 1;
            if (selectedPatient.GenderID == 2) {
                $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
            }
            else {
                $rootScope.IsMaleActive = true;
                $rootScope.IsFemaleActive = false;
            }
            var response = this.GetCoupleDetails(selectedPatient);
            response.then(function (resp) {

                if (resp.data != null) {
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
                    this.clearSelectedPatient();
                    this.clearSelectedCouple();
                    this.setSelectedPatient(selectedPatient);
                    this.setSelectedCouple($rootScope.CoupleDetails);
                }
            });

        }
        else {
            if (selectedPatient.GenderID == 2) {
                $rootScope.IsFemale = 1;
                $rootScope.IsFemaleActive = true;
                $rootScope.IsMaleActive = false;
            }
            else {
                $rootScope.IsMale = 1;
                $rootScope.IsMaleActive = true;
                $rootScope.IsFemaleActive = false;
            }
            var response = this.GetDonorDetails(selectedPatient);
            response.then(function (resp) {
                if (resp.data != null) {
                    this.clearSelectedPatient();
                    this.clearSelectedCouple();

                    this.SetSelectedPatientInAPI(selectedPatient);
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

                    }

                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                    $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};

                    this.setSelectedPatient(selectedPatient);
                    this.setSelectedCouple($rootScope.CoupleDetails);

                }
            });
        }
    };


    this.setID = function (id) {
        ID = id;
    };

    this.getID = function () {
        return ID;
    };

    this.clearID = function () {
        ID = 0;
    };

    this.setUnitID = function (unitid) {
        UnitID = unitid;
    };

    this.getUnitID = function () {
        return UnitID;
    };

    this.clearUnitID = function () {
        UnitID = 0;
    };



    this.setObj = function (tmpobj) {
        obj = tmpobj;
    };

    this.getObj = function () {
        return obj;
    };
    this.clearObj = function () {
        obj = {};
    };
    this.setUserRights = function (tmpobj) {
        lstUserRights = tmpobj;
    };

    this.getUserRights = function () {
        return lstUserRights;
    };
    this.clearUserRights = function () {
        lstUserRights = [];
    };
    this.setSelectedPatient = function (tmpobj) {
        objSelectedPatient = tmpobj;
    };

    this.getSelectedPatient = function () {
        if (objSelectedPatient === undefined) {
            objSelectedPatient = JSON.parse(sessionStorage.getItem('selectedPatient'));
            return objSelectedPatient;
        }
        else
            return objSelectedPatient;
    };
    this.clearSelectedPatient = function () {
        objSelectedPatient = {};
    };
    this.setSelectedBillPatient = function (tmpobj) {
        objSelectedBillPatient = tmpobj;
    };
    this.getSelectedBillPatient = function () {
        return objSelectedBillPatient;
    };
    this.clearSelectedBillPatient = function () {
        objSelectedBillPatient = {};
    };
    this.setSelectedCouple = function (tmpobj) {
        objSelectedCouple = tmpobj;
    };

    this.getSelectedCouple = function () {
        return objSelectedCouple;
    };
    this.clearSelectedCouple = function () {
        objSelectedCouple = {};
    };


    this.getMasterList = function (tblNm, id, desc) {
        //
        var Response = $http.get(API.APIurl + 'Common/GetMasterList', { params: { tblNm: tblNm, id: id, desc: desc } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.getMasterListByID = function (tblNm, id, desc, parentID, WhereID) {
        //
        var Response = $http.get(API.APIurl + 'Common/GetMasterListByID', { params: { tblNm: tblNm, id: id, desc: desc, parentID: parentID, WhereID: WhereID } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    //By Rohini For Ivf Dashboard Patient List   
    this.getpatientlist = function (UnitID, PatientCategory) {
        var Response = $http.get(API.APIurl + 'Common/GetPatientList', {
            params: { UnitID: angular.toJson(UnitID), PatientCategory: angular.toJson(PatientCategory) }
        }).error(function () {
        });
        return Response;
    }
    //End
    //By Rohini For Ivf Dashboard Patient List   
    this.GetCoupleDetails = function (SelectedPatient) {
        var Response = $http.get(API.APIurl + 'Common/GetCoupleDetails', {
            params: { SelectedPatient: angular.toJson(SelectedPatient) }
        }).error(function () {
        });
        return Response;
    }
    //By Rohini For PATIENT DETAILS by id without set   
    this.GetOnlyCoupleDetailsByID = function (UnitID, ID) {
        var Response = $http.get(API.APIurl + 'Common/GetOnlyCoupleDetailsByID', {
            params: { UnitID: UnitID, ID: ID }
        }).error(function () {
        });
        return Response;
    }

    //By Rohini For Ivf Dashboard Patient List   
    this.GetDonorDetails = function (SelectedPatient) {
        var Response = $http.get(API.APIurl + 'Common/GetDonorDetails', {
            params: { SelectedPatient: angular.toJson(SelectedPatient) }
        }).error(function () {
        });
        return Response;
    }
    //By Rohini For Ivf Dashboard Patient List   
    this.SetSelectedMalePatient = function (SelectedPatient) {
        var Response = $http({
            url: API.APIurl + 'Common/SetSelectedMalePatient',
            data: SelectedPatient,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    this.SetSelectedFemalePatient = function (SelectedPatient) {
        var Response = $http({
            url: API.APIurl + 'Common/SetSelectedFemalePatient',
            data: SelectedPatient,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    this.GetEmbryologyDoctorsList = function (UnitID) {
        var Response = $http.get(API.APIurl + 'Common/GetEmbryologyDoctorsList').error(function () {
        });
        return Response;
    }

    this.GetDoctorList = function (docType) {
        var Response = $http.get(API.APIurl + 'Common/GetDoctorsList', { params: { docType: docType } }).error(function () {
        });
        return Response;
    }

    this.GetDepartmentList = function () {
        var Response = $http.get(API.APIurl + 'Common/GetDepartmentList').error(function () {
        });
        return Response;
    }

    this.GetSpeclRegTypeList = function () {
        var Response = $http.get(API.APIurl + 'Common/GetSpeclRegTypeList').error(function () {
        });
        return Response;
    }

    //check the today's Visit
    this.CheckTodayVisit = function (PatientID, PatientUnitID) {
        var Response = $http.get(API.APIurl + 'Common/CheckTodayVisit', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID }
        }).error(function () {
        });
        return Response;
    }

    this.GetActiveVisitByPatient = function (PatientID, PatientUnitID) {
        var Response = $http.get(API.APIurl + 'Common/GetActiveVisitByPatient', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID }
        }).error(function () {
        });
        return Response;
    }
    //by rohini to get all visit for print 
    this.GetAllVisitByPatient = function (PatientID, PatientUnitID, PageIndex) {
        var Response = $http.get(API.APIurl + 'Common/GetAllVisitByPatient', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PageIndex: PageIndex }
        }).error(function () {
        });
        return Response;
    }
    ////
    this.PutSelectedvisitByPatient = function (CoupleDetails, VisitInfo, gender) {
        var Response = $http({
            url: API.APIurl + 'Common/PutSelectedvisitByPatient',
            data: JSON.stringify({ CoupleDetails: CoupleDetails, VisitInfo: VisitInfo, gender: gender }),
            method: 'post'
        }).error(function () {
        });
        return Response;
    };

    this.SetTherapyDetails = function (TID, UID, TypeID, SubID) {
        var IDs = [];
        IDs.push(TID);
        IDs.push(UID);
        IDs.push(TypeID);
        IDs.push(SubID);
        var Response = $http({
            url: API.APIurl + 'Common/SetTherapyDetails',
            data: IDs,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };

    this.SetSelectedPatientInAPI = function (SelectedPatient) {
        var Response = $http({
            url: API.APIurl + 'Common/SetSelectedPatient',
            data: SelectedPatient,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };

    this.GetArtSubTypeList = function (id, CatID) {
        var Response = $http.get(API.APIurl + 'Common/GetArtSubTypeList', { params: { ArtTypeID: id, patientCatID: CatID } }).error(function () {
        });
        return Response;
    }

    this.GetPatientListByCatList = function (idx, CatID, param) {
        var Response = $http.get(API.APIurl + 'Common/GetPatientListByCatList', { params: { idx: idx, ID: CatID, param: param } }).error(function () {
        });
        return Response;
    }

    this.GetDashBoardData = function () {
        var Response = $http.get(API.APIurl + 'Common/GetDashBoardData').error(function () {
        });
        return Response;
    }

    this.GetCountryList = function () {
        var Response = $http.get(API.APIurl + 'Common/GetCountryList').error(function () {
        });
        return Response;
    }

    this.GetStateList = function (countryID) {
        var Response = $http.get(API.APIurl + 'Common/GetStateList', { params: { countryID: countryID } }).error(function () {
        });
        return Response;
    }

    this.GetCityList = function (stateID) {
        var Response = $http.get(API.APIurl + 'Common/GetCityList', { params: { stateID: stateID } }).error(function () {
        });
        return Response;
    }

    this.GetUnitListDoctorIDForSchedule = function (DOCID) {
        var Response = $http.get(API.APIurl + 'Common/GetUnitListDoctorIDForSchedule', { params: { DOCID: DOCID } }).error(function () {
        });
        return Response;
    }

    this.GetDeptIDListDoctorIDAndUnitID = function (DOCID, UnitID) {
        var Response = $http.get(API.APIurl + 'Common/GetDeptIDListDoctorIDAndUnitID', { params: { DOCID: DOCID, UnitID: UnitID } }).error(function () {
        });
        return Response;
    }

    this.GetDeptIDByUnitIDFOrAppointment = function (UnitID) {
        var Response = $http.get(API.APIurl + 'Common/GetDeptIDByUnitIDFOrAppointment', { params: { UnitID: UnitID } }).error(function () {
        });
        return Response;
    }

    this.GetBDMList = function (stateID) {
        var Response = $http.get(API.APIurl + 'Common/GetBDMList').error(function () {
        });
        return Response;
    }
});