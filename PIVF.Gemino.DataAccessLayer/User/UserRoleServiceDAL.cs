using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.Gemino.BusinessLayer.User;
using PIVF.Gemino.Entities.Models.Master.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.DataAccessLayer.User
{
    public class UserRoleServiceDAL : UserRoleServiceBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public UserRoleServiceDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public IQueryable<UserRole> GetRoleList(int PageIndex, string Code, string Description, bool PagingEnabled)
        {
            #region Params
            var Param = new DynamicParameters();
            Param.Add("@PageIndex", PageIndex);
            Param.Add("@Code", Code);
            Param.Add("@Description", Description);
            Param.Add("@Action", "GetRoleList");
            Param.Add("@PagingEnabled", PagingEnabled);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);

            #endregion
            using (this.con)
            {
                return this.con.Query<UserRole>(GenericSP.UserRoleOperations, Param, commandType: CommandType.StoredProcedure).AsQueryable();
            }

        }

        public Int32 UpdateRoleStatus(int RoleId, bool Status)
        {
            #region Params
            var Param = new DynamicParameters();
            Int32 ResultStatus = 0;
            Param.Add("@Action", "UpdateStatus");
            Param.Add("@RoleID", RoleId);
            Param.Add("@Status", Status);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            #endregion
            using (this.con)
            {
                con.Execute(GenericSP.UserRoleOperations, Param, commandType: CommandType.StoredProcedure);
            }

            return ResultStatus = Param.Get<Int32>("@ResultStatus");
        }

        public UserRole GetMenuList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetMenuListForRoleMaster");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);

            UserRole objUserRole = new UserRole();
            objUserRole.lstRoles = new List<UserRole>();

            using (var multi = con.QueryMultiple(GenericSP.GetMenu, Param, null, null, CommandType.StoredProcedure))
            {
                List<Menu> listMenu = multi.Read<Menu>().ToList();
                List<Menu> listSubMenu = multi.Read<Menu>().ToList();
                List<Menu> listModuleMenu = multi.Read<Menu>().ToList();


                #region For Menu
                foreach (Menu item in listMenu)
                {
                    UserRole tmpRoleBO = new UserRole();

                    tmpRoleBO.objMenu = new Menu();
                    tmpRoleBO.objMenu.lstMenu = new List<Menu>();
                    tmpRoleBO.objMenu.lstInnerMenu = new List<Menu>();
                    tmpRoleBO.objMenu.Id = item.Id;
                    tmpRoleBO.objMenu.MenuId = item.MenuId;
                    tmpRoleBO.objMenu.ParentId = item.ParentId;
                    tmpRoleBO.objMenu.Title = item.Title;
                    tmpRoleBO.objMenu.Active = item.Active;
                    #region For Sub Menu
                    foreach (Menu initem in listSubMenu)
                    {
                        if (tmpRoleBO.objMenu.MenuId == initem.ParentId)
                        {
                            Menu obj = new Menu();
                            obj.Id = initem.Id;
                            obj.MenuId = initem.MenuId;
                            obj.ParentId = initem.ParentId;
                            obj.Title = initem.Title;
                            obj.Active = initem.Active;
                            #region For Module List
                            foreach (Menu dinitem in listModuleMenu)
                            {
                                Menu objInner = new Menu();
                                if (obj.MenuId == dinitem.ParentId)
                                {
                                    objInner.Id = dinitem.Id;
                                    objInner.MenuId = dinitem.MenuId;
                                    objInner.ParentId = dinitem.ParentId;
                                    objInner.Title = dinitem.Title;
                                    objInner.Active = dinitem.Active;
                                    tmpRoleBO.objMenu.lstInnerMenu.Add(objInner);
                                }
                            }
                            #endregion
                            tmpRoleBO.objMenu.lstMenu.Add(obj);
                        }
                    }
                    #endregion

                    objUserRole.lstRoles.Add(tmpRoleBO);
                }
                #endregion

                return objUserRole;
            }
        }

        public UserRole AddRole(UserRole objUserRole, DataTable dt)
        {

            var Param = new DynamicParameters();
            if (objUserRole.RoleId > 0)
            {
                if (objUserRole.TotalItems == 0)
                {
                    Param.Add("@Mode", "EDIT");
                }
                else
                {
                    Param.Add("@Mode", "OTHER");
                }
            }
            else
            {
                Param.Add("@Mode", "ADD");
            }
            Param.Add("@RoleID", objUserRole.RoleId);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@Code", objUserRole.Code);
            Param.Add("@Title", objUserRole.Description);
            Param.Add("@IsInsertToRoleMaster", objUserRole.IsInsertToRoleMaster);
            Param.Add("@RoleMenuDetails", dt.AsTableValuedParameter());
            Param.Add("@Status", objUserRole.Status);
            Param.Add("@ReasonForAD", objUserRole.ReasonForAD);
            Param.Add("@SuccessStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            Param.Add("@RoleIDOut", dbType: DbType.Int32, direction: ParameterDirection.Output);

            using (this.con)
            {
                con.Execute(GenericSP.AddRole, Param, commandType: CommandType.StoredProcedure);
            }
            objUserRole.RoleId = Param.Get<Int32>("@RoleIDOut");
            objUserRole.SuccessStatus = Param.Get<Int32>("@SuccessStatus");
            return objUserRole;
        }

        public int CheckAlreadyExists(UserRole objUserRole)
        {
            Int32 ResultStatus = 0;
            var Param = new DynamicParameters();
            Param.Add("@Code", objUserRole.Code == null ? "" : objUserRole.Code);
            Param.Add("@Title", objUserRole.Description == null ? "" : objUserRole.Description);
            Param.Add("@Roleid", objUserRole.RoleId);
            Param.Add("@SuccessStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            using (con)
            {
                con.Execute(GenericSP.UserRoleAlreadyExists, Param, commandType: CommandType.StoredProcedure);
            }
            return ResultStatus = Param.Get<Int32>("@SuccessStatus");
        }

        public Menu GetRoleDetails(int RoleID)
        {
            var Param = new DynamicParameters();
            Menu objMenu = new Menu();
            objMenu.lstMenu = new List<Menu>();
            Param.Add("@Action", "GetRoleMenuDetails");
            Param.Add("@RoleID", RoleID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);

            using (this.con)
            {
                objMenu.lstMenu = this.con.Query<Menu>(GenericSP.UserRoleOperations, Param, commandType: CommandType.StoredProcedure).AsList();
            }
            return objMenu;
        }


    }
}
