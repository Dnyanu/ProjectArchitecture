using DataBaseConfiguration;
using NLog;
using PIVF.Gemino.BusinessLayer.QueueMgt;
using PIVF.Gemino.Entities.Models.Master.Clinic;
using PIVF.Gemino.Entities.Models.QueueMgt;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Gemino.Web.Api.QueueMgt
{
    [Authorize]
    public class QueueMgtController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        QueueMgtBAL srv;
        public QueueMgtController(QueueMgtBAL _srv)
        {
            srv = _srv;
        }
        [ResponseType(typeof(QueueVO))]
        [HttpPost]
        public IHttpActionResult GetQueueList(string[] Que)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetQueueList(Que);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("QueueMgt/GetQueueList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("QueueMgt/GetQueueList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(int))]
        [HttpGet]
        public IHttpActionResult CloseVisit(int vid, int UnitId)
        {
            try
            {
                logger.Info("Controller Name:QueueAPI,Action:HttpGet,Method:CloseVisit,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.CloseVisit(vid, UnitId);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("QueueAPI/CloseVisit Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("QueueAPI/CloseVisit Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }


        [ResponseType(typeof(Doctor))]
        [HttpGet]
        public IHttpActionResult GetDocList()
        {
            try
            {
                logger.Info("Controller Name:QueueAPI,Action:HttpGet,Method:GetDocList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetDocList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("QueueAPI/GetDocList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("QueueAPI/GetDocList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(Doctor))]
        [HttpGet]
        public IHttpActionResult GetDocListByDeptID(int DeptID)
        {
            try
            {
                logger.Info("Controller Name:QueueAPI,Action:HttpGet,Method:GetDocList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetDocListByDeptID(DeptID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("QueueAPI/GetDocList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("QueueAPI/GetDocList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }
    }
}
