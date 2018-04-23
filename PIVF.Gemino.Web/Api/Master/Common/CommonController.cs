using DataBaseConfiguration;
using Newtonsoft.Json.Linq;
using NLog;
using PIVF.Gemino.BusinessLayer.Common;
using PIVF.Gemino.Entities.Models.Dashboard;
using PIVF.Gemino.Entities.Models.Master.IVF;
using PIVF.Gemino.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;
using System.Web.Script.Serialization;

namespace PIVF.Gemino.Web.Api.Master.Common
{
    [Authorize]
    public class CommonController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        CommonServiceBAL srv;
        public CommonController(CommonServiceBAL _srv)
        {
            srv = _srv;
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetMasterList(string tblNm, string id, string desc)
        {
            try
            {
                //logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetUnitList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetMasterList(tblNm, id, desc);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                // logger.Error("UserAPI/GetUnitList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                // logger.Error("UserAPI/GetUnitList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(List<clsPatientVO>))]
        [HttpGet]
        public IHttpActionResult GetPatientList(long UnitID, long PatientCategory)
        {
            try
            {
                var Response = srv.GetPatientList(UnitID, PatientCategory);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(clsCoupleVO))]
        [HttpGet]
        public IHttpActionResult GetCoupleDetails(string SelectedPatient)  //by rohini
        {
            try
            {
                clsPatientVO objPatient = new JavaScriptSerializer().Deserialize<clsPatientVO>(SelectedPatient);
                clsCoupleVO Obj = new clsCoupleVO();
                Obj = srv.GetCoupleDetails(objPatient.UnitID, objPatient.ID);

                if (!string.IsNullOrEmpty(Convert.ToString(Obj.FemalePatient.FemalePhoto)))
                {
                    Obj.FemalePatient.FemalePhotoStr = System.Text.Encoding.UTF8.GetString(Obj.FemalePatient.FemalePhoto);
                }
                if (!string.IsNullOrEmpty(Convert.ToString(Obj.MalePatient.MalePhoto)))
                {
                    Obj.MalePatient.MalePhotoStr = System.Text.Encoding.UTF8.GetString(Obj.MalePatient.MalePhoto);
                }

                GenericSP.SelectedPatient = objPatient;
                GenericSP.SelectedCouple = Obj;
                return Ok(Obj);

            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SetSelectedMalePatient(MalePatientVO SelectedPatient)  //by rohini to set Selected male female patient
        {
            clsPatientVO Obj = new clsPatientVO();
            try
            {
                Obj.ID = SelectedPatient.MaleId;
                Obj.UnitID = SelectedPatient.MAleUnitID;
                Obj.MRNo = SelectedPatient.MaleMRNO;
                Obj.GenderID = SelectedPatient.GenderID;
                Obj.PatientCategoryID = SelectedPatient.PatientCategoryID;
                Obj.VisitID = SelectedPatient.Selectedvisit.VisitID;
                Obj.VisitUnitID = SelectedPatient.Selectedvisit.VisitUnitID;

                GenericSP.SelectedPatient = Obj;
                return Ok();
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SetSelectedFemalePatient(FemalePatientVO SelectedPatient)  //by rohini to set Selected male female patient
        {
            clsPatientVO Obj = new clsPatientVO();
            try
            {
                Obj.ID = SelectedPatient.FemalePatientID;
                Obj.UnitID = SelectedPatient.FemalePatientUnitID;
                Obj.MRNo = SelectedPatient.FemalePatientMRNO;
                Obj.GenderID = SelectedPatient.GenderID;
                Obj.PatientCategoryID = SelectedPatient.PatientCategoryID;
                Obj.VisitID = SelectedPatient.Selectedvisit.VisitID;
                Obj.VisitUnitID = SelectedPatient.Selectedvisit.VisitUnitID;
                GenericSP.SelectedPatient = Obj;
                return Ok();
            }
            catch (SqlException ex)
            {
                Obj = null;
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                Obj = null;
                return new NotFoundResult(Request);
            }
        }

        public IHttpActionResult GetDonorDetails(string SelectedPatient)  //by rohini
        {
            try
            {
                clsPatientVO objPatient = new JavaScriptSerializer().Deserialize<clsPatientVO>(SelectedPatient);
                if (objPatient.PatientCategoryID == 8 || objPatient.PatientCategoryID == 9)
                {
                    DonorDetailsVO Obj = new DonorDetailsVO();
                    Obj = srv.GetDonorDetails(objPatient.UnitID, objPatient.ID);
                    if (!string.IsNullOrEmpty(Convert.ToString(Obj.Photo)))
                    {
                        Obj.PhotoString = System.Text.Encoding.UTF8.GetString(Obj.Photo);
                    }
                    GenericSP.SelectedPatient = objPatient;
                    return Ok(Obj);
                }
                else if (objPatient.PatientCategoryID == 11)
                {
                    clsPatientVO Obj = new clsPatientVO();
                    Obj = srv.GetIndividualPDetails(objPatient.UnitID, objPatient.ID);
                    if (!string.IsNullOrEmpty(Convert.ToString(Obj.Photo)))
                    {
                        Obj.PhotoString = System.Text.Encoding.UTF8.GetString(Obj.Photo);
                    }
                    GenericSP.SelectedPatient = objPatient;
                    return Ok(Obj);
                }
                else if (objPatient.PatientCategoryID == 10)
                {
                    clsPatientVO Obj = new clsPatientVO();
                    Obj = srv.GetSurrogatePDetails(objPatient.UnitID, objPatient.ID);
                    if (!string.IsNullOrEmpty(Convert.ToString(Obj.Photo)))
                    {
                        Obj.PhotoString = System.Text.Encoding.UTF8.GetString(Obj.Photo);
                    }
                    GenericSP.SelectedPatient = objPatient;
                    return Ok(Obj);
                }
                else
                {
                    return new NotFoundResult(Request);
                }

            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetEmbryologyDoctorsList()
        {
            try
            {
                var Response = srv.GetEmbryologyDoctorsList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetDoctorsList(bool docType)
        {
            try
            {
                var Response = srv.GetDoctorsList(docType);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetDepartmentList()
        {
            try
            {
                var Response = srv.GetDepartmentList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetSpeclRegTypeList()
        {
            try
            {
                var Response = srv.GetSpeclRegTypeList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(long))]
        [HttpGet]
        public IHttpActionResult CheckTodayVisit(long PatientId, long PatientUnitID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                           ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                var Response = srv.CheckTodayVisit(PatientId, PatientUnitID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }


        [ResponseType(typeof(IEnumerable<VisitVO>))]
        [HttpGet]
        public IHttpActionResult GetActiveVisitByPatient(long PatientId, long PatientUnitID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                           ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                var Response = srv.GetActiveVisitByPatient(PatientId, PatientUnitID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }


        [ResponseType(typeof(bool))]
        [HttpPost]
        public IHttpActionResult PutSelectedvisitByPatient(JObject jsonData)
        {

            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                           ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                dynamic json = jsonData;
                var CoupleDetails = json.CoupleDetails.ToObject<clsCoupleVO>();
                var VisitInfo = json.VisitInfo.ToObject<VisitVO>();
                long gender = json.gender;
                if (gender == 1)
                {
                    //For Male
                    CoupleDetails.MalePatient.Selectedvisit = VisitInfo;
                    GenericSP.SelectedCouple = CoupleDetails;
                }
                else
                {
                    //For Female
                    CoupleDetails.FemalePatient.Selectedvisit = VisitInfo;
                    GenericSP.SelectedCouple = CoupleDetails;
                }
                return Ok(true);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SetTherapyDetails(int[] IDs)  //by rohini to set Selected male female patient
        {
            try
            {
                GenericSP.SelectedCouple.FemalePatient.TherapyID = IDs[0];
                GenericSP.SelectedCouple.FemalePatient.TherapyUnitID = IDs[1];
                GenericSP.SelectedCouple.FemalePatient.ArtTypeID = IDs[2];
                GenericSP.SelectedCouple.FemalePatient.ArtSubTypeID = IDs[3];
                return Ok();
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SetSelectedPatient(clsPatientVO SelectedPatient)
        {
            try
            {
                GenericSP.SelectedPatient = SelectedPatient;
                return Ok();
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetArtSubTypeList(int ArtTypeID, int patientCatID)
        {
            try
            {
                var Response = srv.GetArtSubTypeList(ArtTypeID, patientCatID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(clsPatientVO))]
        [HttpGet]
        public IHttpActionResult GetPatientListByCatList(int idx, int ID, string param)
        {
            try
            {
                var Response = srv.GetPatientListByCatList(ID, idx, param);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(PageConfig))]
        [HttpGet]
        public IHttpActionResult GetcycleType(int ArtTypeID, int ArtSubTypeID)
        {
            return Ok(srv.GetcycleType(ArtTypeID, ArtSubTypeID));
        }

        [ResponseType(typeof(DashboardVO))]
        [HttpGet]
        public IHttpActionResult GetDashBoardData()
        {
            try
            {
                var Response = srv.GetDashBoardData();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [HttpGet]
        public IHttpActionResult GetCountryList()
        {
            try
            {
                var Response = srv.GetCountryList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [HttpGet]
        public IHttpActionResult GetStateList(int countryID)
        {
            try
            {
                var Response = srv.GetStateList(countryID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [HttpGet]
        public IHttpActionResult GetCityList(int stateID)
        {
            try
            {
                var Response = srv.GetCityList(stateID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [HttpGet]
        public IHttpActionResult GetBDMList()
        {
            try
            {
                var Response = srv.GetBDMList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetMasterListByID(string tblNm, string id, string desc, string parentID, int WhereID)
        {
            try
            {
                //logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetUnitList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetMasterListByID(tblNm, id, desc, parentID, WhereID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                // logger.Error("UserAPI/GetUnitList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                // logger.Error("UserAPI/GetUnitList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [HttpGet]
        public IHttpActionResult GetUnitListDoctorIDForSchedule(int DOCID)
        {
            try
            {
                var Response = srv.GetUnitListDoctorIDForSchedule(DOCID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [HttpGet]
        public IHttpActionResult GetDeptIDListDoctorIDAndUnitID(int DOCID, int UnitID)
        {
            try
            {
                var Response = srv.GetDeptIDListDoctorIDAndUnitID(DOCID, UnitID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(clsCoupleVO))]
        [HttpGet]
        public IHttpActionResult GetOnlyCoupleDetailsByID(long UnitID, long ID)  //by rohini to get patient details by id unitid WITHOUT SET
        {
            try
            {
                // clsPatientVO objPatient = new JavaScriptSerializer().Deserialize<clsPatientVO>(SelectedPatient);
                clsCoupleVO Obj = new clsCoupleVO();
                Obj = srv.GetCoupleDetails(UnitID, ID);

                if (!string.IsNullOrEmpty(Convert.ToString(Obj.FemalePatient.FemalePhoto)))
                {
                    Obj.FemalePatient.FemalePhotoStr = System.Text.Encoding.UTF8.GetString(Obj.FemalePatient.FemalePhoto);
                }
                if (!string.IsNullOrEmpty(Convert.ToString(Obj.MalePatient.MalePhoto)))
                {
                    Obj.MalePatient.MalePhotoStr = System.Text.Encoding.UTF8.GetString(Obj.MalePatient.MalePhoto);
                }

                return Ok(Obj);

            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }



        [HttpGet]
        public IHttpActionResult GetDeptIDByUnitIDFOrAppointment(int UnitID)
        {
            try
            {
                var Response = srv.GetDeptIDByUnitIDFOrAppointment(UnitID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

    }
}
