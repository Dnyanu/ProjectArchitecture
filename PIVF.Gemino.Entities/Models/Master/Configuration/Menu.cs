using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Master.Configuration
{
    public class Menu
    {
        public long Id { get; set; }
        public int MenuId { get; set; }
        public int MenuFor { get; set; }
        public string Title { get; set; }
        public string Path { get; set; }
        public int ParentId { get; set; }
        public int SubMenuID { get; set; }
        public int ModuleId { get; set; }
        public bool Active { get; set; }
        public bool IsSelected { get; set; }
        public bool IsCreate { get; set; }
        public bool IsUpdate { get; set; }
        public bool IsAll { get; set; }
        public bool IsRead { get; set; }
        public bool IsPrint { get; set; }
        public string ImagePath { get; set; }
        public List<Menu> lstParent { get; set; }
        public List<Menu> lstMenu { get; set; }
        public List<Menu> lstInnerMenu { get; set; }

    }
}
