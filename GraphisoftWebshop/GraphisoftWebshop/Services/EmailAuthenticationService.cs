using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GraphisoftWebshop.Services
{
    public class EmailAuthenticationService: IEmailAuthenticationService
    {
        //Install - Package Microsoft.AspNet.WebApi.Client
        const String GRAPHISOFT_EMAIL_API = "https://graphisoftid-api-test.graphisoft.com/";

        public async Task<Boolean> Authentication(String email)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(GRAPHISOFT_EMAIL_API);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));   //ACCEPT header

                JObject json = new JObject(new JProperty("GraphisoftUserDto", new JObject(new JProperty("emailaddress", email))));
                StringContent queryString = new StringContent(json.ToString(), Encoding.UTF8, "application/json");      //CONTENT-TYPE header;

                HttpResponseMessage response = await client.PostAsync("api/Account/PostIsUserWithEmailExists", queryString);
                response.EnsureSuccessStatusCode();

                String responseContent = await response.Content.ReadAsStringAsync();
                return Boolean.Parse(JObject.Parse(responseContent).GetValue("UserWithEmailExists").ToString());
            }
        }
    }
}
