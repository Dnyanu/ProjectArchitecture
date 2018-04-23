using PIVF.Gemino.Entities.Models.Configuration;
using PIVF.Gemino.Entities.Models.Master.Configuration;
using PIVF.Gemino.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.BusinessLayer.User
{
    public interface UserServiceBAL
    {
        List<Unit> GetUnitList();
        List<Unit> GetUnitListLogNameWise(string logName);
        List<Menu> GetGrandParentList();
        List<Menu> GetParentList(int parentid);
        List<Menu> GetClildMenuList(int parentid);
        List<UnitRoleID> GetRoleListUserwise(int UserID);
        List<UserRole> GetRoleList();
        List<UserVO> GetUserList(int index, string Name, string LogName, int UsrType, int UsrRole, bool PgEn);
        List<Entities.Models.Master.Clinic.Doctor> GetDocListByDeptID(int ID);
        UserVO GetUserByID(int id);
        int ActivateDeactivateUser(string[] user);
        int LockUnlockUser(string[] user);
        int LoginNameExists(string logName, int UID);
        List<CommanEntity> GetDocList();
        List<CommanEntity> GetStaffList();
        int SaveUpdateUser(UserVO objUser, DataTable dt);
        List<Menu> GetUserRoleRights();
    }
}
