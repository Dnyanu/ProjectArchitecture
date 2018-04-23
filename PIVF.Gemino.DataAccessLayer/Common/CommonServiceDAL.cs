using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.Gemino.BusinessLayer.Common;
using PIVF.Gemino.Entities.Models.Dashboard;
using PIVF.Gemino.Entities.Models.Master.Clinic;
using PIVF.Gemino.Entities.Models.Master.IVF;
using PIVF.Gemino.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.DataAccessLayer.Common
{
    public class CommonServiceDAL : CommonServiceBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public CommonServiceDAL()
        {

            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public List<CommanEntity> GetMasterList(string tblNm, string id, string desc)
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", id);
            Param.Add("@ASID", "ID");
            Param.Add("@Description", desc);
            Param.Add("@ASDescription", "Description");
            Param.Add("@tblName", tblNm);
            return this.con.Query<CommanEntity>(GenericSP.GetMasterList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<clsPatientVO> GetPatientList(long UnitID, long PatientCategory)
        {
            List<clsPatientVO> List = new List<clsPatientVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", UnitID);
                Param.Add("@PatientCategory", PatientCategory);
                Param.Add("@TotalRows", 0, DbType.Int32, direction: ParameterDirection.Output);
                List = this.con.Query<clsPatientVO>(GenericSP.GetPatientList, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                List = null;
            }
            return List;
        }
        public clsCoupleVO GetCoupleDetails(long UnitID, long ID)
        {
            clsCoupleVO Obj = new clsCoupleVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientUnitID", UnitID);
                Param.Add("@PatientID", ID);
                Param.Add("@IsAllCoupleDetails", 0);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                var QueryMultiple = this.con.QueryMultiple(GenericSP.GetCoupleDetails, Param, commandType: CommandType.StoredProcedure);
                Obj = QueryMultiple.Read<clsCoupleVO>().FirstOrDefault();
                Obj.FemalePatient = QueryMultiple.Read<FemalePatientVO>().Single();
                Obj.MalePatient = QueryMultiple.Read<MalePatientVO>().Single();
            }
            catch (Exception ex)
            {
                Obj = null;
            }
            return Obj;
        }
        public DonorDetailsVO GetDonorDetails(long UnitID, long ID)
        {
            DonorDetailsVO Obj = new DonorDetailsVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@UnitID", UnitID);
                Obj = this.con.Query<DonorDetailsVO>(GenericSP.GetDonor, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Obj = null;
            }
            return Obj;
        }
        public clsPatientVO GetIndividualPDetails(long UnitID, long ID)
        {
            clsPatientVO Obj = new clsPatientVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@UnitID", UnitID);
                Obj = this.con.Query<clsPatientVO>(GenericSP.GetDonor, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Obj = null;
            }
            return Obj;
        }
        public clsPatientVO GetSurrogatePDetails(long UnitID, long ID)
        {
            clsPatientVO Obj = new clsPatientVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@UnitID", UnitID);
                Obj = this.con.Query<clsPatientVO>(GenericSP.GetDonor, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Obj = null;
            }
            return Obj;
        }
        public List<CommanEntity> GetEmbryologyDoctorsList()
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            return this.con.Query<CommanEntity>(GenericSP.GetEmbryologyDoctorsList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<CommanEntity> GetDoctorsList(bool docType)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDoctorList");
            Param.Add("@ID", docType);
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<CommanEntity> GetDepartmentList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDepartmentList");
            //  Param.Add("@SearchExp","");
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<CommanEntity> GetSpeclRegTypeList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetSpeclRegTypeList");
            //  Param.Add("@SearchExp","");
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public long CheckTodayVisit(long PatientID, long PatientUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@ResultStatus", 0, DbType.Int64, direction: ParameterDirection.Output);
            this.con.Query<long>(GenericSP.CheckTodayVisit, Param, commandType: CommandType.StoredProcedure);
            long ResultStatus = Param.Get<Int64>("@ResultStatus");
            return ResultStatus;
        }
        public IEnumerable<VisitVO> GetActiveVisitByPatient(long PatientID, long PatientUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            return this.con.Query<VisitVO>(GenericSP.GetActiveVisitByPatient, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<VisitVO> GetAllVisitByPatient(long PatientID, long PatientUnitID, int PageIndex)
        {
            List<VisitVO> _List = new List<VisitVO>();
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@startRowIndex", PageIndex);
            Param.Add("@TotalRows", DbType.Int32, direction: ParameterDirection.Output);

            _List = this.con.Query<VisitVO>(GenericSP.GetAllVisitByPatient, Param, commandType: CommandType.StoredProcedure).ToList();

            if (_List.Count > 0)
                _List[0].TotalRows = Param.Get<Int32>("@TotalRows");
            return _List;
        }
        public List<CommanEntity> GetArtSubTypeList(int ArtTypeID, int patientCatID)
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", patientCatID);
            Param.Add("@SearchExp", ArtTypeID.ToString());
            Param.Add("@Action", "GetArtSubTypeList");
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<clsPatientVO> GetPatientListByCatList(int patientCatID, int idx, string param)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPatientListByCatList");
            Param.Add("@ID", patientCatID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PageIndex", idx);
            Param.Add("@SearchExp", param);
            return this.con.Query<clsPatientVO>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public PageConfig GetcycleType(int ArtTypeID, int ArtSubTypeID)
        {
            var Param = new DynamicParameters();
            Param.Add("@ArtTypeID", ArtTypeID, DbType.Int32);
            Param.Add("@ArtSubTypeID", ArtSubTypeID, DbType.Int32);
            return this.con.Query<PageConfig>(GenericSP.GetcycleType, Param, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }
        public DashboardVO GetDashBoardData()
        {
            DashboardVO obj = new DashboardVO();
            obj.objFemale = new Entities.Models.Dashboard.FemalePatientDashBoardVO();
            obj.objMale = new Entities.Models.Dashboard.MalePatientDashBoardVO();
            var Param = new DynamicParameters();
            if (GenericSP.SelectedPatient.PatientCategoryID == 7)
            {
                Param.Add("@Action", "GetFemaleDashBoard");
                Param.Add("@FemaleID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                Param.Add("@MaleID", GenericSP.SelectedCouple.MalePatient.MaleId);
                //obj.objFemale = this.con.Query<FemalePatientDashBoardVO>(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();

                var QueryMultiple = this.con.QueryMultiple(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure);
                obj.objFemale = QueryMultiple.Read<FemalePatientDashBoardVO>().FirstOrDefault();
                if (obj.objFemale != null)
                    obj.objFemale.Diagnosis = QueryMultiple.Read<string>().Single();
                else
                {
                    obj.objFemale = new FemalePatientDashBoardVO();
                    obj.objFemale.Diagnosis = "";
                }

                // if (obj.objFemale == null) obj.objFemale = new FemalePatientDashBoardVO();
                if (obj.objFemale.GetType().GetProperties().Any())
                {
                    Param.Add("@Action", "GetMaleDashBoard");
                    //obj.objMale = this.con.Query<MalePatientDashBoardVO>(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    var QueryMultiple1 = this.con.QueryMultiple(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure);
                    obj.objMale = QueryMultiple1.Read<MalePatientDashBoardVO>().FirstOrDefault();
                    if (obj.objMale != null)
                        obj.objMale.Diagnosis = QueryMultiple1.Read<string>().Single();
                    else
                    {
                        obj.objMale = new MalePatientDashBoardVO();
                        obj.objMale.Diagnosis = "";
                    }

                }
                //if (obj.objMale == null) obj.objMale = new MalePatientDashBoardVO();
            }
            else
            {
                if (GenericSP.SelectedPatient.GenderID == 1)
                {
                    Param.Add("@Action", "GetMaleDashBoard");
                    Param.Add("@UnitID", GenericSP.SelectedPatient.UnitID);
                    Param.Add("@MaleID", GenericSP.SelectedPatient.ID);
                    //obj.objMale = this.con.Query<MalePatientDashBoardVO>(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    var QueryMultiple2 = this.con.QueryMultiple(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure);
                    obj.objMale = QueryMultiple2.Read<MalePatientDashBoardVO>().FirstOrDefault();
                    if (obj.objMale != null)
                        obj.objMale.Diagnosis = QueryMultiple2.Read<string>().Single();
                    else
                    {
                        obj.objMale = new MalePatientDashBoardVO();
                        obj.objMale.Diagnosis = "";
                    }
                }
                else if (GenericSP.SelectedPatient.GenderID == 2)
                {
                    Param.Add("@Action", "GetFemaleDashBoard");
                    Param.Add("@UnitID", GenericSP.SelectedPatient.UnitID);
                    Param.Add("@FemaleID", GenericSP.SelectedPatient.ID);
                    //obj.objFemale = this.con.Query<FemalePatientDashBoardVO>(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    var QueryMultiple1 = this.con.QueryMultiple(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure);
                    obj.objFemale = QueryMultiple1.Read<FemalePatientDashBoardVO>().FirstOrDefault();
                    if (obj.objFemale != null)
                        obj.objFemale.Diagnosis = QueryMultiple1.Read<string>().Single();
                    else
                    {
                        obj.objFemale = new FemalePatientDashBoardVO();
                        obj.objFemale.Diagnosis = "";
                    }
                }
                //if (obj.objFemale == null) obj.objFemale = new FemalePatientDashBoardVO();
                // if (obj.objMale == null) obj.objMale = new MalePatientDashBoardVO();
            }


            //     obj.objFemale = this.con.Query<FemalePatientDashBoardVO>(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return obj;
        }
        public List<Country> GetCountryList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetCountryList");
            return this.con.Query<Country>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<State> GetStateList(int countryID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetStateByCountryIDList");
            Param.Add("@ID", countryID);
            return this.con.Query<State>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<City> GetCityList(int stateID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetCityByStateIDList");
            Param.Add("@ID", stateID);
            return this.con.Query<City>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<CommanEntity> GetMasterListByID(string tblNm, string id, string desc, string parentID, int WhereID)
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", id);
            Param.Add("@ASID", "ID");
            Param.Add("@Description", desc);
            Param.Add("@ASDescription", "Description");
            Param.Add("@tblName", tblNm);
            Param.Add("@parentID", parentID);
            Param.Add("@WhereID", Convert.ToInt32(WhereID));
            return this.con.Query<CommanEntity>(GenericSP.GetMasterListByID, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<CommanEntity> GetBDMList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetBDMList");
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<CommanEntity> GetUnitListDoctorIDForSchedule(int DOCID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetUnitListDoctorIDForSchedule");
            Param.Add("@ID", DOCID);
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<CommanEntity> GetDeptIDListDoctorIDAndUnitID(int DOCID, int UnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDeptIDListDoctorIDAndUnitID");
            Param.Add("@ID", DOCID);
            Param.Add("@UnitID", UnitID);
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<CommanEntity> GetDeptIDByUnitIDFOrAppointment(int UnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDeptIDByUnitIDFOrAppointment");
            Param.Add("@UnitID", UnitID);
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
    }
}
