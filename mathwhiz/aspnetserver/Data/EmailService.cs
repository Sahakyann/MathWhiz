using System.Net.Mail;
using System.Net;

namespace aspnetserver.Data
{
    public static class EmailService
    {
        public static async Task SendConfirmationEmail(string toEmail, string code)
        {
            var mail = new MailMessage();
            mail.To.Add(toEmail);
            mail.Subject = "Your Confirmation Code";
            mail.Body = $"Your confirmation code is: {code}";
            mail.From = new MailAddress("noreply@mathwhiz.com");

            using var smtp = new SmtpClient("smtp.yourprovider.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("your_username", "your_password"),
                EnableSsl = true,
            };

            await smtp.SendMailAsync(mail);
        }
    }
}
