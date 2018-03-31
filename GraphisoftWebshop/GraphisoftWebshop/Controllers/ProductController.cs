

using System;
using System.Linq;
using System.Net;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GraphisoftWebshop.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private ApplicationDbContext db = new DesignTimeDbContextFactory().CreateDbContext(null);

        // GET: Product
        public ActionResult Index()
        {
            IOrderedQueryable<Product> a = db.Products.OrderBy(i => i.Name);
            return View(a.ToList());
        }

        // GET: Product/Delete/{number}
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return NoContent();
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound(id);
            }

            return View(product);
        }


        // GET: Product/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Product/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Product product)
        {
            if (ModelState.IsValid)
            {
                db.Products.Add(product);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(product);
        }
    }
}