using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using System;
using System.Diagnostics;

namespace PIVF.Gemino.Web.Api
{
    public class AuthorizeEchoConnection : PersistentConnection
    {
        protected override bool AuthorizeRequest(IRequest request)
        {
            return true;
        }

        protected override Task OnReceived(IRequest request, string connectionId, string data)
        {
            return Connection.Send(connectionId, data);
        }

        protected override Task OnConnected(IRequest request, string connectionId)
        {
            Debug.WriteLine(connectionId + " connected");

            if (request.Cookies.Count != 0)
            {
                string sesId = request.Cookies["SessionContent"].Value; // load it from request
                string userName = request.Cookies["MyCookie"].Value;
                string loggedInTime = request.Cookies["LoggedInTimeCookie"].Value;

                Microsoft.AspNet.SignalR.Cookie connect = new Microsoft.AspNet.SignalR.Cookie("ConnectValue", connectionId);
                request.Cookies.Add("ConnectKey", connect);

                return Connection.Send(connectionId, userName);
            }
            else
            {
                return Connection.Send(connectionId, "");
            }
        }

        public void storeCookie(string connectionId)
        {
            HttpCookie Hconnect = new HttpCookie("HSConnect");
            Hconnect.Values["HHC"] = connectionId;
            Hconnect.Expires = DateTime.Now.AddDays(1);
            HttpContext.Current.Response.Cookies.Add(Hconnect);
        }

        protected override Task OnDisconnected(IRequest request, string connectionId, bool stopCalled)
        {
            Debug.WriteLine(connectionId + " disconnected");
            //  request.Cookies.Clear();
            return base.OnDisconnected(request, connectionId, stopCalled);
        }

        protected override Task OnReconnected(IRequest request, string connectionId)
        {
            Debug.WriteLine(connectionId + " reconnected");
            return base.OnReconnected(request, connectionId);
        }

        public void Init(HttpApplication context)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}