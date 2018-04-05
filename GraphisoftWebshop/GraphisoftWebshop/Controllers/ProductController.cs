
using System.Collections.Generic;
using AutoMapper;
using DAL;
using DAL.Models;
using GraphisoftWebshop.Services;
using GraphisoftWebshop.ViewModels;
using Microsoft.AspNetCore.Mvc;


namespace GraphisoftWebshop.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private IUnitOfWork _unitOfWork;

        private IEmailAuthenticationService _emailController;

        public ProductController(IUnitOfWork unitOfWork, IEmailAuthenticationService emailController)
        {
            _unitOfWork = unitOfWork;
            _emailController = emailController;
        }

        // GET: Product
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Product> products = _unitOfWork.Products.GetAllProductsData();
            IEnumerable<ProductViewModel> productViewModesls = Mapper.Map<IEnumerable<ProductViewModel>>(products);
            return Ok(productViewModesls);
        }

        // POST: /delete/5
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
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
        public IActionResult Create([FromBody] ProductViewModel productViewModel)
        {
            if (ModelState.IsValid) { 
                if (productViewModel == null) {
                      return BadRequest($"{nameof(productViewModel)} cannot be null");
                }

                if (!_emailController.Authentication(productViewModel.Email))
                {
                    return BadRequest("Email authenticatoin failed");
                }

                Product product = Mapper.Map<Product>(productViewModel);

                _unitOfWork.Products.Add(product);
                _unitOfWork.SaveChanges();

                return CreatedAtAction("CreateProduct", new { id = product.Id }, product);

            }
            return BadRequest(ModelState);

        }
    }
}