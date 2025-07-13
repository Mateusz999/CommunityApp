using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Commands
{
    public class AddPhoto
    {
        public class Command : IRequest<Result<Photo>>
        {
            public required IFormFile File { get; set; }
        }

        public class Handler(IUserAccessor userAccessor, AppDbContext context, IPhotoService photoService) : IRequestHandler<Command, Result<Photo>>
        {
            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var uploatResult = await photoService.UpoladPhoto(request.File);

                if (uploatResult == null) return Result<Photo>.Failure("Błąd podczas wgrywania zdjęcia", 400);

                var user = await userAccessor.GetUserAsync();


                var photo = new Photo
                {
                    Url = uploatResult.Url,
                    PublicId = uploatResult.PublicId,
                    UserId = user.Id

                };
                user.ImageUrl ??= photo.Url;

                context.Photos.Add(photo);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                return result
                    ? Result<Photo>.Success(photo)
                    : Result<Photo>.Failure("Problem z zapisem zdjęcia do bazy danych", 400);

            }
        }
    }
}
