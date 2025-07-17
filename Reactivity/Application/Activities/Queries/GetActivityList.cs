using Application.Activities.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
        public class Query : IRequest<List<ActivityDTO>> {  }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, List<ActivityDTO>>
        {
            public async Task<List<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken) // musimy implementować interfejs!
            {
                return await context.Activities
                    .ProjectTo<ActivityDTO>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() })
                    .ToListAsync();

            }
        }
    }
}
