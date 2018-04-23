using PIVF.Gemino.Repository.Pattern.Ef6;
using System.ComponentModel.DataAnnotations;

namespace PIVF.Gemino.Entities
{
    public class Tickets : Entity
    {
        [Key]
        public int sessionId { get; set; }
        public string userName { get; set; }
        public string ConnectionId { get; set; }
        public string LastUpdate { get; set; }
    }
}
