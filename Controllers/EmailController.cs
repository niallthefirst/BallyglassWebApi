﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BallyglassWebApi.Admin;

namespace BallyglassWebApi.Controllers
{
    public class EmailController : ApiController
    {
        // GET: api/Email
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Email/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Email
        public void Post([FromBody]Testimonial testimonial)
        {
            try
            {
               
                //Generate email.
                EmailSender.Send(testimonial, Request.RequestUri.Host);
                
                
            }
            catch (Exception e)
            {
                ErrorHandler.Write("Error creating email.", e);
            }
        
        
        }

        // PUT: api/Email/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Email/5
        public void Delete(int id)
        {
        }
    }
}
