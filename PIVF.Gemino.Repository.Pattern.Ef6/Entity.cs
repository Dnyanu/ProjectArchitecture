using PIVF.Gemino.Repository.Pattern.Infrastructure;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIVF.Gemino.Repository.Pattern.Ef6
{
    public abstract class Entity : IObjectState
    {
        [NotMapped]
        public ObjectState ObjectState { get; set; }
    }
}
