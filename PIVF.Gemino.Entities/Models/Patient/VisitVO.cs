using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Patient
{
    public class VisitVO
    {
        public long VisitID { get; set; }
        public long VisitUnitID { get; set; }
        public DateTime Date { get; set; }
        public string OPDNO { get; set; }
        public string DocName { get; set; }
        public long VisitTypeID { get; set; }
        public long DepartmentID { get; set; }
        public long DoctorID { get; set; }
        public int TotalRows { get; set; }

    }
}
