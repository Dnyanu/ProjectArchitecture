using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.QueueMgt
{
    public class QueueVO
    {
        public int ID { get; set; }
        public int RegID { get; set; }
        public int RegUnitID { get; set; }
        public long PatientID { get; set; }
        public long CoupleID { get; set; }
        public long PatientRegistrationID { get; set; }
        public long VisitDepartmentID { get; set; }
        public long DoctorID { get; set; }
        public long PatientCategoryID { get; set; }
        public long GenderId { get; set; }
        public long UnitId { get; set; }
        public long TariffID { get; set; }
        public long CompanyID { get; set; }
        public long VisitID { get; set; }
        public long VisitTypeID { get; set; }
        public long PatientUnitID { get; set; }
        public long ServiceID { get; set; }
        public int CurrentVisitStatus { get; set; }
        public long TotalCount { get; set; }
        public long SpecialRegID { get; set; }
        public string PatientName { get; set; }
        public string MobileCountryCode { get; set; }
        public string ContactNo1 { get; set; }
        public string ContactNo2 { get; set; }
        public DateTime Date { get; set; }
        public string OPDNO { get; set; }
        public DateTime InTime { get; set; }
        public DateTime DateTime { get; set; }
        public bool Status { get; set; }
        public bool IsHealthPackage { get; set; }
        public bool IsVisitClosed { get; set; }
        public string Description { get; set; }
        public string DoctorName { get; set; }
        public string MRNo { get; set; }
        public string Complaints { get; set; }
        public string ReferredDoctor { get; set; }
        public string Cabin { get; set; }
        public string VisitType { get; set; }
        public string VisitStatus { get; set; }
        public string UnitName { get; set; }
        public string Service { get; set; }
        public string TokenNo { get; set; }
        public byte[] Photo { get; set; }
        public string PhotoString { get; set; }
        public string SpecialReg { get; set; }
        private string strFirstName;
        public string FirstName
        {
            get { return strFirstName; }
            set
            {
                if (value != strFirstName)
                {
                    strFirstName = value;
                }

            }
        }
        public string Prefix { get; set; }
        private string strMiddleName;
        public string MiddleName
        {
            get { return strMiddleName; }
            set
            {
                if (value != strMiddleName)
                {
                    strMiddleName = value;
                }
            }
        }
        public string GenderDescription { get; set; }
        private string strLastName;
        public int age { get; set; }
        public string LastName
        {
            get { return strLastName; }
            set
            {
                if (value != strLastName)
                {
                    strLastName = value;
                }
            }
        }
        public string Gender { get; set; }
        public string PatientAddress { get; set; }
        public string MobNo { get; set; }
        public string PartnerName { get; set; }
        public string Remarks { get; set; }
        public string Department { get; set; }
        public string RefDoc { get; set; }
        public string VisMarkedBy { get; set; }
        public bool IsSpecialReg { get; set; }
    }
}
