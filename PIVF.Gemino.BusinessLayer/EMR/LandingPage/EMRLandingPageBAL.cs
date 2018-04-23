using PIVF.Gemino.Entities.Models.EMR.LandingPage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.BusinessLayer.EMR.LandingPage
{
    public interface EMRLandingPageBAL
    {
        EMRLandingPageVO GetEMRLandingPageData(int PID, int UID);
    }
}
