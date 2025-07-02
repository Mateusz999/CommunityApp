using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Queries
{
    public class GetActivityList
    {// mediator powinien mieć utworzoną klase Query ktra implementuje interfejs IRequers 
        public class Query : IRequest<List<Activity>> {  }

        public class Handler(AppDbContext context) : IRequestHandler<Query, List<Activity>>
        {
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken) // musimy implementować interfejs!
            {
                return await context.Activities.ToListAsync();

            }
        }
    }
}
