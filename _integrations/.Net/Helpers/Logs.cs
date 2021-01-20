using System;
using System.Net.Http;
using System.Net.Http.Formatting;
using Microsoft.Extensions.Configuration;
using Net.Models;

namespace Net.Helpers
{
    public class Logs
    {
        public Logs(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void RegisterLog(Log data, string type)
        {
            string url = Configuration.GetSection("Logs:LogUrl").Value;

            MediaTypeFormatter jsonFormatter = new JsonMediaTypeFormatter();
            HttpContent content = new ObjectContent<Log>(data, jsonFormatter);

            using HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("apikey", Configuration.GetSection("Logs:AppKey").Value);
            string ex = $"{url}/{type}";
            using HttpResponseMessage response = client.PostAsync($"{url}{type}", content).Result;

            string strJson = response.Content.ReadAsStringAsync().Result;

            if (response.StatusCode != System.Net.HttpStatusCode.OK)
                throw new Exception(response.RequestMessage.ToString());

            return;
        }

    }
}