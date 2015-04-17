using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web;
using BallyglassWebApi.Admin;

namespace BallyglassWebApi.Controllers
{
    public class EmailSender
    {

        public static void Send(Testimonial userDetails, string rootUrl)
        {
            string name = userDetails.Name;
            string date = userDetails.Date;
            string email = userDetails.Email;

            string value = userDetails.ToString();
            var encrypted = EncryptDecrypt.Encrypt(value);

            string url = rootUrl + "/?" + encrypted;
                
            MailAddress from = new MailAddress("ballyglasscottage@gmail.com",
               "Ballyglass Thatched Cottage",
            System.Text.Encoding.UTF8);

            SmtpClient client = new SmtpClient()
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(from.Address, "ballyglass1A")
            };



            MailAddress to = new MailAddress(email);

            MailMessage message = new MailMessage(from, to);
            message.Body = string.Format("Dear {0}, Thank you for Visiting us at Ballyglass Thatched Cottage. Please add a comment about your visit by visiting our page: {1}. Thank you, Niall Fallon.", name, url);
            message.Subject = "Ballyglass Thatched Cottage - Thank You!";
            //message.SubjectEncoding = System.Text.Encoding.UTF8;

            client.SendCompleted += new SendCompletedEventHandler(SendCompletedCallback);

            
            client.SendAsync(message, email);

            //client.SendAsyncCancel();
         
            //message.Dispose();
            
        }


        
        
        private static void SendCompletedCallback(object sender, AsyncCompletedEventArgs e)
        {
            // Get the unique identifier for this asynchronous operation.
            String token = (string)e.UserState;

            if (e.Cancelled)
            {
                Console.WriteLine("[{0}] Send canceled.", token);
            }
            else if (e.Error != null)
            {
                ErrorHandler.Write(string.Format("[Failed to send email to : {0}], {1}", token, e.Error.ToString()));
            }
            else
            {
                //send success response.
                HttpResponseMessage response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(string.Format("Message sent to {0}.", token))
                };
                
            }
            
        }
    }
}