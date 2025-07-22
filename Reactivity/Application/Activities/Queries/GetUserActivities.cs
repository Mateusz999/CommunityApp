using Application.Activities.DTOs;
using Application.Interfaces;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Activities.Queries
{
    public class GetUserActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public required string Id { get; set; }
            public required string Filter { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.ActivityAttendees
                     .Where(x => request.Id == x.User.Id)
                     .OrderBy(x => x.Activity.Date)
                     .Select(x => x.Activity)
                     .AsQueryable();

                var today = DateTime.UtcNow;

                query = request.Filter switch
                {
                    "past" => query.Where( x => x.Date <= today && x.Attendees.Any( a => a.UserId == request.Id)),
                    "hosting" =>  query.Where(x  => x.Attendees.Any(a => a.IsHost && a.UserId == request.Id)),
                    _ => query.Where( x => x.Date >= DateTime.Today && x.Attendees.Any( a => a.UserId == request.Id))
                };

                var projectedActivity = query.ProjectTo<UserActivityDto>(mapper.ConfigurationProvider);

                var activities = await projectedActivity.ToListAsync(cancellationToken);

                return Result<List<UserActivityDto>>.Success(activities);
            }
        }
    }
}
