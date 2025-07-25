﻿using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Commands
{
    public class DeletePhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required  string PhotoId { get; set; }
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor, IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserWithPhotosAsync();

                var photo = user.Photos.FirstOrDefault(X => X.Id == request.PhotoId);

                if (photo == null) return Result<Unit>.Failure("Nie można znaleźć podanego zdjęcia.",400);

                if(photo.Url  == user.ImageUrl) return Result<Unit>.Failure("Nie można usunąć zdjęcia profilowego", 400);

                var deleteResult = await photoService.DeletePhoto(photo.PublicId);


                    user.Photos.Remove(photo);


                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Problem z usunięciem zdjęcia z bazy danych.", 400);

            }
        }
    }
}
