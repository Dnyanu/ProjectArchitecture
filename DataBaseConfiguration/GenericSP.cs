using PIVF.Gemino.Entities.Models.Configuration;
using PIVF.Gemino.Entities.Models.Patient;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DataBaseConfiguration
{
    public static class GenericSP
    {
        static string EDKey = string.Empty;
        public static UserVO CurrentUser
        {
            get { return (UserVO)System.Web.HttpContext.Current.Session["CurrentUser"]; }
            set { System.Web.HttpContext.Current.Session["CurrentUser"] = value; }
        }
        public static clsCoupleVO SelectedCouple
        {
            get { return (clsCoupleVO)System.Web.HttpContext.Current.Session["SelectedCouple"]; }
            set { System.Web.HttpContext.Current.Session["SelectedCouple"] = value; }
        }
        public static clsPatientVO SelectedPatient
        {
            get { return (clsPatientVO)System.Web.HttpContext.Current.Session["SelectedPatient"]; }
            set { System.Web.HttpContext.Current.Session["SelectedPatient"] = value; }
        }
        public static string Key
        {
            get
            {
                try
                {
                    EDKey = System.Configuration.ConfigurationManager.AppSettings["ED"].ToString();
                }
                catch (ConfigurationErrorsException ex)
                {
                    throw ex;
                }
                return EDKey;
            }
        }

        public const string EditCurrentEvent = "usp_EditCurrentEvent";
        public const string DeleteCurrentEvent = "usp_DeleteCurrentEvent";
        public const string GetList = "usp_GetList";
        public const string GetMasterList = "usp_GetMasterList";
        public const string InsertUpdateUser = "usp_User";
        public const string CheckUserLogin = "usp_CheckUserLogin";
        public const string GetUnitList = "usp_GetUnitList";
        public const string GetStaffList = "usp_GetStaffList";
        public const string GetUserList = "usp_GetUserList";
        public const string GetAllVisitByPatient = "GetAllVisitByPatient";
        #region Ivf Dashboard
        public const string GetPatientList = "usp_GetPatientListForDashboard";
        public const string GetCoupleDetails = "usp_GetCoupleDetails";
        public const string GetDonor = "CIMS_GetDonor";
        #endregion
        public const string AddUpdateSpremFreezing = "usp_AddUpdateSpremFreezing";
        public const string AddUpdateSpremFreezingDetails = "usp_AddUpdateSpremFreezingDetails";
        public const string GetEmbryologyDoctorsList = "usp_IVF_GetEmbryologyDoctorsList";
        public const string GetDoctorsList = "usp_IVF_GetDoctorsList";
        public const string GetSpermFreezingDetailsForThawingForView = "usp_GetSpermFreezingDetailsForThawingForView";
        public const string AddUpdateSpremThawing = "usp_IVF_AddUpdateSpermThawing";
        public const string AddUpdateNewART = "usp_AddUpdateNewART";
        public const string GetARTCycleList = "usp_GetARTCycleList";
        public const string QueueList = "usp_Queue";
        public const string CloseVisit = "usp_CloseVisit";
        public const string AddUpdateSemenExamDetails = "usp_AddUpdateSemenExamDetails";
        public const string AddUpdateSemenWash = "usp_AddUpdateSemenWash";
        public const string GetSemenAnalysisList = "usp_GetSemenAnalysisList";
        public const string GetSemenPreparationList = "usp_GetSemenPreparationList";
        public const string GetSALinkByPatientID = "usp_GetSALinkByPatientID";
        public const string UpdateLinkFinalize = "usp_UpdateLinkFinalize";
        public const string GetSemenFreezList = "usp_GetSemenFreezList";
        public const string GetSemenProcessingForThowingTC = "usp_GetSemenProcessingForThowingTC";
        public const string GetSemenThawingDetailFromSemenPrepIDForTC = "usp_GetSemenThawingForTC";
        public const string GetSemenProcessingDetailFromSemenPrepIDForTC = "usp_GetSemenProcessingDetailFromSemenPrepIDForTC";
        public const string GetSemenFreezListByFormNo = "usp_GetSemenFreezListByFormNo";
        public const string GetSpermBankList = "usp_GetSpermBankList";
        public const string UpdateSemenFreezExpiryDates = "usp_UpdateSemenFreezExpiryDates";
        public const string Investigation = "usp_Investigation";
        public const string OPU = "usp_OPU";
        public const string UploadReport = "usp_UploadReport";
        public const string Outcome = "usp_Outcome";
        public const string AgentMaster = "usp_AgentMaster";
        public const string Registration = "usp_Registration";
        #region User Role SP's
        public const string UserRoleOperations = "usp_UserRoleAllOperations";
        public const string GetMenu = "usp_GetMainMenu";
        public const string AddRole = "usp_AddUserRole";
        public const string UserRoleAlreadyExists = "usp_UserRoleAlreadyExists";
        public const string GetUserRoleRights = "usp_GetUserRoleRights";
        public const string GetEMRLandingPageData = "usp_GetEMRLandingPageData";

        #endregion

        #region SignalR
        public const string GetActiveTickets = "usp_GetTicketsList";
        public const string CheckForDuplicatetickets = "usp_CheckForDuplicatetickets";
        public const string GetCurrentPatientID = "usp_GetCurrentUser";
        #endregion

        public const string InsertFemaleHistory = "usp_InsertFemaleHistory";
        public const string InsertObstetricHistory = "usp_InsertObstetricHistory";
        public const string InsertPreviousTreatmentHistory = "usp_InsertPreviousTreatmentHistory";
        public const string InsertPastMedicationHistory = "usp_InsertPastMedicationHistory";
        public const string GetSinglePatientFemaleHistory = "usp_GetSinglePatientFemaleHistory";
        public const string GetMaleHistory = "usp_GetMaleHistory";
        public const string InsertMaleHistory = "usp_InsertMaleHistory";
        public const string GetSurgeonList = "usp_GetSurgeonList";
        public const string GetAnesthetistList = "usp_GetAnesthetistList";
        public const string GetSurgicalSpermRetrivalByPatientID = "usp_GetSurgicalSpermRetrivalByPatientID";
        public const string InsertSurgicalSpermRetrival = "usp_InsertSurgicalSpermRetrival";
        public const string InsertSurgicalSpermRetrivalImages = "usp_InsertSurgicalSpermRetrivalImages";
        public const string InsertFemaleComplaints = "usp_InsertFemaleComplaints";
        public const string GetSpecificMaleComplaints = "usp_GetSpecificMaleComplaints";
        public const string GetSpecificFemaleComplaints = "usp_GetSpecificFemaleComplaints";
        public const string GetPreviousFollowUpDetails = "usp_GetPreviousFollowUpDetails";
        public const string InsertMaleComplaints = "usp_InsertMaleComplaints";
        public const string GetMalePreviousFollowUpDetails = "usp_GetMalePreviousFollowUpDetails";
        public const string InsertFemaleHistoryImages = "usp_InsertFemaleHistoryImages";
        public const string GetPreviousFollicularScanData = "usp_GetPreviousFollicularScanData";
        public const string GetSingleFollicularScan = "usp_GetSingleFollicularScan";
        public const string InsertFollicularScan = "usp_InsertFollicularScan";
        public const string InsertFollicularScanFromStimulation = "usp_InsertFollicularScanFromStimulation";
        public const string InsertFollicularScanSizeDetails = "usp_InsertFollicularScanSizeDetails";
        public const string InsertFollicularScanImages = "usp_InsertFollicularScanImages";
        public const string GetStimulationChartDetails = "usp_GetStimulationChartDetails";
        public const string GetStimulationChartSizeDetails = "usp_GetStimulationChartSizeDetails";
        public const string InsertStimulationChart = "usp_InsertStimulationChart";
        public const string InsertStimulationAddDrug = "usp_InsertStimulationAddDrug";
        public const string InsertStimulationAddDatewiseDose = "usp_InsertStimulationAddDatewiseDose";
        public const string InsertStimulationE2 = "usp_InsertStimulationE2";
        public const string InsertStimulationProgesterone = "usp_InsertStimulationProgesterone";
        public const string InsertStimulationFSH = "usp_InsertStimulationFSH";
        public const string InsertStimulationTrigger = "usp_InsertStimulationTrigger";
        public const string InsertStimulationRemark = "usp_InsertStimulationrRemark";
        public const string InsertStimulationPhysician = "usp_InsertStimulationPhysician";
        public const string InsertStimulationDrugAdministration = "usp_InsertStimulationDrugAdministration";
        public const string GetAllPartnerSpermogram = "usp_GetAllPartnerSpermogram";
        public const string GetPartnerSpermiogramDataByMRNo = "usp_GetPartnerSpermiogramDataByMRNo";
        public const string GetSemenDonorList = "usp_GetSemenDonorList";
        public const string GetSpermDonorList = "usp_GetSpermDonorList";
        public const string GetPartnerPreparationAssesmentData = "usp_GetPartnerPreparationAssesmentData";
        public const string OocyteThawing = "usp_OocyteThawing";
        public const string InsertSemenDetails = "usp_InsertSemenDetails";
        public const string GetSemenDetailsData = "usp_GetSemenDetailsData";
        public const string GetSSRImagesBySNo = "usp_GetSSRImagesBySNo";
        public const string GetDashboardInfo = "usp_GetDashboardInfo";
        public const string DeleteStimulationDrug = "usp_DeleteStimulationDrug";
        public const string DeleteStimulationDrugByID = "usp_DeleteStimulationDrugByID";
        public const string InsertTariffServiceClass = "usp_InsertTariffServiceClass";
        public const string InsertTariffService = "usp_InsertTariffServiceConfig";
        public const string GetTariffServiceClassList = "usp_GetTariffServiceClassList";
        public const string GetTariffServiceClassListinfo = "usp_GetTariffServiceClassListinfo";
        public const string InsertService = "usp_InsertServiceConfig";
        public const string GetTariffNames = "usp_checkTariffNameList";
        public const string GetSSCCodeList = "usp_GetSSCCodeList";
        public const string GetCodeTypeList = "usp_GetCodeTypeList";
        public const string GetServiceMasterList = "usp_GetServiceMasterList";
        public const string UpdateService = "usp_UpdateServiceConfig";
        public const string GetSingleService = "usp_GetSingleService";
        public const string ExportService = "usp_ExportServiceConfig";
        public const string ActivateDeactivateService = "usp_ActivateDeactivateServiceConfig";
        public const string GetTariffSingleService = "usp_GetTariffSingleService";
        public const string ActivateDeactivateAssCompany = "usp_ActivateDeactivateAssCompanyConfig";
        public const string ActivateDeactivateCompany = "usp_ActivateDeactivateCompanyConfig";


        #region design EMR by rohini
        public const string AddEMRTemplate = "USP_AddEMRTemplate";
        public const string AddUpdateEMRTemplateDetails = "USP_AddUpdateEMRTemplateDetails"; //FOR TRANSACTION
        public const string AddUpdateEMRTemplateImages = "USP_AddUpdateEMRTemplateImages";
        public const string GetTemplateList = "usp_GetTemplateList";
        public const string GetTemplateByID = "USP_GetTemplateByID";
        public const string DeleteEMRTemplate = "USP_DeleteEMRTemplate";
        public const string DeactiveEMRTemplate = "USP_DeactiveEMRTemplate";
        public const string GetTemplateByFormID = "USP_GetTemplateByFormID";
        public const string GetAllTemplateList = "USP_GetAllTemplateList";
        public const string GetTemplateData = "USP_GetTemplateData";
        public const string GetFormsList = "usp_GetFormsList";
        #endregion
        #region Consent by rohini
        public const string AddConsentDetails = "USP_AddConsentDetails";
        public const string AddConsentLinkDetails = "USP_AddConsentLinkDetails";
        public const string GetConsentMasterList = "usp_GetConsentMasterList";
        public const string GetConsentLinkList = "USP_GetConsentLinkList";
        public const string GetConsentByID = "USP_GetConsentByID";
        //FOR TRANSACTION
        public const string GetConsentList = "GetConsentList";
        public const string GetConsentDetailsByID = "USP_GetConsentDetailsByID";
        public const string AddConsentActionDetails = "USP_AddConsentActionDetails";
        public const string GetConsentGrid = "USP_GetConsentGrid";
        public const string UpdateConsentFileDetails = "USP_UpdateConsentFileDetails";
        public const string ViewConsentReport = "usp_ViewConsentReport";
        #endregion

        #region Diagnosis by rohini
        public const string AddOtherDiagnosis = "USP_AddOtherDaignosis";
        public const string SetFavouriteDiagnosis = "USP_SetFavouriteDiagnosis";
        public const string RemoveFavouriteDiagnosis = "USP_RemoveFavouriteDaignosis";
        public const string GetFavouriteDiagnosis = "USP_GetFavouriteDiagnosis";
        public const string GetDiagnosis = "USP_GetDiagnosis";
        public const string GetOtherDiagnosis = "USP_GetOtherDiagnosis";
        public const string DeleteOtherDiagnosis = "USP_DeleteOtherDiagnosis";
        public const string AddDiagnosisDeatails = "USP_AddDiagnosisDeatails";
        public const string DeleteDiagnosisDeatails = "USP_DeleteDiagnosisDeatails";
        public const string GetPatientDiagnosis = "USP_GetPatientDiagnosis";
        public const string DeletePatientDiagnosis = "USP_DeletePatientDiagnosis";
        public const string CheckIfDiagnosisAddedToPatient = "USP_CheckIfDiagnosisAddedToPatient";
        #endregion
        #region Cryo Preservation By Rohinee
        //for oocyete Vitrification
        public const string GetVitrificationDetailsForOocytes = "IVFDashboard_GetVitrificationDetailsForOocytes";
        public const string UpdateOocyteVitrification = "USP_UpdateOocyteVitrification";
        public const string GetVitrificationDetailsOocyteBank = "usp_GetVitrificationDetailsOocyteBank";
        public const string GetVitrificationBankHistory = "usp_GetVitrificationBankHistory";
        #endregion
        #region Prescription by rohini
        public const string GetItemsForPrescription = "USP_GetItemsForPrescription";
        public const string GetDrugDetailsByID = "USP_GetDrugDetailsByID";
        public const string GetFavDrugsByTempID = "USP_GetFavDrugsByTempID";
        public const string DeletePatientPrescriptionDetails = "USP_DeletePatientPrescriptionDetails";
        public const string AddPatientPrescriptionDetail = "USP_AddPatientPrescriptionDetail";
        public const string GetTodaysPrescriptionDetails = "USP_GetTodaysPrescriptionDetails";
        public const string GetPreviousPrescriptionDetails = "USP_GetPreviousPrescriptionDetails";
        public const string SetFavDrugsToUser = "USP_SetFavDrugsToUser";
        public const string DeleteFavDrugs = "USP_DeleteFavDrugs";
        public const string GetTemplatesForUsers = "USP_GetTemplatesForUsers";
        public const string GetMoleuleByID = "USP_GetMoleuleByID";
        public const string GetTemplateForDropDown = "USP_GetTemplateForDropDown";
        public const string FillFrequency = "USP_FillFrequency";
        public const string CheckMoleculeIsAllergies = "USP_CheckMoleculeIsAllergies";

        #endregion
        #region IUI BY ROIHINI
        public const string GetIUIDetails = "usp_GetIUIDetails";
        public const string GetFreezSamplesForDonnor = "GetFreezSamplesForDonnor";
        public const string GetThowingDetails = "USP_GetThowingDetails";
        #endregion
        #region Media BY ROHINI
        public const string GetItemsForMedia = "USP_GetItemsForMedia";
        public const string AddMediaDetails = "USP_AddMediaDetails";
        public const string UpdateMediaDetails = "USP_UpdateMediaDetails";
        public const string GetMediaList = "USP_GetMediaList";
        #endregion
        #region Donor by rohini
        public const string GetDonorList = "USP_GetDonorList";
        public const string AddUpdateDonerRegistration = "USP_AddUpdateDonerRegistration";

        #endregion
        #region for Report by rohini
        public const string PatientPrescription = "RP_PatientPrescription";
        public const string RP_UnitDetails = "RP_UnitDetails";
        #endregion

        #region Added By Vikrant For Vitals
        public const string SaveVitals = "usp_SaveVitals";
        public const string GetVitalsList = "usp_GetVitalsList";
        public const string DeleteVitalsByID = "usp_DeleteVitalsByID";
        public const string CheckTodayVisit = "usp_CheckTodayVisit";
        public const string GetActiveVisitByPatient = "GetActiveVisitByPatient";
        #endregion

        #region added by vikrant For embrology
        public const string GetOPUDataForEmbrology = "usp_GetOPUDataForEmbrology";
        public const string SaveUpdateOcyte = "IVFDashBoard_AddUpdateOocyteNumber";
        public const string IVFDashBoard_AddDay0OocList = "IVFDashBoard_AddDay0OocList";
        public const string USP_IVFDashBoard_AddDay0OocListInGhaphicalRepresentationTable = "USP_IVFDashBoard_AddDay0OocListInGhaphicalRepresentationTable";
        public const string fillDayOocyteGrid = "USP_IVFDashBoard_GetGraphicalRepOocList";
        public const string fillDayWiseOocyteGrid = "USP_IVFDashBoard_GetOocytesForDayWise";
        public const string FillDayOneMaster = "USP_IVFDashBoard_FillDayOneMaster";
        public const string SaveDayOne = "USP_IVFDashBoard_SaveUpdateDayOne";
        public const string SaveDaywiseImg = "USP_IVFDashBoard_SaveDaywiseImg";
        public const string SaveDonarImgToCoupleAgains = "USP_SaveDonarImgToCoupleAgains";
        public const string DeleteOocytesImg = "USP_IVFDashBoard_DeleteOocytesImg";
        public const string GetOocytesImg = "USP_IVFDashBoard_GetOocytesImg";
        //For Day 2
        public const string fillDayTwoOocyteGrid = "USP_IVFDashBoard_GetOocytesForDayTwo";
        public const string FillDayTwoMaster = "USP_IVFDashBoard_FillDayTwoMaster";
        public const string SaveDayTwo = "USP_IVFDashBoard_SaveUpdateDayTwo";
        //for Day 3
        public const string fillDayThreeOocyteGrid = "USP_IVFDashBoard_GetOocytesForDayThree";
        public const string FillDayThreeMaster = "USP_IVFDashBoard_FillDayThreeMaster";
        public const string SaveDayThree = "USP_IVFDashBoard_SaveUpdateDayThree";
        //For Day 4
        public const string fillDayFourOocyteGrid = "USP_IVFDashBoard_GetOocytesForDayFour";
        public const string FillDayFourMaster = "USP_IVFDashBoard_FillDayFourMaster";
        public const string SaveDayFour = "USP_IVFDashBoard_SaveUpdateDayFour";
        //For Day 5
        public const string fillDayFiveOocyteGrid = "USP_IVFDashBoard_GetOocytesForDayFive";
        public const string FillDayFiveMaster = "USP_IVFDashBoard_FillDayFiveMaster";
        public const string SaveDayFive = "USP_IVFDashBoard_SaveUpdateDayFive";
        //For Day 6
        public const string fillDaySixOocyteGrid = "USP_IVFDashBoard_GetOocytesForDaySix";
        public const string FillDaySixMaster = "USP_IVFDashBoard_FillDaySixMaster";
        public const string SaveDaySix = "USP_IVFDashBoard_SaveUpdateDaySix";

        //for day 0 by rohini
        public const string GetOocytesForDay0 = "USP_IVFDashBoard_GetOocytesForDay0";
        public const string SaveUpdateDayZero = "USP_IVFDashBoard_SaveUpdateDayZero";
        public const string GetOocytesGridForDay0 = "USP_IVFDashBoard_GetOocytesGridForDay0";
        public const string UpdateFinalizedDayZero = "USP_IVFDashBoard_UpdateFinalizedDayZero";
        public const string GetOocytDetailsByID = "USP_IVFDashBoard_GetOocytDetailsByID";
        public const string CheckLinkCouplecycleAvialbleOrNot = "USP_CheckLinkCouplecycleAvialbleOrNot";
        public const string GetSemenDetails = "USP_IVFDashBoard_GetSemenDetailsForDay0";
        #endregion

        #region Added By Vikrant For ET
        public const string FillETMasters = "usp_FillETMasters";
        public const string FillETGrid = "usp_FillETGrid";
        public const string SaveET = "usp_SaveET";
        public const string SaveETImg = "usp_SaveETImg";
        public const string GetETEmbryoImg = "usp_GetETEmbryoImg";
        public const string DeleteETImg = "usp_DeleteETImg";
        #endregion

        #region Added By Vikrant For Vitrification
        public const string GetFreezeEmbryo = "usp_GetFreezeEmbryo";
        public const string FillEmbryoVitrificationMasters = "usp_FillEmbryoVitrificationMasters";
        public const string UpdateFreezeEmbryo = "usp_UpdateFreezeEmbryo";
        public const string ISAllEmbryoFreeze = "usp_ISAllEmbryoFreeze";
        #endregion

        #region Added By Vikrant For EmbryoThowing
        public const string GetFreezeEmbryoForThowing = "usp_GetFreezeEmbryoForThowing";
        public const string FillEmbryoThowMasters = "usp_FillEmbryoThowMasters";
        public const string SaveThawEmbryo = "usp_SaveThawEmbryo";
        public const string GetThawingData = "usp_GetThawingData";

        #endregion

        #region Added By Vikrant For Page config Setting
        public const string GetcycleType = "usp_GetcycleType";
        #endregion

        #region Added By vikrant For GetDonorList For Oocyte Thaw 
        public const string GetDonorListForOocyteCryo = "usp_GetDonorListForOocyteCryo";
        public const string GetVitrificationDetails = "usp_GetVitrificationDetails";
        public const string SaveTransferData = "usp_SaveTransferData";
        #endregion

        #region Patient Registration Integration
        public const string GetPatientListReg = "usp_GetPatientList";
        public const string InsertUpdateBankDetails = "usp_InsertUpdateBankDetails";
        public const string GetRegistrationTypesList = "usp_GetAllPatientRegType";
        public const string GetStateList = "usp_GetStates";
        public const string GetCityList = "usp_GetCity";
        public const string GetIdentityProofList = "usp_GetIdentityProofs";
        public const string GetBloodGroupList = "usp_GetBloodGroups";
        public const string GetSpecialRegistrationMasterList = "usp_GetSpecialRegistrations";
        public const string GetEducationList = "usp_GetGetEducations";
        public const string GetReligionList = "usp_GetReligions";
        public const string GetOccupationList = "usp_GetOccupations";
        public const string GetNationalityList = "usp_GetNationalities";
        public const string GetSourceOfReferenceList = "usp_GetSourceOfReferences";
        public const string GetDDDoctorList = "usp_GetDoctors";
        public const string GetSpecializationList = "usp_GetSpecializations";
        public const string GetPrefixList = "usp_GetPrefixs";
        public const string GetNewBornBabyiesMothers = "usp_GetNewBornBabyiesMothers";
        public const string GetAddressFor = "usp_GetAddressFor";
        public const string GetAddressType = "usp_GetAddressType";
        public const string InsertNewBornPatient = "usp_InsertNewBornPatient";
        public const string InsertPatientRegistration = "usp_InsertPatientRegistration";
        public const string GetSinglePatient = "usp_GetSinglePatient";
        public const string UpdatePatientRegistration = "usp_UpdatePatientRegistration";
        public const string GetSelectedBabyiesMother = "usp_GetSelectedBabyiesMother";
        public const string CheckPatientExistsCheck = "usp_CheckPatientExistsCheck";
        public const string CheckDoctorExistsCheck = "usp_CheckDocotrExists";
        public const string GetGenderPatientAndSpouseList = "usp_GetGenderPatientAndSpouseList";
        public const string GetGenderList = "usp_GetGenderList";
        public const string GetAppointmentsList = "usp_GetAppointmentList";
        public const string ExportData = "usp_GetPatientListForExport";
        #endregion

        #region Doctor Registration Integration
        public const string GetDocList = "usp_GetDoctorList";
        public const string GetDDLists = "usp_GetMasterList";
        public const string GetSubSpecBySID = "usp_GetSpecializationBySID";
        public const string GetCountryList = "usp_GetCountryCode";
        public const string GetDeptListForDoc = "usp_GetDepartments";
        public const string InsertUpdateDoctor = "usp_InsertUpdateDoctor";
        public const string InsertUpdateStaff = "usp_InsertUpdateStaff";
        public const string GetSpecificDoctor = "usp_GetSpecificDoctorByID";
        public const string GetDoctDetailByName = "usp_GetDoctorDetailsByName";
        public const string GetDayMaster = "usp_GetDayMaster";
        public const string GetAllDoctorNames = "usp_GetAllDoctorNames";
        #endregion

        #region Patient Visit SP's
        public const string GetPatientVisit = "usp_GetPatientForVisit";
        public const string GetAllDoctorList = "usp_GetAllDoctorsList";
        public const string GetPatientCatBySrcID = "usp_GetPatientCatBySrcID";
        public const string GetAssCompByCompID = "usp_GetAssCompByCompID";
        public const string GetTariffByAssCompID = "usp_GettariffByAssComp";
        public const string GetVisitlist = "usp_GetVisitlist";
        public const string GetVisitTypeList = "usp_GetVisitTypeList";
        public const string GetSponserlist = "usp_GetSponserlist";
        public const string AddVisit = "usp_AddVisit";
        public const string SetTokenNo = "usp_SetTokenNo";
        public const string GetPatientRelation = "usp_GetPatientRelation";
        #endregion

        #region Master integraion
        public const string CompanyMaster = "usp_CompanyMaster";
        public const string CompanyList = "usp_GetCompanyList";
        public const string FillAssociateCompanyPatientList = "usp_GetAssCompanyPatientCategory";
        public const string FillAssociateCompanyTariffList = "usp_GetCompanyAssignedTariff";
        public const string UpdateAssCompanyMaster = "usp_UpdateAddAssCompanyMaster";
        public const string AssCompanyMaster = "usp_AddAssCompanyMaster";
        public const string AssoCompanyGrid = "usp_GetAssoCompanyList";
        public const string GetAssCompanyByID = "usp_GetAssCompanyByID";
        public const string TariffMaster = "usp_TariffMaster";
        #endregion

        #region Billing
        public const string GetPatientAdvanceList = "usp_GetPatientAdvanceList";
        public const string GetPatientAdvanceAgainstList = "usp_GetPatientAdvanceAgainstList";
        public const string GetModeOfPaymentList = "usp_GetModeOfPaymentList";
        public const string GetBankList = "usp_GetBankList";
        public const string GetPatientAdvanceRefunds = "usp_GetPatientAdvanceRefunds";
        public const string GetPatientNewAdvances = "usp_GetPatientNewAdvances";
        public const string CIMS_AddAdvance = "CIMS_AddAdvance";
        public const string CIMS_AddPayment = "CIMS_AddPayment";
        public const string CIMS_AddAdvancePaymentDetails = "CIMS_AddAdvancePaymentDetails";
        public const string CIMS_AddPaymentDetails = "CIMS_AddPaymentDetails";
        public const string CIMS_AddRefund = "CIMS_AddRefund";
        public const string GetPatientTariffByCategory = "usp_GetPatientTariffByCategory";
        public const string GetPatientServiceDetails = "usp_GetPatientServiceDetails";

        public const string GetClassList = "usp_GetClassList";
        public const string InsertAssignClass = "usp_InsertAssignClass";
        public const string GetSingleServiceForAssignClass = "Usp_getSingleServiceForAssignClass";
        public const string GetBaseRate = "Usp_getGetBaseRate";
        public const string RemoveClassBaseRate = "usp_RemoveClass";
        public const string ServiceAssignTariff = "usp_ServiceAssignTariff";

        public const string GetSingleTariffForAssignClinic = "Usp_getSingleTariffForAssignClinic";
        public const string InsertAssignClinic = "usp_InsertAssignClinic";
        public const string GetSingleTariffOnEditMode = "Usp_getSingleTariffOnEditMode";

        public const string GetPackageList = "CIMS_GetPackageList";
        public const string Genome_GetPackageList = "Genome_GetPackageList";

        public const string GetMasterListByID = "usp_GetMasterListByID";

        public const string CIMS_GetPatientSponsorDetails = "CIMS_GetPatientSponsorDetails";
        public const string CIMS_GetPatientSponsorCompanyDetails = "CIMS_GetPatientSponsorCompanyDetails";
        public const string CIMS_GetPatientSponsorTariffDetails = "CIMS_GetPatientSponsorTariffDetails";
        public const string CIMS_GetPatientAdvanceConditionaliy = "usp_GetPatientAdvanceConditionaliy";

        public const string Genome_AddPatientBill = "Genome_AddPatientBill";
        public const string Genome_AddPatientBillCharge = "Genome_AddPatientBillCharge";
        public const string Genome_AddPatientBillChargeDetails = "Genome_AddPatientBillChargeDetails";
        public const string Genome_AddPatientBillPayment = "Genome_AddPatientBillPayment";
        public const string Genome_AddPatientBillPaymentDetails = "Genome_AddPatientBillPaymentDetails";
        public const string Genome_PatientBillLanding = "Genome_PatientBillLanding";
        public const string Genome_PatientBillServices = "Genome_PatientBillServices";
        public const string Genome_DeletePatientBillService = "Genome_DeletePatientBillService";
        public const string Genome_SettlePatientBill = "Genome_SettlePatientBill";
        public const string Genome_NewBillLandingSettings = "Genome_NewBillLandingSettings";

        public const string Genome_GetOPDNOList = "Genome_GetOPDNOList";
        public const string Genome_GetBillingStatusList = "Genome_GetBillingStatusList";
        public const string Genome_BillListLanding = "Genome_BillListLanding";
        public const string Genome_CancelServices = "CIMS_CancelServices";
        public const string Genome_RefundBillListLanding = "Genome_RefundBillListLanding";
        public const string PIVF_GetPackageListAgainstPatient = "PIVF_GetPackageListAgainstPatient";
        #endregion

        #region Appointment 
        public const string GetAppointment = "usp_GetAppointments";
        public const string GetPatientVisitList = "usp_GetCityAndClinicNames";
        public const string GetCityAndClinicNames = "usp_GetCityAndClinicNames";
        public const string GetSearchItemData = "usp_GetSearchItemData";
        #endregion

        #region Doctor Schedule
        public const string GetDoctorScheduleDates = "usp_GetDoctorScheduleDates";
        public const string AddDoctorScheduleMaster = "usp_DoctorSchedule";
        public const string UpdateDoctorSchedule = "usp_UpdateDoctorSchedule";
        public const string UpdateDSStatusLanding = "usp_UpdateDSStatusLanding";
        public const string GetDepartmentsByID = "usp_GetDepartmentsByID";
        public const string AddScheduleDetail = "usp_AddScheduleDetail";
        public const string AddDoctorScheduleDetails = "usp_AddDoctorScheduleDetails";
        public const string GetScheduleListLanding = "usp_GetScheduleListLanding";
        public const string GetScheduleListByDoctorID = "usp_GetScheduleListByDoctorID";
        public const string GetScheduleDescriptionList = "usp_GetScheduleDescriptionList";
        public const string UpdateSchedule = "usp_UpdateSchedule";
        #endregion

        #region Surrogate 
        public const string GetSurrogate = "USP_GetSurrogate";
        public const string SaveUpdateSurrogate = "USP_SaveUpdateSurrogate";
        public const string SaveUpdateSurrogateDetails = "USP_SaveUpdateSurrogateDetails";
        #endregion
    }
    public class DapperConnection
    {
        private IDbConnection _db = new SqlConnection(ConfigurationManager.ConnectionStrings["PIVFContext"].ConnectionString);
        public IDbConnection DapCon
        {
            get
            {
                return _db;
            }
            set
            {
                _db = value;
            }
        }
    }
}
