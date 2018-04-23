using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Resources;
using System.Web.Http;

namespace PIVF.Gemino.Web.Api
{
    public class CommonAPIController : ApiController
    {
        [HttpGet]
        public Dictionary<string, string> FillResources()
        {
            //1.   
            ResourceSet resources = PIVF.Gemino.LanguageResource.Resources.ResourceManager.GetResourceSet(CultureInfo.CurrentUICulture, true, true);
            Dictionary<string, string> resDictionary = new Dictionary<string, string>();
            //2.
            foreach (DictionaryEntry resource in resources)
            {
                resDictionary.Add(resource.Key.ToString(), resource.Value.ToString());
            }
            //3.

            return resDictionary;
        }
    }
}
