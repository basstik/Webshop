using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphisoftWebshop.Controllers.DTO;
using GraphisoftWebshop.Services;
using Microsoft.AspNetCore.Mvc;

namespace GraphisoftWebshop.Controllers
{
    [Route("api/[controller]")]
    public class EmailController : Controller
    {
        private IEmailAuthenticationService _emailController;

        public EmailController(IEmailAuthenticationService emailController)
        {
            _emailController = emailController;
        }

        [HttpPost]
        public Boolean Authentication([FromBody] EmailModel email)
        {
            try
            {
                if (!_emailController.Authentication(email.Email).Result)
                {
                    return false;
                }
            }
            catch (AggregateException ae){}

            return true;

        }
    }
}

