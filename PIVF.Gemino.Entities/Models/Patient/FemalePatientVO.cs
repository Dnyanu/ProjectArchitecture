using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Patient
{
    public class FemalePatientVO
    {
        public int GenderID { get; set; }
        public long FemalePatientID { get; set; }
        public long FemalePatientUnitID { get; set; }
        public string FemalePatientMRNO { get; set; }
        public DateTime FemalePatientRegDate { get; set; }
        public string FemaleFirstName { get; set; }
        public string FemaleMiddleName { get; set; }
        public string FemaleAlerts { get; set; }
        public float FemaleWeight { get; set; }
        public float FemaleHeight { get; set; }
        public float FemaleBMI { get; set; }
        public string FemalePatientName { get; set; }
        public long FemaleAgeInYr { get; set; }
        public string FAddress { get; set; }
        public byte[] FemalePhoto { get; set; }
        public string FemalePhotoStr { get; set; }
        public string FemaleLastName { get; set; }
        public DateTime FemaleDOB { get; set; }
        public long VisitID { get; set; }
        public long VisitUnitID { get; set; }
        public long TherapyID { get; set; }
        public long TherapyUnitID { get; set; }
        public string CycleCode { get; set; }
        public string ARTType { get; set; }
        public string ARTSubType { get; set; }
        public string Allergies { get; set; }
        public string AllergiesFood { get; set; }
        public string AllergiesOthers { get; set; }
        public string Addictions { get; set; }
        public bool IsAlcohol { get; set; }
        public bool IsTobacco { get; set; }
        public bool IsSmoking { get; set; }
        public bool IsAddictionsOther { get; set; }
        public Boolean VisitStatus { get; set; }
        public VisitVO Selectedvisit { get; set; }
        public int ArtTypeID { get; set; }
        public int ArtSubTypeID { get; set; }
        public long DonorID { get; set; }
        public long DonorUnitID { get; set; }
        public int PatientCategoryID { get; set; }
        public bool IsDonor { get; set; }
        public string DonarCode { get; set; }
        public string DonarName { get; set; }
        public string DonorCycleCode { get; set; }
        public long DonarID { get; set; }
        public long DonarUnitID { get; set; }
        public string CoupleCode { get; set; }
        public long CoupleFemailID { get; set; }
        public long CoupleFemailUnitID { get; set; }
        public bool IsDonorUsed { get; set; }
        public string MobileNo { get; set; }
    }
}
