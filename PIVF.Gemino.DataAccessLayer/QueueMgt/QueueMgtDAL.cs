using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.Gemino.BusinessLayer.QueueMgt;
using PIVF.Gemino.Entities.Models.Master.Clinic;
using PIVF.Gemino.Entities.Models.QueueMgt;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.DataAccessLayer.QueueMgt
{
    public class QueueMgtDAL : QueueMgtBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public QueueMgtDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public List<QueueVO> GetQueueList(string[] Que)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetQueueList");
            Param.Add("@DocID", 0);
            Param.Add("@PagingEnabled", 0);
            Param.Add("@VisitStatusID", 0);
            Param.Add("@DeptID", Convert.ToInt32(Que[1]));
            Param.Add("@DocID", Convert.ToInt32(Que[2]));
            Param.Add("@SpclRegID", Convert.ToInt32(Que[3]));
            Param.Add("@VisitStatusID", Convert.ToInt32(Que[4]));
            Param.Add("@PatientName", Convert.ToString(Que[5]) == "" ? null : Convert.ToString(Que[5]));
            Param.Add("@MRN", Convert.ToString(Que[6]));
            Param.Add("@MobNo", Convert.ToString(Que[7]));
            Param.Add("@OPDNo", Convert.ToString(Que[9]));
            Param.Add("@Date", Que[10]);
            Param.Add("@VisitFromDate", Que[11]);
            Param.Add("@VisitToDate", Que[12]);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<QueueVO> lstQueue = new List<QueueVO>();
            lstQueue = this.con.Query<QueueVO>(GenericSP.QueueList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstQueue != null && lstQueue.Count > 0)
            {
                foreach (QueueVO item in lstQueue)
                {
                    // item.LoginName = Security.DecryptString(item.LoginName);
                    if (!string.IsNullOrEmpty(Convert.ToString(item.Photo)))
                        item.PhotoString = System.Text.Encoding.UTF8.GetString(item.Photo);
                    else
                        item.PhotoString = String.Empty;
                }
                lstQueue[0].TotalCount = lstQueue[0].TotalCount;
            }
            return lstQueue;
        }

        public int CloseVisit(int VID, int unitID)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@VID", VID);
            Param.Add("@VisUnitID", unitID);
            Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@UpdatedOn", Environment.MachineName);
            Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.CloseVisit, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Status = Param.Get<Int32>("@ResultStatus");
        }

        public List<Doctor> GetDocList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDoctorList");
            return this.con.Query<Doctor>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<Entities.Models.Master.Clinic.Doctor> GetDocListByDeptID(int DeptID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDoctorListByDeptID");
            Param.Add("@ID", DeptID);

            return this.con.Query<Entities.Models.Master.Clinic.Doctor>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
    }
}
