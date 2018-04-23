using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Patient
{
    public class DonorDetailsVO
    {
        public float FemaleHeight { get; set; }
        public float FemaleWeight { get; set; }
        public float FemaleBMI { get; set; }
        public string FemaleAlerts { get; set; }
        public float MaleHeight { get; set; }
        public float MaleWeight { get; set; }
        public float MaleBMI { get; set; }
        public string MaleAlerts { get; set; }
        public DateTime DOB { get; set; }
        public int Age { get; set; }
        public int GenderID { get; set; }
        public byte[] Photo { get; set; }
        public string PhotoString { get; set; }
        public string PatientName { get; set; }
        public long ID { get; set; }
        public long UnitID { get; set; }
        public long PatientCategoryID { get; set; }
        public string MRNo { get; set; }
        public string CoupleCode { get; set; }
        public long CoupleFemailID { get; set; }
        public long CoupleFemailUnitID { get; set; }
        public bool IsDonorUsed { get; set; }
        public string MobileNo { get; set; }
        public string Address { get; set; }
    }
}
