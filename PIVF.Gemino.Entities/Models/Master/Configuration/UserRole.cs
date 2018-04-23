using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Master.Configuration
{
    public class UserRole
    {
        public int RoleId { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }

        private bool _Status = true;
        public bool Status
        {
            get { return _Status; }
            set { _Status = value; }
        }
        public int AddedBy { get; set; }
        public DateTime AddedDateTime { get; set; }
        public int UserID { get; set; }
        public string SelectedMenus { get; set; }
        public int TotalCount { get; set; }
        public long TotalItems { get; set; }
        public Menu objMenu { get; set; }
        public List<UserRole> lstRoles { get; set; }

        public List<Menu> lstMenuForSave { get; set; }

        public bool IsInsertToRoleMaster { get; set; }

        public int SuccessStatus { get; set; }
        public string ReasonForAD { get; set; }
    }
}
