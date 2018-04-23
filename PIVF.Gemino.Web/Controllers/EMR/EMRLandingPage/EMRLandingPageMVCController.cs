using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Gemino.Web.Controllers.EMR.EMRLandingPage
{
    public class EMRLandingPageMVCController : Controller
    {
        // GET: EMRLandingPageMVC
        public ActionResult EMRLandingPage()
        {
            return PartialView();
        }
        public ActionResult EMRTemplateLandingPage()
        {
            return PartialView();
        }
    }
}