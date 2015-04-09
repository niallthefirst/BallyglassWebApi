using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BallyglassWebApi.Admin;

namespace BallyglassWebApi.Controllers
{
    public class EncryptDecryptController : ApiController
    {
        // GET: api/EncryptDecrypt
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/EncryptDecrypt/?cypher=oi3O2UZtGo3VjfKW9w7NHB1i35o5M6PmmwJn9NkOamxdCBkNHwC1687mBUPf46bn
        //original string must be encoded first to remove whitepace or else the Decrypt breaks.
        public Testimonial Get(string cypher)
        {
            try
            {
                var formattedCypher = cypher.Replace(' ', '+');

                var decrypted = EncryptDecrypt.Decrypt(formattedCypher);
                var userDetails = decrypted.Split('|');

                if (userDetails == null)
                    ErrorHandler.Write("Could not decrpyt. Cypher is empty.");

                var name = userDetails[0];
                var email = userDetails[1];
                var date = userDetails[2];

                var result = new Testimonial() { Name = name, Date = date };
                return result;
            }
            catch (Exception e)
            {
                ErrorHandler.Write("Error Decrypting the Testimonial user details.", e);
            }
            return null;
        }

        // POST: api/EncryptDecrypt
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/EncryptDecrypt/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/EncryptDecrypt/5
        public void Delete(int id)
        {
        }
    }
}
