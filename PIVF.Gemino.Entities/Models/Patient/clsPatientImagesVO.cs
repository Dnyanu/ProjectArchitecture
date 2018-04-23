using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Patient
{
    public class clsPatientImagesVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public DateTime Date { get; set; }
        public String Name { get; set; }
        public byte[] Photo { get; set; }
        public string PhotoStr { get; set; }
    }
}
