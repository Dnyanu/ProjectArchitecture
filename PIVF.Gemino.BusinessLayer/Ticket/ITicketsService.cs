using PIVF.Gemino.Entities;
using PIVF.Gemino.Service.Pattern;

namespace PIVF.Gemino.BusinessLayer.Ticket
{
    public interface ITicketsService : IService<Tickets>
    {
        int GetActiveTickets(string userName, string connectionId);
        int CheckForDuplicateTickets(string connectionId, string userName);
        int GetCurrentPatientID(string userName);
    }
}
