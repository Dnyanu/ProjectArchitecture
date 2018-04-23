using PIVF.Gemino.Repository.Pattern.Ef6;
using System.Data.Entity;

namespace PIVF.Gemino.Entities
{
    public partial class PIVFContext : DataContext
    {
        static PIVFContext()
        {
            Database.SetInitializer<PIVFContext>(null);
        }
        public PIVFContext()
            : base("Name=PIVFContext")
        {
        }
        public DbSet<Tickets> Ticket { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
