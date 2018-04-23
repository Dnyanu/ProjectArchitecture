using PIVF.Gemino.Entities.Models.Master.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.BusinessLayer.User
{
    public interface UserRoleServiceBAL
    {
        IQueryable<UserRole> GetRoleList(int PageIndex, string Code, string Description, bool PagingEnabled);
        Int32 UpdateRoleStatus(int RoleId, bool Status);
        UserRole GetMenuList();
        UserRole AddRole(UserRole objUserRole, DataTable dt);
        int CheckAlreadyExists(UserRole objUserRole);
        Menu GetRoleDetails(int RoleID);
    }
}
