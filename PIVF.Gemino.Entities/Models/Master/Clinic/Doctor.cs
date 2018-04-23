using PIVF.Gemino.Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Master.Clinic
{
    public class Doctor : Entity
    {
        [Key]
        #region M_DoctorMater Fields
        public int DOCID { get; set; }
        public int ID { get; set; }
        public Nullable<Int32> DocID { get; set; }
        public int SID { get; set; }
        public int SuID { get; set; }
        public int DocCatID { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public int GenderId { get; set; }
        public string GenderCode { get; set; }
        public string GenderDesc { get; set; }
        public string SpecializationDesc { get; set; }
        public string SubSpecializationDesc { get; set; }
        public string DocTypeDescription { get; set; }
        public string DocCatDesc { get; set; }
        public string Classification { get; set; }
        public string Education { get; set; }
        public string Experience { get; set; }
        public string RegestrationNumber { get; set; }
        public byte[] Signature { get; set; }
        public string SignatureString { get; set; }
        public int DocTypeID { get; set; }
        public int DeptID { get; set; }
        public string SearchDoctorName { get; set; }
        public string DoctorName { get; set; }
        public int BDMID { get; set; }

        private bool _Status = true;
        public bool Status
        {
            get
            {
                return _Status;
            }
            set
            {
                _Status = value;
            }
        }

        private bool _IsReferral = false;
        public bool IsReferral
        {
            get
            {
                return _IsReferral;
            }
            set
            {
                _IsReferral = value;
            }
        }
        #endregion

        #region M_StaffDoctorMappedMaster Fields
        public string EmailId { get; set; }
        public DateTime? DOB { get; set; }
        public int? MaritalStatusId { get; set; }
        public byte[] Photo { get; set; }
        public string PhotoString { get; set; }
        public int AgeYear { get; set; }
        public int AgeMonth { get; set; }
        public int AgeDays { get; set; }
        public int MobCountryId { get; set; }
        public string Mobno { get; set; }
        public int AltMobCountryId { get; set; }
        public string AltMobno { get; set; }

        public int DayID { get; set; }
        public string Day { get; set; }

        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public int CountryID { get; set; }
        public int StateID { get; set; }
        public int CityID { get; set; }
        public string Street { get; set; }
        public string LandMark { get; set; }
        public String PinCode { get; set; }
        public string Area { get; set; }
        public string StdCode { get; set; }
        public string LandLineNo { get; set; }


        public string AltAddress1 { get; set; }
        public string AltAddress2 { get; set; }
        public int AltCountryID { get; set; }
        public int AltStateID { get; set; }
        public int AltCityID { get; set; }
        public string AltStreet { get; set; }
        public string AltLandMark { get; set; }
        public String AltPinCode { get; set; }
        public string AltArea { get; set; }
        public string AltStdCode { get; set; }
        public string AltLandLineNo { get; set; }


        #region Common Properties
        public int? CreatedUnitID { get; set; }
        public int? UpdatedUnitID { get; set; }
        public int? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }

        private bool _Synchronized = false;
        public bool Synchronized
        {
            get
            {
                return _Synchronized;
            }
            set
            {
                _Synchronized = value;
            }
        }

        #endregion 
        #endregion
        public string SelectedDeparments { get; set; }
        public string SelectedClassifications { get; set; }
        public List<int> lstDept { get; set; }
        public List<int> lstClassification { get; set; }
        public List<int> lstUnit { get; set; }
        public string CountryName { get; set; }
        public string AltCountryName { get; set; }
        public long RowsCount { get; set; }
        public int UnitID { get; set; }
        public string FullName { get; set; }
        public int CFID { get; set; }//Added for search criteria 
        public string ReasonForAD { get; set; }

    }
}
