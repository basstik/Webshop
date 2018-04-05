using System;

using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using GraphisoftWebshop.Exceptions;
using Newtonsoft.Json.Linq;

namespace GraphisoftWebshop.Services
{
    public class EmailAuthenticationService: IEmailAuthenticationService
    {
        //Install - Package Microsoft.AspNet.WebApi.Client
        static HttpClient client = new HttpClient();

        const String GRAPHISOFT_EMAIL_API = "https://graphisoftid-api-test.graphisoft.com/";

        public Boolean Authentication(String email)
        {
            try
            {
                client.BaseAddress = new Uri(GRAPHISOFT_EMAIL_API);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));   //ACCEPT header
                return PostEmailAuthenticationAsync(email).Result;
            }
            catch (HttpRequestException e)
            {
                throw new EmailAuthorizationException();
            }
        }


        async Task<Boolean> PostEmailAuthenticationAsync(String email)
        {
            JObject rss = new JObject(new JProperty("GraphisoftUserDto", new JObject(new JProperty("emailaddress", email))));
            StringContent queryString = new StringContent(rss.ToString(), Encoding.UTF8, "application/json"); //CONTENT-TYPE header;

            HttpResponseMessage response = await client.PostAsync("api/Account/PostIsUserWithEmailExiste", queryString);
            response.EnsureSuccessStatusCode();

            String responseContent = await response.Content.ReadAsStringAsync();
            return Boolean.Parse(JObject.Parse(responseContent).GetValue("UserWithEmailExists").ToString());

        }
    }
}
