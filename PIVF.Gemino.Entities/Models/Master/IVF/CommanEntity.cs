using PIVF.Gemino.Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.Entities.Models.Master.IVF
{
    public partial class CommanEntity : Entity //Added By Vikrant J Dated 10/24/16
    {
        [Key]
        public int ID { get; set; }
        public int UnitID { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public bool? Active { get; set; }

    }
    //Cycle Wise Page Show Functionality
    public class PageConfig
    {
        public long Id { get; set; }
        public string ArtType { get; set; }
        public string SubArtType { get; set; }
    }
}
