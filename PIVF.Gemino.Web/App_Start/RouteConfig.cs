using System.Web.Mvc;
using System.Web.Routing;

namespace PIVF.Gemino.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            // Ignore the alternate path to the home page
            routes.IgnoreRoute("Home/Index");

            routes.MapRoute(
                name: "Home",
                url: "Gemino",
                defaults: new { controller = "Home", action = "Index" }
            );
            routes.MapRoute(
                name: "ForgotPassword",
                url: "ForgotPassword",
                defaults: new { controller = "Home", action = "ForgotPassword" }
            );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Authentication", action = "Login", id = UrlParameter.Optional }
            );
        }
    }
}
