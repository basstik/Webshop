using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphisoftWebshop.Services
{
    public interface IEmailAuthenticationService
    {
        Boolean Authentication(String email);
    }
}
