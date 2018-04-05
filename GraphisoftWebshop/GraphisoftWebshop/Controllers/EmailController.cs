

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using GraphisoftWebshop.Controllers.DTO;
using GraphisoftWebshop.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Quick_Application3.ViewModels;
using StackExchange.Redis;


namespace GraphisoftWebshop.Controllers
{
    [Route("api/[controller]")]
    public class EmailController : Controller
    {
        //https://docs.microsoft.com/en-us/aspnet/web-api/overview/advanced/calling-a-web-api-from-a-net-client
        //Install - Package Microsoft.AspNet.WebApi.Client
        static HttpClient client = new HttpClient();

        const String GRAPHISOFT_EMAIL_API = "https://graphisoftid-api-test.graphisoft.com/";


        private readonly ILogger _logger;

        public EmailController( ILogger<Controller> logger)
        {
            _logger = logger;
        }

        // POST: Email
        [HttpPost]
        public Task<Boolean> Authentication([FromBody] EmailModel email)
        {
            return RunAsync(email.Email);
        }

        Task<Boolean> RunAsync(String email)
        {
            // Update port # in the following line.
            client.BaseAddress = new Uri("https://graphisoftid-api-test.graphisoft.com/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));   //ACCEPT header
            return PostEmailAsync(email);

        }


        async Task<Boolean> PostEmailAsync(String email)
        {
            GraphisoftUserDto graphisoftUserDto = new GraphisoftUserDto(email);
            ReqBody r = new ReqBody();
            r.GraphisoftUserDto = graphisoftUserDto;

            JObject rss = new JObject(new JProperty("GraphisoftUserDto", new JObject(new JProperty("emailaddress", email))));

            JObject o = JObject.FromObject(new
            {
                GraphisoftUserDto = new
                {
                    emailaddress = email,
                }
            });

            StringContent queryString = new StringContent(rss.ToString(), Encoding.UTF8, "application/json"); //CONTENT-TYPE header;
  
            HttpResponseMessage response = await client.PostAsync("api/Account/PostIsUserWithEmailExists", queryString);

            response.EnsureSuccessStatusCode();

            // Deserialize the updated product from the response body.
            GraphisoftResponse re = await response.Content.ReadAsAsync<GraphisoftResponse>();

            return Boolean.Parse(re.UserWithEmailExists);
        }
    }
}