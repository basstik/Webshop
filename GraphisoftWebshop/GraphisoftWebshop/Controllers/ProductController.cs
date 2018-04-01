

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using GraphisoftWebshop.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quick_Application3.ViewModels;
using StackExchange.Redis;

namespace GraphisoftWebshop.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private ApplicationDbContext db = new DesignTimeDbContextFactory().CreateDbContext(null);

        // GET: Product
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Product> productss = db.Products;
            // return View(a.ToList());

            Product p = new Product();
            p.Id = 1;
            p.Category = "vanan";

            List<Product> products = new List<Product>();
            products.Add(p);
            foreach (Product element in products)
            {
                System.Console.WriteLine(element.Category);
            }

            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<AutoMapperProfile>();

            });

            IEnumerable<ProductViewModel> a = Mapper.Map<IEnumerable<ProductViewModel>>(productss);

            ProductViewModel a2 = Mapper.Map<ProductViewModel>(productss);


            return Ok(a);

        }

        // POST: /delete/5
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id) {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            db.Products.Remove(product);
            db.SaveChanges();
            return Ok(id);
        }


        // POST: Product/Create
        [HttpPost("create")]
        public IActionResult Create([FromBody] ProductViewModel productViewModel){


           // ModelState.Remove("Id");
            if (ModelState.IsValid) { 
                if (productViewModel == null) {
                      return BadRequest($"{nameof(productViewModel)} cannot be null");
                }

                Mapper.Initialize(cfg =>
                {
                    cfg.AddProfile<AutoMapperProfile>();

                });

                Product product = Mapper.Map<Product>(productViewModel);

                db.Products.Add(product);
                db.SaveChanges();

                return CreatedAtAction("GetRoleById", new { id = product.Id }, product);
            }
            return BadRequest(ModelState);

        }
    }
}