
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DAL
{
    public interface IDatabaseInitializer
    {
        Task SeedAsync();
    }


    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;

        public DatabaseInitializer(ApplicationDbContext context, ILogger<DatabaseInitializer> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task SeedAsync()
        {
            await _context.Database.MigrateAsync().ConfigureAwait(false);


            if (!await _context.Products.AnyAsync())
            {

                Product prod_1 = new Product
                {
                    Category = "Sport",
                    Name = "Nike Football ",
                    Description = "Yet another masterpiece from the world's best Nike football manufacturer",
                    Price = 995,
                    CreatedBy = "Thomas",
                    Email = "tomi@gmail.com",
                };

                Product prod_2 = new Product
                {
                    Category = "Car",
                    Name = "BMW sport car",
                    Description = "This is the best car.",
                    Price = 1000000,
                    CreatedBy = "Peter",
                    Email = "peter10@gmail.com",
                };

                _context.Products.Add(prod_1);
                _context.Products.Add(prod_2);

                await _context.SaveChangesAsync();

                _logger.LogInformation("Seeding initial data completed");
            }
        }
    }
}
