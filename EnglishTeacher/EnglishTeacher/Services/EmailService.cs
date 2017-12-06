using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.IO;
using System.Reflection;
using System.Xml;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Configuration;

namespace EnglishTeacher.Services
{
    public class EmailService : IIdentityMessageService
    {
        #region Send Email Method
        public async Task SendAsync(IdentityMessage message)
        {
            var from = ConfigurationManager.AppSettings.Get("FromAddress");
            var password = ConfigurationManager.AppSettings.Get("Password");
            using (SmtpClient Smtp = new SmtpClient("smtp.mail.ru", 587))
            {
                Smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                Smtp.UseDefaultCredentials = false;
                Smtp.Credentials = new NetworkCredential(from, password);
                Smtp.EnableSsl = true;
                using (var Message = new MailMessage(from, message.Destination))
                {
                    Message.Subject = message.Subject;
                    Message.Body = message.Body;
                    Message.IsBodyHtml = true;
                    Smtp.Send(Message);
                }
            }


            //using (SmtpClient Smtp = new SmtpClient("smtp.yandex.ru", 25))
            //{
            //    Smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            //    Smtp.UseDefaultCredentials = false;
            //    Smtp.Credentials = new NetworkCredential(from, password);
            //    Smtp.EnableSsl = true;
            //    using (var Message = new MailMessage(from, message.Destination))
            //    {
            //        Message.Subject = message.Subject;
            //        Message.Body = message.Body;
            //        Message.IsBodyHtml = true;
            //        try
            //        {
            //            await Smtp.SendMailAsync(Message);
            //        }
            //        catch (SmtpException ex)
            //        {
            //            Console.WriteLine(ex.Message);
            //        }
            //    }
            //}

        }

        #endregion

    }
}