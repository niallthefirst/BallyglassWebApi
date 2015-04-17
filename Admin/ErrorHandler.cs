using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace BallyglassWebApi.Admin
{
    public class ErrorHandler
    {
        public static void Write(string message)
        {
            CreateErrorResponse(message, null);
        }

        public static void Write(string message, Exception ex)
        {
            CreateErrorResponse(message, ex);
        }

        private static void CreateErrorResponse(string message, Exception ex)
        {
            var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
            {
                Content = new StringContent(message)
  
            };
            throw new HttpResponseException(resp);
        }
    }
}