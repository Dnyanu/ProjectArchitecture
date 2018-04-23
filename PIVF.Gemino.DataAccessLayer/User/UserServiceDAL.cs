using PIVF.Gemino.BusinessLayer.User;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using PIVF.Gemino.Entities.Models.Master.Configuration;
using Dapper;
using DataBaseConfiguration;
using PIVF.Gemino.DataAccessLayer.Security;
using PIVF.Gemino.Entities.Models.Configuration;
using PIVF.Gemino.Entities.Models.Master.IVF;

namespace PIVF.Gemino.DataAccessLayer.User
{
    public class UserServiceDAL : UserServiceBAL
    {
        private Database dbServer = null;
        IDbConnection con;

        public UserServiceDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public List<Unit> GetUnitList()
        {
            return this.con.Query<Unit>(GenericSP.GetUnitList, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<Unit> GetUnitListLogNameWise(string logName)
        {
            var Param = new DynamicParameters();
            string ssss = SecurityDAL.EncryptString(logName);
            //string sssssss = Security.DecryptString(ssss);
            Param.Add("@Action", "GetUnitListLogNameWise");
            Param.Add("@LoginName", SecurityDAL.EncryptString(logName));
            Param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<Unit>(GenericSP.InsertUpdateUser, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<Menu> GetGrandParentList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetGrandParentList");
            Param.Add("@UserID", GenericSP.CurrentUser.UserID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            //    Param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            //var multi = con.DapCon.QueryMultiple(GenericSP.GetMenu, Param, null, null, CommandType.StoredProcedure);
            return this.con.Query<Menu>(GenericSP.GetMenu, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<Menu> GetParentList(int parentid)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetParentList");
            Param.Add("@UserID", GenericSP.CurrentUser.UserID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@ParentID", parentid);
            return this.con.Query<Menu>(GenericSP.GetMenu, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<Menu> GetClildMenuList(int parentid)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetClildMenuList");
            Param.Add("@UserID", GenericSP.CurrentUser.UserID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@ParentID", parentid);
            return this.con.Query<Menu>(GenericSP.GetMenu, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<UnitRoleID> GetRoleListUserwise(int UserID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetUserUnitRoleList");
            Param.Add("@UserID", UserID);
            Param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<UnitRoleID>(GenericSP.InsertUpdateUser, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<UserRole> GetRoleList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetRoleList");
            return this.con.Query<UserRole>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<UserVO> GetUserList(int index, string Name, string LogName, int UsrType, int UsrRole, bool PgEn)
        {
            string ssss = SecurityDAL.EncryptString("");
            var Param = new DynamicParameters();
            Param.Add("@PageIndex", index);
            Param.Add("@UserName", Name);
            Param.Add("@LoginName", SecurityDAL.EncryptString(LogName));
            Param.Add("@UserType", UsrType);
            Param.Add("@RoleID", UsrRole);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PagingEnabled", PgEn);
            List<UserVO> lstusr = new List<UserVO>();
            lstusr = this.con.Query<UserVO>(GenericSP.GetUserList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstusr != null && lstusr.Count > 0)
            {
                foreach (UserVO item in lstusr)
                {
                    item.LoginName = SecurityDAL.DecryptString(item.LoginName);
                }
            }
            return lstusr;
        }


        public List<Entities.Models.Master.Clinic.Doctor> GetDocListByDeptID(int ID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDoctorListByDeptID");
            if (ID > 0)
                Param.Add("@ID", ID);

            return this.con.Query<Entities.Models.Master.Clinic.Doctor>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public UserVO GetUserByID(int id)
        {
            UserVO usr = new UserVO();
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetUserByID");
            Param.Add("@UserID", id);
            Param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            usr = this.con.Query<UserVO>(GenericSP.InsertUpdateUser, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            usr.LoginName = SecurityDAL.DecryptString(usr.LoginName);
            return usr;
        }

        public int ActivateDeactivateUser(string[] user)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "UpdateStatus");
            Param.Add("@UserID", Convert.ToInt32(user[0]));
            Param.Add("@Status", Convert.ToBoolean(user[1]));
            Param.Add("@Reason", user[2]);
            Param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.InsertUpdateUser, Param, commandType: CommandType.StoredProcedure);
            return Status = Param.Get<Int32>("@Result");
        }

        public int LockUnlockUser(string[] user)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "LockUnlockUser");
            Param.Add("@UserID", Convert.ToInt32(user[0]));
            Param.Add("@Lock", Convert.ToBoolean(user[1]));
            Param.Add("@Reason", user[2]);
            if (Convert.ToBoolean(user[1]) == true)
                Param.Add("@LockDate", DateTime.Now);
            else
                Param.Add("@LockDate", null);
            Param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.InsertUpdateUser, Param, commandType: CommandType.StoredProcedure).AsList();
            return Status = Param.Get<Int32>("@Result");
        }

        public int LoginNameExists(string logName, int UID)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "LoginNameExists");
            Param.Add("@LoginName", SecurityDAL.EncryptString(logName));
            Param.Add("@UserID", UID);
            Param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.InsertUpdateUser, Param, commandType: CommandType.StoredProcedure);
            return Status = Param.Get<Int32>("@Result");
        }

        public List<CommanEntity> GetDocList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDoctorList");
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<CommanEntity> GetStaffList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetStaffList");
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public int SaveUpdateUser(UserVO objUser, DataTable dt)
        {
            var Param = new DynamicParameters();
            int Status = 0;
            Param.Add("@Action", "AddUpdateUser");
            Param.Add("@UnitID", objUser.UnitID);
            Param.Add("@ID", objUser.SelID);
            Param.Add("@UserID", objUser.UserID);
            if (objUser.UserTypeId == 1)
            {
                Param.Add("@IsDoctor", true);
                Param.Add("@DocID", objUser.SelID);
            }
            else if (objUser.UserTypeId == 2)
            {
                Param.Add("@IsEmployee", true);
                Param.Add("@EmployeeID", objUser.SelID);
            }
            Param.Add("@LoginName", SecurityDAL.EncryptString(objUser.LoginName));
            Param.Add("@Password", objUser.Password);
            Param.Add("@MinPwdLength", objUser.MinPwdLength);
            Param.Add("@MaxPwdLength", objUser.MaxPwdLength);
            Param.Add("@MaxPwdAge", objUser.MaxPwdAge);
            Param.Add("@MinPwdAge", objUser.MinPwdAge);
            Param.Add("@LockThreshold", objUser.LockThreshold);
            Param.Add("@LockDuration", objUser.LockDuration);
            Param.Add("@NoOfPwdRember", objUser.NoOfPwdRember);
            Param.Add("@AtleastOneDigit", objUser.AtleastOneDigit);
            Param.Add("@AtleastOneUpperCase", objUser.AtleastOneUpperCase);
            Param.Add("@AtleastOneLowerCase", objUser.AtleastOneLowerCase);
            Param.Add("@AtleastOneSpecChar", objUser.AtleastOneSpecialChar);
            Param.Add("@ExpirationInterval", objUser.ExpirationInterval);
            Param.Add("@UserTypeID", objUser.UserTypeId);
            Param.Add("@Lock", objUser.IsLocked);
            Param.Add("@UserRoleDetails", dt.AsTableValuedParameter());
            Param.Add("@Status", 1);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UnitID);
            Param.Add("@UpdatedOn", Environment.MachineName);
            Param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.InsertUpdateUser, Param, commandType: CommandType.StoredProcedure);
            return Status = Param.Get<Int32>("@Result");
        }

        public List<Menu> GetUserRoleRights()
        {
            var Param = new DynamicParameters();
            Param.Add("@UserID", GenericSP.CurrentUser.UserID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            return this.con.Query<Menu>(GenericSP.GetUserRoleRights, Param, commandType: CommandType.StoredProcedure).AsList();
        }
    }
}
