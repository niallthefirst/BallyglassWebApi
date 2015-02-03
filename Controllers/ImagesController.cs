using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BallyglassWebApi
{
    public class ImagesController : ApiController
    {
        // GET api/images
        public IEnumerable<string> Get()
        {
            var localImagesPath = Directory.GetFiles(System.Web.HttpContext.Current.Server.MapPath("~/images"));
            var websiteRoot = System.Web.HttpContext.Current.Server.MapPath("~");

            var relativeImages = localImagesPath.Select(local => local.Substring(websiteRoot.Length, local.Length - websiteRoot.Length));

            return relativeImages;
        }

        // GET api/images/5
        public string Get(int id)
        {
            var allImagesRelativePaths = Get();
            if (id < allImagesRelativePaths.Count())
                return allImagesRelativePaths.ElementAt(id);

            return null;

        }

        // POST api/images
        public void Post([FromBody]string value)
        {
        }

        // PUT api/images/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/images/5
        public void Delete(int id)
        {
        }
    }
}