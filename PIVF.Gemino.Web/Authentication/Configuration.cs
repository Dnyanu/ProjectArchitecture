using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace PIVF.Gemino.Web.Authentication
{
    internal sealed class Configuration : DbMigrationsConfiguration<PIVFContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(PIVFContext context)
        {
            if (context.Clients.Count() > 0)
            {
                return;
            }

            context.Clients.AddRange(BuildClientsList());
            context.SaveChanges();
        }

        private static List<Client> BuildClientsList()
        {

            List<Client> ClientsList = new List<Client>
            {
                new Client
                { Id = "ngAuthApp",
                    Secret= Helper.GetHash("abc@123"),
                    Name="AngularJS front-end Application",
                    ApplicationType =  ApplicationTypes.JavaScript,
                    Active = true,
                    RefreshTokenLifeTime = 7200,
                    AllowedOrigin="http://localhost:55960/"
                    //AllowedOrigin = "http://ngauthenticationweb.azurewebsites.net"
                },
                new Client
                { Id = "PIVF",
                    Secret= Helper.GetHash("abc@123"),
                    Name="AngularJS front-end Application",
                    ApplicationType =  ApplicationTypes.JavaScript,
                    Active = true,
                    RefreshTokenLifeTime = 7200,
                    AllowedOrigin="http://192.168.1.59:55960/"

                },
                new Client
                { Id = "consoleApp",
                    Secret=Helper.GetHash("123@abc"),
                    Name="Console Application",
                    ApplicationType =ApplicationTypes.NativeConfidential,
                    Active = true,
                    RefreshTokenLifeTime = 14400,
                    AllowedOrigin = "*"
                }
            };

            return ClientsList;
        }
    }
}