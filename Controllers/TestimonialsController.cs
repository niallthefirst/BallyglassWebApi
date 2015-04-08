using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BallyglassWebApi.Admin;

namespace BallyglassWebApi.Controllers
{
    public class TestimonialsController : ApiController
    {
        private static string ConnectionString()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["TestimonialsDB"].ToString();
            return connectionString;
        }

        // GET api/<controller>
        public IEnumerable<Testimonial> Get()
        {
            var result = new List<Testimonial>();

            try
            {

                var connectionString = ConnectionString();

                using (SqlConnection sqlConnection1 = new SqlConnection(connectionString))
                {

                    SqlCommand cmd = new SqlCommand();
                    SqlDataReader reader;

                    cmd.CommandText = "GetAllTestimonials";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = sqlConnection1;

                    sqlConnection1.Open();



                    using (reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int index = reader.GetInt32(0);
                            string name = reader.GetString(1);
                            string comment = reader.GetString(2);
                            string date = reader.GetString(3);

                            var testimonial = new Testimonial();
                            testimonial.ID = index;
                            testimonial.Name = name;
                            testimonial.Comment = comment;
                            testimonial.Date = date;

                            result.Add(testimonial);

                        }
                    }
                }

            }
            catch (Exception ex)
            {
                ErrorHandler.Write("something went wrong", ex);
                return null;
            }

            return result;



        }



        // GET api/<controller>/5
        public Testimonial Get(int id)
        {
            Testimonial result = null;

            var testimonials = Get();

            if (testimonials.Where(t => t.ID == id).Any())
                result = testimonials.Where(t => t.ID == id).Single();


            return result;

        }

        // POST api/<controller>
        //http://localhost:20487/api/Testimonials
        //{"Name":"test","Comment":"test comment","Date":"4014","Password":"ddddballyglasscomment"}
        public string Post([FromBody]Testimonial value)
        {
            string response = "Failed to add testimonial.";

            if (value.Password == null)
            {
                response = "Failed to Add Testimonial. Password required. This should have been emailed to you. Contact ballyglasscottage@gmail.com.";

            }
            else
            {
                bool passwordPassed = CheckPassword(value.Password);
                if (passwordPassed)
                {
                    int newID = -1;
                    try
                    {
                        newID = AddTestimonialToDB(value);

                        if (newID >= 0)
                        {
                            value.ID = newID;

                            response = string.Format("Successfully added testimonial {0}, {1}. Thankyou {2}. ", value.ID, value.Comment, value.Name);

                        }
                        else
                        {
                            ErrorHandler.Write("something went wrong");


                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorHandler.Write("something went wrong", ex);
                    }
                }
                else
                {
                    response = "Failed to Add Testimonial. Password is not valid or has been used before. This should have been emailed to you. Contact ballyglasscottage@gmail.com.";
                }
            }
            return response;
        }

        private bool CheckPassword(string p)
        {
            var result = false;

            if (p.Contains("ballyglasscomment"))
                result = true;

            return result;

            
        }

        private int AddTestimonialToDB(Testimonial testimonial)
        {
            var result = -1;

            if (testimonial.Date == null)
                testimonial.Date = DateTime.Today.Year.ToString();

            var connectionString = ConnectionString();

            using (SqlConnection sqlConnection1 = new SqlConnection(connectionString))
            {
                 
                SqlCommand cmd = new SqlCommand();

                cmd.CommandText = "AddTestimonial";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = sqlConnection1;

                sqlConnection1.Open();

                cmd.Parameters.Add("@Name", SqlDbType.VarChar, 50).Value = testimonial.Name;
                cmd.Parameters.Add("@Comment", SqlDbType.VarChar, 150).Value = testimonial.Comment;
                cmd.Parameters.Add("@Date", SqlDbType.VarChar, 50).Value = testimonial.Date;


                result = (int)cmd.ExecuteScalar(); 
                //result = (int)cmd.ExecuteNonQuery();


            }

            return result;
        }



        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}