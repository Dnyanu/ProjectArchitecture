using PIVF.Gemino.Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Master.Clinic
{
    public class Country : Entity
    {
        [Key]
        public int CountryID { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public bool DefaultCountry { get; set; }
        public int OrderBy { get; set; }
        public bool Status { get; set; }
    }
}
