using PIVF.Gemino.Repository.Pattern.Infrastructure;
using PIVF.Gemino.Repository.Pattern.Repositories;
using System;
using System.Data;

namespace PIVF.Gemino.Repository.Pattern.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        int SaveChanges();
        void Dispose(bool disposing);
        IRepository<TEntity> Repository<TEntity>() where TEntity : class, IObjectState;
        void BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.Unspecified);
        bool Commit();
        void Rollback();
    }
}
