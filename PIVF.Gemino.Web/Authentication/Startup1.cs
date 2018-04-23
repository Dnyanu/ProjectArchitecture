using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using PIVF.Gemino.Web.App_Start;
using System.Web.Http;

//[assembly: OwinStartupAttribute(typeof(PIVF.Gemino.Web.Startup1))]
namespace PIVF.Gemino.Web.Authentication
{
    public partial class Startup1
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            ConfigureOAuth(app);
            WebApiConfig.Register(config);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);
        }

        private void ConfigureOAuth(IAppBuilder app)
        {
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions();
            //Token Consumption
            app.UseOAuthBearerAuthentication(OAuthBearerOptions);
        }
    }
}
