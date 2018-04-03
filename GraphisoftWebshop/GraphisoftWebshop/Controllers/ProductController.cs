

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

        private IUnitOfWork _unitOfWork;

        public ProductController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: Product
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Product> productss = _unitOfWork.Products.GetAllProductsData();
            // return View(a.ToList());

            //Product p = new Product();
            //p.Id = 1;
            //p.Category = "vanan";

            //List<Product> products = new List<Product>();
            //products.Add(p);
            //foreach (Product element in products)
            //{
            //    System.Console.WriteLine(element.Category);
            //}

            IEnumerable<ProductViewModel> a = Mapper.Map<IEnumerable<ProductViewModel>>(productss);

            return Ok(a);

        }

        // POST: /delete/5
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id) {
            Product product = _unitOfWork.Products.Get(id);
            if (product == null)
            {
                return NotFound();
            }
            _unitOfWork.Products.Remove(product);
            _unitOfWork.SaveChanges();
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

                Product product = Mapper.Map<Product>(productViewModel);

                _unitOfWork.Products.Add(product);
                _unitOfWork.SaveChanges();

                return CreatedAtAction("GetRoleById", new { id = product.Id }, product);
            }
            return BadRequest(ModelState);

        }
    }
}