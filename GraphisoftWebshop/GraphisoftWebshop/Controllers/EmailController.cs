﻿

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
using GraphisoftWebshop.Exceptions;
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

        //Install - Package Microsoft.AspNet.WebApi.Client
        static HttpClient client = new HttpClient();

        private const String GRAPHISOFT_EMAIL_API = "https://graphisoftid-api-test.graphisoft.com/";

        [HttpPost]
        public Boolean Authentication([FromBody] EmailModel email)
        {
            try
            {
                client.BaseAddress = new Uri(GRAPHISOFT_EMAIL_API);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));   //ACCEPT header
                return PostEmailAuthenticationAsync(email.Email).Result;
            }
            catch (HttpRequestException e)
            {
                throw new EmailAuthorizationException();
            }
        }


        async Task<Boolean> PostEmailAuthenticationAsync(string email)
        {
            JObject rss = new JObject(new JProperty("GraphisoftUserDto", new JObject(new JProperty("emailaddress", email))));
            StringContent queryString = new StringContent(rss.ToString(), Encoding.UTF8, "application/json"); //CONTENT-TYPE header;

            HttpResponseMessage response = await client.PostAsync("api/Account/PostIsUserWithEmailExists", queryString);
            response.EnsureSuccessStatusCode();

            String responseContent = await response.Content.ReadAsStringAsync();
            return Boolean.Parse(JObject.Parse(responseContent).GetValue("UserWithEmailExists").ToString());

        }
    }
}
    