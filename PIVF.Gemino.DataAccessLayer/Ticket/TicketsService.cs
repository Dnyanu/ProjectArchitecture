using Dapper;
using DataBaseConfiguration;
using PIVF.Gemino.BusinessLayer.Ticket;
using PIVF.Gemino.Entities;
using PIVF.Gemino.Repository.Pattern.Repositories;
using PIVF.Gemino.Service.Pattern;
using System;
using System.Data;
using System.Linq;

namespace PIVF.Gemino.DataAccessLayer.Ticket
{
    public class TicketsService : Service<Tickets>, ITicketsService
    {
        private readonly IRepositoryAsync<Tickets> _repository;
        DapperConnection Con = new DapperConnection();
        public TicketsService(IRepositoryAsync<Tickets> repository) : base(repository)
        {
            _repository = repository;
        }
        public int GetActiveTickets(string userName, string connectionId)
        {
            var param = new DynamicParameters();
            try
            {
                param.Add("@connectionId", connectionId);
                using (Con.DapCon)
                {
                    return this.Con.DapCon.Query<int>(GenericSP.GetActiveTickets, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int CheckForDuplicateTickets(string connectionId, string userName)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@connectionId", connectionId);
                Param.Add("@userName", userName);
                using (Con.DapCon)
                {
                    return this.Con.DapCon.Query<int>(GenericSP.CheckForDuplicatetickets, Param, commandType: CommandType.StoredProcedure).SingleOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int GetCurrentPatientID(string userName)
        {
            //int PatientId = 0;
            var Param = new DynamicParameters();
            Param.Add("@userName", userName, DbType.String);
            return this.Con.DapCon.Query<int>(GenericSP.GetCurrentPatientID, Param, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }
    }
}
