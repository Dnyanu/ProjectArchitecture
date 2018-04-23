using System.Web.Optimization;

namespace PIVF.Gemino.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/angularScripts")
            .Include("~/Scripts/AngularPackages/jquery-2.1.0.min.js",
            "~/Scripts/AngularPackages/bootstrap.min.js",
            "~/Scripts/AngularPackages/angular.min.js",
            "~/Scripts/AngularPackages/angular-route.min.js",
            "~/Scripts/AngularPackages/ui-bootstrap-tpls.js",
            "~/Scripts/AngularUI/ui-bootstrap.js",
            "~/Scripts/AngularUI/ui-bootstrap-tpls.js",
            "~/Scripts/AngularPackages/angular-local-storage.min.js",
            "~/Scripts/AngularPackages/angular-filter.min.js",
            "~/Scripts/AngularPackages/ocLazyLoad.min.js",
            "~/Scripts/AngularPackages/angular-toasty.min.js",
            "~/Scripts/AngularPackages/SweetAlert.min.js",
            "~/Scripts/AngularPackages/spin.js",
            "~/Scripts/AngularPackages/angular-spinner.js",
            "~/Scripts/AngularPackages/ui-grid.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/Dev.css",
                      "~/Content/sweetalert.css",
                      "~/Content/site.css"));
        }
    }
}
