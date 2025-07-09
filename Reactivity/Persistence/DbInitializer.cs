using System;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {
        var users = new List<User>
            {
                new() {DisplayName="Mateusz",UserName="Mateusz@spotly.com",Email ="Mateusz@spotly.com" },
                new() {DisplayName="Karolina",UserName="Karolina@spotly.com",Email ="Karolina@spotly.com" },
                new() {DisplayName="Jan",UserName="Jan@spotly.com",Email ="Jan@spotly.com" },
                new() {DisplayName="Martin",UserName="Martin@spotly.com",Email ="Martin@spotly.com" },
                new() {DisplayName="Patryk",UserName="Patryk@spotly.com",Email ="Patryk@spotly.com" },
                new() {DisplayName="Daniel",UserName="Daniel@spotly.com",Email ="Daniel@spotly.com" }
            };

        if (!userManager.Users.Any())
        {
     
            foreach(var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd"); // domyślnie asp net wymaga hasła złożonego

            }

        }
        if (context.Activities.Any()) return;

        var activities = new List<Activity>
{
    new()
    {
        Title = "Wykład Gościnny – Nowoczesne trendy w gastronomii",
        Date = DateTime.Now.AddMonths(-2),
        Description = "Spotkanie z szefem kuchni i degustacja napojów rzemieślniczych",
        Category = "drinks",
        City = "Nysa",
        Venue = "Kawiarnia Studencka PANS, ul. Obrońców Tobruku 5, Nysa",
        Latitude = 50.4749,
        Longitude = 17.3343,
        Attendees =
        [
            new() { UserId = users[0].Id, IsHost = true },
            new() { UserId = users[1].Id }
        ]
    },
    new()
    {
        Title = "Wycieczka studencka – Sztuka francuska w Paryżu",
        Date = DateTime.Now.AddMonths(-1),
        Description = "Zajęcia terenowe na temat dziedzictwa kulturowego i sztuki klasycznej",
        Category = "culture",
        City = "Paryż",
        Venue = "Luwr",
        Latitude = 48.8611473,
        Longitude = 2.3380276,
        Attendees =
        [
            new() { UserId = users[2].Id, IsHost = true },
            new() { UserId = users[0].Id },
            new() { UserId = users[3].Id }
        ]
    },
    new()
    {
        Title = "Dzień Otwarty PANS – Kierunki humanistyczne i społeczne",
        Date = DateTime.Now.AddMonths(1),
        Description = "Prezentacja kierunków studiów oraz zwiedzanie uczelni",
        Category = "culture",
        City = "Nysa",
        Venue = "Gmach Główny PANS, ul. Obrońców Tobruku 5",
        Latitude = 50.4749,
        Longitude = 17.3343,
        Attendees =
        [
            new() { UserId = users[1].Id, IsHost = true },
            new() { UserId = users[2].Id }
        ]
    },
    new()
    {
        Title = "Koncert Chóru Akademickiego",
        Date = DateTime.Now.AddMonths(2),
        Description = "Występ chóru studentów Wydziału Jazzu i Muzyki Estradowej",
        Category = "music",
        City = "Nysa",
        Venue = "Aula Muzyczna PANS",
        Latitude = 50.4755,
        Longitude = 17.3322,
        Attendees =
        [
            new() { UserId = users[3].Id, IsHost = true },
            new() { UserId = users[0].Id }
        ]
    },
    new()
    {
        Title = "Spotkanie integracyjne studentów pierwszego roku",
        Date = DateTime.Now.AddMonths(3),
        Description = "Wieczór przy napojach i planszówkach w akademiku",
        Category = "drinks",
        City = "Nysa",
        Venue = "Klub Studencki PANS",
        Latitude = 50.4735,
        Longitude = 17.3365,
        Attendees =
        [
            new() { UserId = users[4].Id, IsHost = true },
            new() { UserId = users[1].Id }
        ]
    },
    new()
    {
        Title = "Pub Quiz Wiedzy Ogólnej",
        Date = DateTime.Now.AddMonths(4),
        Description = "Zabawa w stylu akademickim – quiz z nagrodami",
        Category = "drinks",
        City = "Nysa",
        Venue = "Bar Kampusowy PANS",
        Latitude = 50.4742,
        Longitude = 17.3337,
        Attendees =
        [
            new() { UserId = users[0].Id, IsHost = true },
            new() { UserId = users[2].Id }
        ]
    },
    new()
    {
        Title = "Warsztaty z Sherlockiem – Logika i dedukcja w kryminalistyce",
        Date = DateTime.Now.AddMonths(5),
        Description = "Zajęcia dla studentów bezpieczeństwa wewnętrznego",
        Category = "culture",
        City = "Nysa",
        Venue = "Laboratorium Kryminalistyki PANS",
        Latitude = 50.4761,
        Longitude = 17.3359,
        Attendees =
        [
            new() { UserId = users[1].Id, IsHost = true },
            new() { UserId = users[4].Id }
        ]
    },
    new()
    {
        Title = "Festiwal Muzyki Akademickiej",
        Date = DateTime.Now.AddMonths(6),
        Description = "Przegląd zespołów studenckich i wykładowców",
        Category = "music",
        City = "Nysa",
        Venue = "Dziedziniec PANS Nysa",
        Latitude = 50.4752,
        Longitude = 17.3340,
        Attendees =
        [
            new() { UserId = users[2].Id, IsHost = true },
            new() { UserId = users[3].Id },
            new() { UserId = users[0].Id }
        ]
    },
    new()
    {
        Title = "Spływ kajakowy integracyjny po Nysie Kłodzkiej",
        Date = DateTime.Now.AddMonths(7),
        Description = "Studenci na falach – aktywny weekend z opiekunami roku",
        Category = "travel",
        City = "Nysa",
        Venue = "Przystań Kajakowa Nysa",
        Latitude = 50.4536,
        Longitude = 17.3201,
        Attendees =
        [
            new() { UserId = users[3].Id, IsHost = true },
            new() { UserId = users[1].Id }
        ]
    },
    new()
    {
        Title = "Wieczór Filmowy PANS – Klasyka kina europejskiego",
        Date = DateTime.Now.AddMonths(8),
        Description = "Pokaz filmów i panel dyskusyjny",
        Category = "film",
        City = "Nysa",
        Venue = "Centrum Kultury Studenckiej",
        Latitude = 50.4750,
        Longitude = 17.3344,
        Attendees =
        [
            new() { UserId = users[0].Id, IsHost = true },
            new() { UserId = users[4].Id }
        ]
    }
};


        context.Activities.AddRange(activities);

        await context.SaveChangesAsync();
    }
}
