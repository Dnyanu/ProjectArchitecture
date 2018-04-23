using PIVF.Gemino.Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Master.Clinic
{
    public class State : Entity
    {
        [Key]
        public int StateID { get; set; }
        public string StateCode { get; set; }
        public int CountryID { get; set; }
        public string StateName { get; set; }
        public bool? DefaultState { get; set; }
        public int? OrderBy { get; set; }
        public bool? Status { get; set; }
    }
}
