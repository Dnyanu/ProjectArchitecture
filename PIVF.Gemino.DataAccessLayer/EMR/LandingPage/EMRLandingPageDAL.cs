using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.Gemino.BusinessLayer.EMR.LandingPage;
using PIVF.Gemino.Entities.Models.EMR.LandingPage;
using System.Data;
using System.Linq;

namespace PIVF.Gemino.DataAccessLayer.EMR.LandingPage
{
    public class EMRLandingPageDAL : EMRLandingPageBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public EMRLandingPageDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public EMRLandingPageVO GetEMRLandingPageData(int PatientID, int UnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            var multi = con.QueryMultiple(GenericSP.GetEMRLandingPageData, Param, null, null, CommandType.StoredProcedure);
            EMRLandingPageVO obj = new EMRLandingPageVO();
            obj.lstPrescription = multi.Read<EMRLandingPagePrescriptionVO>().ToList();
            obj.lstDiagnosis = multi.Read<EMRLandingDiagnosisVO>().ToList();
            obj.lstInvestigation = multi.Read<EMRLandingInvestigationVO>().ToList();
            return obj;
        }
    }
}
