using Application.Activities.DTOs;
using Application.Core;
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
    public class GetActivityDetails
    {
        public class Query : IRequest<Result<ActivityDTO>>
        {
            public required string Id { get; set; }
        }


        public class Handler(AppDbContext context,IMapper mapper) : IRequestHandler<Query, Result<ActivityDTO>>
        {
            public async Task<Result<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await  context.Activities
                    .ProjectTo<ActivityDTO>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => request.Id == x.Id,cancellationToken);

                if (activity == null) return Result<ActivityDTO>.Failure("Wydarzenie nie zostało znalezione", 404);


                return Result<ActivityDTO>.Success(mapper.Map<ActivityDTO>(activity));

            }
        }
    }
}
