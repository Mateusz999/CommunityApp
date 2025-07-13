using Application.Interfaces;
using Application.Profiles.DTOs;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Photos
{
    public class PhotoService : IPhotoService
    {

        private readonly Cloudinary _couldinary;

        public PhotoService(IOptions<CouldinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
                );

            _couldinary = new Cloudinary(account);
        }

        public async Task<string> DeletePhoto(string PublicId)
        {
            var deleteParams = new DeletionParams(PublicId);

            var result = await _couldinary.DestroyAsync(deleteParams);

            if (result.Error != null) throw new Exception(result.Error.Message);

            return result.Result;

             
        }

        public async Task<PhotoUploadResult?> UpoladPhoto(IFormFile file)
        {
            if(file.Length > 0)
            {
                await using var stream = file.OpenReadStream();

                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    //Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                    Folder = "Wydarzenia2025"
                };

                var uploadResult = await _couldinary.UploadAsync(uploadParams);

                if(uploadResult.Error != null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                return new PhotoUploadResult
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.AbsoluteUri
                };

            }


            return null;

        }
    }
}
