using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphisoftWebshop.Controllers
{
    public class GraphisoftUserDto
    {
        public string EmailAddress { get; set; }

        public GraphisoftUserDto(string EmailAddress)
        {
            this.EmailAddress = EmailAddress;
        }

    }
}
