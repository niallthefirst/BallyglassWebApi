using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BallyglassWebApi.Admin;

namespace BallyglassWebApi.Controllers
{
    public class UserDetailsController : ApiController
    {
        // GET: api/UserDetails
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/UserDetails/?cypher=oi3O2UZtGo3VjfKW9w7NHB1i35o5M6PmmwJn9NkOamxdCBkNHwC1687mBUPf46bn
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

                if (userDetails.Length > 0)
                {
                    string name, email, date;
                    if (userDetails.Length > 1)
                        name = userDetails[0];
                    if (userDetails.Length > 2)
                        email = userDetails[1];
                    if (userDetails.Length > 3)
                        date = userDetails[2];

                    var result = new Testimonial() { Name = name, Date = date };
                    return result;
                }
            }
            catch (Exception e)
            {
                ErrorHandler.Write("Error Decrypting the Testimonial user details.", e);
            }
            return null;
        }

        // POST: api/UserDetails
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/UserDetails/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/UserDetails/5
        public void Delete(int id)
        {
        }
    }
}
