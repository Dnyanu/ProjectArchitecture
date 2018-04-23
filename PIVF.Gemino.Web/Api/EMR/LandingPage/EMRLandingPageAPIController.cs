using DataBaseConfiguration;
using NLog;
using PIVF.Gemino.BusinessLayer.EMR.LandingPage;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Gemino.Web.Api.EMR.LandingPage
{
    [Authorize]
    public class EMRLandingPageAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        EMRLandingPageBAL srv;
        public EMRLandingPageAPIController(EMRLandingPageBAL _srv)
        {
            srv = _srv;
        }

        [ResponseType(typeof(int))]
        [HttpGet]
        public IHttpActionResult GetEMRLandingPageData(int PID, int UID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetEMRLandingPageData(PID, UID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }
    }
}
