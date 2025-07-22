using Application.Activities.DTOs;
using Application.Core;
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


        public class Query : IRequest<Result<PagedList<ActivityDTO, DateTime?>>> 
        {
            public required ActivityParams Params { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<PagedList<ActivityDTO, DateTime?>>>
        {
            public async Task<Result<PagedList<ActivityDTO, DateTime?>>> Handle(Query request, CancellationToken cancellationToken) // musimy implementować interfejs!
            {

                var query = context.Activities
                    .OrderBy(x => x.Date)
                    .Where( x=> x.Date >= (request.Params.Cusor ?? request.Params.StartDate) )
                    .AsQueryable();


                if (!string.IsNullOrEmpty(request.Params.Filter))
                {
                    query = request.Params.Filter switch
                    {
                        "Uczestnicze" => query.Where(x => x.Attendees.Any(a => a.UserId == userAccessor.GetUserId())),
                        "Organizuje" => query.Where(x => x.Attendees.Any(a => a.IsHost && a.UserId  == userAccessor.GetUserId())),
                        _ => query
                    };
                }

                var projectedActivities = query
                    .ProjectTo<ActivityDTO>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() });

                var activities = await projectedActivities
                    .Take(request.Params.PageSize + 1)
                    .ToListAsync(cancellationToken);

                DateTime? nextCursor = null;
                if(activities.Count > request.Params.PageSize)
                {
                    nextCursor = activities.Last().Date;
                    activities.RemoveAt(activities.Count - 1);
                }

                return Result<PagedList<ActivityDTO, DateTime?>>.Success(
                    new PagedList<ActivityDTO, DateTime?>
                    {
                        Items = activities,
                        NextCursor = nextCursor
                    }
                    );

            }
        }
    }
}
