using PIVF.Gemino.Entities;
using PIVF.Gemino.Entities.Models.Master.Clinic;
using PIVF.Gemino.Entities.Models.Master.Configuration;
using PIVF.Gemino.Entities.Models.Master.IVF;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;

namespace PIVF.Gemino.Web.App_Start
{
    public static class ODataConfig
    {
        public static void Register(HttpConfiguration config)
        {
            ODataModelBuilder builder = new ODataConventionModelBuilder();
            config.Count().Filter().OrderBy().Expand().Select().MaxTop(null);

            builder.EntitySet<Tickets>("Tickets");
            var userNamefunction = builder.Function("GetActiveTickets");
            userNamefunction.Parameter<string>("UserName");
            userNamefunction.Parameter<string>("generatedToken");
            userNamefunction.Parameter<bool>("checkStatus");
            userNamefunction.Parameter<int>("flag");
            userNamefunction.ReturnsCollectionFromEntitySet<Tickets>("Tickets");
            builder.EntitySet<Tickets>(typeof(Tickets).Name);


            var CurrentPatientIDBuilder = builder.EntitySet<Tickets>("Tickets");
            var CurrentPatientIDfunction = builder.Function("GetCurrentUserPatientID");
            CurrentPatientIDfunction.ReturnsCollection<int>();
            builder.EntitySet<Tickets>(typeof(Tickets).Name);

            var DoctorBuilder = builder.EntitySet<Tickets>("Tickets");
            var DoctorFunc = builder.Action("UpdateTicket");
            DoctorFunc.ReturnsCollection<int>();

            builder.EntitySet<Doctor>("Doctors");
            builder.EntitySet<Unit>("Unit");
            builder.EntitySet<CommanEntity>("CommanEntity");


            var model = builder.GetEdmModel();
            config.MapODataServiceRoute(
                    routeName: "odata",
                    routePrefix: "odata",
                    model: model
                );


            config.EnsureInitialized();
            config.AddODataQueryFilter();
        }
    }
}