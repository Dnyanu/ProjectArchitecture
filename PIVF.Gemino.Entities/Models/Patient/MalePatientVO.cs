using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Patient
{
    public class MalePatientVO
    {
        public int GenderID { get; set; }
        public long MaleId { get; set; }
        public long MAleUnitID { get; set; }
        public string MaleMRNO { get; set; }
        public DateTime MaleRegDate { get; set; }
        public string MaleFirstName { get; set; }
        public string MaleMiddleName { get; set; }
        public string MaleLastName { get; set; }
        public DateTime MaleDOB { get; set; }
        //public long MalePhoto { get; set; }
        // public long MaleImgPath { get; set; }
        public string MaleAlerts { get; set; }
        public string MalePatientName { get; set; }
        public float MaleHeight { get; set; }
        public float MaleWeight { get; set; }
        public float MaleBMI { get; set; }
        public long MaleAgeInYr { get; set; }
        public string MAddress { get; set; }
        public byte[] MalePhoto { get; set; }
        public string MalePhotoStr { get; set; }
        public long VisitID { get; set; }
        public long VisitUnitID { get; set; }
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
        public int PatientCategoryID { get; set; }
        public bool IsDonor { get; set; }
        public bool IsDonorUsed { get; set; }
    }
}
