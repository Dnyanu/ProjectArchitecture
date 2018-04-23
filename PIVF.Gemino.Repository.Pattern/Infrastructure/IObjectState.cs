using System.ComponentModel.DataAnnotations.Schema;

namespace PIVF.Gemino.Repository.Pattern.Infrastructure
{
    public interface IObjectState
    {
        [NotMapped]
        ObjectState ObjectState { get; set; }
    }
}
