using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Master.Configuration
{
    public class Unit
    {
        [Key]
        public int UnitID { get; set; }
        public string Code { get; set; }
        public string UnitName { get; set; }
    }

    public class UnitRoleID
    {
        public int UnitID { get; set; }
        public int RoleID { get; set; }
    }
}
