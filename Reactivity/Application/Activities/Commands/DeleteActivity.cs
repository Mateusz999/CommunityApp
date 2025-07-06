using Application.Core;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {

        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command,Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
             .FindAsync([request.Id], cancellationToken);

               if (activity == null) return Result<Unit>.Failure("Wydarzenie nie zostało znalezione", 404);

                context.Remove(activity);
                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Błąd podczas usuwania wydarzenia.", 400);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
