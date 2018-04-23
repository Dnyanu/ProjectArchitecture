using PIVF.Gemino.Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Master.Clinic
{
    public class City : Entity
    {
        [Key]
        public int CityID { get; set; }
        public string CityCode { get; set; }
        public int StateID { get; set; }
        public string CityName { get; set; }
        public bool? DefaultCity { get; set; }
        public int? OrderBy { get; set; }
        public bool? Status { get; set; }
    }
}
