using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Patient
{
    public class clsCoupleVO
    {
        public string CoupleRegNo { get; set; }
        public long CoupleUnitID { get; set; }
        public DateTime CoupleRegDate { get; set; }
        public long ID { get; set; }
        public long UnitID { get; set; }
        public FemalePatientVO FemalePatient { get; set; }
        public MalePatientVO MalePatient { get; set; }
        public List<VisitVO> VisitInfo { get; set; }
    }
}
