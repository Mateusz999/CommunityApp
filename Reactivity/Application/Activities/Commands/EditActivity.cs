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

        public class Command : IRequest
        {
            public required Activity Activity { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
                    .FindAsync([request.Activity.Id], cancellationToken)
                        ?? throw new Exception("Cannot find activity"); // jeśli bedzie null to wyrzuci nam wyjatek

                // activity.Title = request.Activity.Title; // bez użytcia automapera musisz to tak wszystko wypełnić
                mapper.Map(request.Activity, activity);

                await context.SaveChangesAsync(cancellationToken);


            }
        }
    }
}
