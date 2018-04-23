using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Configuration
{
    public class UserVO
    {
        public string IDHash { get; set; }
        public string Action { get; set; }
        public int SelID { get; set; }
        public int UserID { get; set; }
        public int UnitID { get; set; }
        public string Clinic { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DOB { get; set; }
        public DateTime? LockedDateTime { get; set; }
        public int RoleID { get; set; }
        public string Role { get; set; }
        public int[,] selectedRoles { get; set; }
        public bool Status { get; set; }
        public bool IsEmployee { get; set; }
        public bool IsDoctor { get; set; }
        public string UserName { get; set; }
        public string LoginName { get; set; }
        public string Password { get; set; }
        public string CurrentPassword { get; set; }
        public int MinPwdLength { get; set; }
        public int MaxPwdLength { get; set; }
        public int MaxPwdAge { get; set; }
        public int MinPwdAge { get; set; }
        public int LockThreshold { get; set; }
        public int LockDuration { get; set; }
        public int NoOfPwdRember { get; set; }
        public bool AtleastOneDigit { get; set; }
        public bool AtleastOneUpperCase { get; set; }
        public bool AtleastOneLowerCase { get; set; }
        public bool AtleastOneSpecialChar { get; set; }
        public bool IsExpirationInterval { get; set; }
        public int ExpirationInterval { get; set; }
        public string UserType { get; set; }
        public List<UserVO> lstUser { get; set; }
        public int UserTypeId { get; set; }
        public bool IsLocked { get; set; }
        public int PageIndex { get; set; }
        public int ErrorStatus { get; set; }
        public int TotalCount { get; set; }
        public Nullable<bool> IsPackageBillInRevenue { get; set; } = false;
    }

    public class BasicUser
    {
        public string UserName { get; set; }
    }
}
