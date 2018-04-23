using PIVF.Gemino.Entities.Models.Master.Clinic;
using PIVF.Gemino.Entities.Models.QueueMgt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.BusinessLayer.QueueMgt
{
    public interface QueueMgtBAL
    {
        List<QueueVO> GetQueueList(string[] Que);
        int CloseVisit(int VID, int UnitId);
        List<Doctor> GetDocList();
        List<Doctor> GetDocListByDeptID(int DeptID);

    }
}
