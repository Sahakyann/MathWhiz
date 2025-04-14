using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace aspnetserver.Data
{
    public class JwtHelper
    {
        public static (bool IsValid, string? Username, string? UserId, IResult? Result) ValidateToken(HttpContext context, string jwtKey)
        {
            var jwtCookie = context.Request.Cookies["jwt"];
            Console.WriteLine($"Received Token: {jwtCookie}");

            if (string.IsNullOrEmpty(jwtCookie))
            {
                Console.WriteLine("JWT cookie is missing");
                return (false, null, null, Results.Unauthorized());
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var key = Encoding.ASCII.GetBytes(jwtKey);
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };

                tokenHandler.ValidateToken(jwtCookie, tokenValidationParameters, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;

                foreach (var claim in jwtToken.Claims)
                {
                    Console.WriteLine($"Claim Type: {claim.Type}, Value: {claim.Value}");
                }

                var username = jwtToken.Claims.FirstOrDefault(x => x.Type == "username")?.Value;
                var userId = jwtToken.Claims.FirstOrDefault(x => x.Type == "userId")?.Value;

                if (username == null || userId == null)
                {
                    Console.WriteLine("No valid username or userID claim found.");
                    return (false, null, null, Results.Unauthorized());
                }

                return (true, username, userId, null);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Token validation failed: {ex.Message}");
                return (false, null, null, Results.Unauthorized());
            }
        }
    }
}
