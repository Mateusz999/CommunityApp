using Application.Activities.DTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Validators
{
    public class BaseActivityValidator<T,TDto> : AbstractValidator<T> where TDto 
        : BaseActivityDto
    {
        public BaseActivityValidator(Func<T,TDto> selector)
        {
       RuleFor(x => selector(x).Title)
                .NotEmpty().WithMessage("Tytuł jest wymagany!")
                .MaximumLength(100)
                .WithMessage("Tytuł mie może być dłuższy niż 100 znaków.");


            RuleFor(x => selector(x).Description)
                .NotEmpty()
                .WithMessage("Opis jest wymagany!");

            RuleFor(x => selector(x).Date)
                .GreaterThan(DateTime.UtcNow)
                .WithMessage("Nie możesz podać daty wstecznej! ");

            RuleFor(x => selector(x).Category)
                .NotEmpty()
                .WithMessage("Kategoria jest wymagana!");
            RuleFor(x => selector(x).City)
                .NotEmpty()
                .WithMessage("Miasto jest wymagane!");

            RuleFor(x => selector(x).Venue)
                .NotEmpty()
                .WithMessage("Miejsce jest wymagane!");

            RuleFor(x => selector(x).Latitude)
                .NotEmpty()
                .WithMessage("Szerkość Geograficzna jest wymagana!")
                .InclusiveBetween(-90,90)
                .WithMessage("Szerokość geograficzna musi być pomiędzy -90 a 90 !");

            RuleFor(x => selector(x).Longitude)
                .NotEmpty()
                .WithMessage("Długość Geograficzna jest wymagana!")
                .InclusiveBetween(-180,180)
                .WithMessage("Długość geograficzna musi byc pomiędzy -180 a 180!"); 
        }
    }
}
