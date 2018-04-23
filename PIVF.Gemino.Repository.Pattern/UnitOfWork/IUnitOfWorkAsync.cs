using PIVF.Gemino.Repository.Pattern.Infrastructure;
using PIVF.Gemino.Repository.Pattern.Repositories;
using System.Threading;
using System.Threading.Tasks;

namespace PIVF.Gemino.Repository.Pattern.UnitOfWork
{
    public interface IUnitOfWorkAsync : IUnitOfWork
    {
        Task<int> SaveChangesAsync();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        IRepositoryAsync<TEntity> RepositoryAsync<TEntity>() where TEntity : class, IObjectState;
    }
}
