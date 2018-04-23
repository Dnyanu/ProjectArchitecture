using PIVF.Gemino.Entities.Models.Dashboard;
using PIVF.Gemino.Entities.Models.Master.Clinic;
using PIVF.Gemino.Entities.Models.Master.IVF;
using PIVF.Gemino.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.BusinessLayer.Common
{
    public interface CommonServiceBAL
    {
        List<CommanEntity> GetMasterList(string tblNm, string id, string desc);
        List<clsPatientVO> GetPatientList(long UnitID, long PatientCategory);
        clsCoupleVO GetCoupleDetails(long UnitID, long ID);
        DonorDetailsVO GetDonorDetails(long UnitID, long ID);
        clsPatientVO GetIndividualPDetails(long UnitID, long ID);
        clsPatientVO GetSurrogatePDetails(long UnitID, long ID);
        List<CommanEntity> GetEmbryologyDoctorsList();
        List<CommanEntity> GetDoctorsList(bool docType);
        List<CommanEntity> GetDepartmentList();
        List<CommanEntity> GetSpeclRegTypeList();
        long CheckTodayVisit(long PatientID, long PatientUnitID);
        IEnumerable<VisitVO> GetActiveVisitByPatient(long PatientID, long PatientUnitID);
        List<CommanEntity> GetArtSubTypeList(int ArtTypeID, int patientCatID);
        List<clsPatientVO> GetPatientListByCatList(int patientCatID, int idx, string param);
        PageConfig GetcycleType(int ArtTypeID, int ArtSubTypeID);
        List<VisitVO> GetAllVisitByPatient(long PatientID, long PatientUnitID, int PageIndex);
        DashboardVO GetDashBoardData();
        List<Country> GetCountryList();
        List<State> GetStateList(int countryID);
        List<City> GetCityList(int stateID);
        List<CommanEntity> GetUnitListDoctorIDForSchedule(int DOCID);
        List<CommanEntity> GetDeptIDListDoctorIDAndUnitID(int DOCID, int UnitID);
        List<CommanEntity> GetDeptIDByUnitIDFOrAppointment(int UnitID);
        List<CommanEntity> GetBDMList();
        List<CommanEntity> GetMasterListByID(string tblNm, string id, string desc, string parentID, int WhereID);
    }
}
