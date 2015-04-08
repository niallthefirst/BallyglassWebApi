using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BallyglassWebApi.Controllers
{
    public class Testimonial
    {
        public string Name { get; set; }
        public string Comment { get; set; }
        public string Date { get; set; }
        public int ID { get; set; }
        public string Password { get; set; }
    }
}