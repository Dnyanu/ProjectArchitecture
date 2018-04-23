using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Dashboard
{
    public class FemalePatientDashBoardVO
    {
        public DateTime? LMPDate { get; set; }
        public string Diagnosis { get; set; }
        public string CurrentArtType { get; set; }
        public string Protocol { get; set; }
        public string InHouse { get; set; }
        public string TrayingToConvinceYears { get; set; }
        public string TrayingToConvinceMonths { get; set; }
        public string CycleDuration { get; set; }
        public string MenstrualDays { get; set; }

        public string MenstrualRegularity { get; set; }
        public string FemaleInfertility { get; set; }
        public string MaleInfertility { get; set; }
        public string InfertilityType { get; set; }
        public string OutSide { get; set; }
        public string DonorCode { get; set; }
        public string Indication { get; set; }
        public string Name { get; set; }
        public string MRNo { get; set; }
    }
}
