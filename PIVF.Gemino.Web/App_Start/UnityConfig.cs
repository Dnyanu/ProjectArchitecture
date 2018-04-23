using Microsoft.Practices.Unity;
using PIVF.Gemino.BusinessLayer.Common;
using PIVF.Gemino.BusinessLayer.EMR.LandingPage;
using PIVF.Gemino.BusinessLayer.QueueMgt;
using PIVF.Gemino.BusinessLayer.Ticket;
using PIVF.Gemino.BusinessLayer.User;
using PIVF.Gemino.DataAccessLayer.Common;
using PIVF.Gemino.DataAccessLayer.EMR.LandingPage;
using PIVF.Gemino.DataAccessLayer.QueueMgt;
using PIVF.Gemino.DataAccessLayer.Ticket;
using PIVF.Gemino.DataAccessLayer.User;
using PIVF.Gemino.Entities;
using PIVF.Gemino.Entities.Models.Master.Clinic;
using PIVF.Gemino.Entities.Models.Master.IVF;
using PIVF.Gemino.Repository.Pattern.DataContext;
using PIVF.Gemino.Repository.Pattern.Ef6;
using PIVF.Gemino.Repository.Pattern.Repositories;
using PIVF.Gemino.Repository.Pattern.UnitOfWork;
using System;

namespace PIVF.Gemino.Web
{
    /// <summary>
    /// Specifies the Unity configuration for the main container.
    /// </summary>
    public class UnityConfig
    {
        #region Unity Container
        private static Lazy<IUnityContainer> container = new Lazy<IUnityContainer>(() =>
        {
            var container = new UnityContainer();
            RegisterTypes(container);
            return container;
        });

        /// <summary>
        /// Gets the configured Unity container.
        /// </summary>
        public static IUnityContainer GetConfiguredContainer()
        {
            return container.Value;
        }
        #endregion

        /// <summary>Registers the type mappings with the Unity container.</summary>
        /// <param name="container">The unity container to configure.</param>
        /// <remarks>There is no need to register concrete types such as controllers or API controllers (unless you want to 
        /// change the defaults), as Unity allows resolving a concrete type even if it was not previously registered.</remarks>
        public static void RegisterTypes(IUnityContainer container)
        {
            // NOTE: To load from web.config uncomment the line below. Make sure to add a Microsoft.Practices.Unity.Configuration to the using statements.
            // container.LoadConfiguration();
            container.RegisterType<IDataContextAsync, PIVFContext>(new PerRequestLifetimeManager())
                .RegisterType<IUnitOfWorkAsync, UnitOfWork>(new PerRequestLifetimeManager())
                .RegisterType<IRepositoryAsync<Tickets>, Repository<Tickets>>()
                .RegisterType<IRepositoryAsync<CommanEntity>, Repository<CommanEntity>>()
                .RegisterType<UserServiceBAL, UserServiceDAL>()
                .RegisterType<IRepositoryAsync<Doctor>, Repository<Doctor>>()
                .RegisterType<ITicketsService, TicketsService>()
                .RegisterType<UserRoleServiceBAL, UserRoleServiceDAL>()
                .RegisterType<UserServiceBAL, UserServiceDAL>()
                .RegisterType<QueueMgtBAL, QueueMgtDAL>()
                .RegisterType<EMRLandingPageBAL, EMRLandingPageDAL>()
                .RegisterType<CommonServiceBAL, CommonServiceDAL>();
        }
    }
}