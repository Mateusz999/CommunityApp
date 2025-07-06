using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Commands
{
    public class EditActivity
    {

        public class Command : IRequest<Result<Unit>>
        {
            public required EditActivityDto ActivityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
                    .FindAsync([request.ActivityDto.Id], cancellationToken);

                 if (activity == null) return Result<Unit>.Failure("Wydarzenie nie zostało znalezione", 404);
                // activity.Title = request.Activity.Title; // bez użytcia automapera musisz to tak wszystko wypełnić
                mapper.Map(request.ActivityDto, activity);

               var result =  await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Błąd podczas edycji wydarzenia.", 400);

                return Result<Unit>.Success(Unit.Value);


            }
        }
    }
}
