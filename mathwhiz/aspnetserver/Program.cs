using Swashbuckle.AspNetCore.SwaggerUI;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebSockets;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using System.Text.Json;
using System.Diagnostics;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Xml.Linq;
using mathwhiz.Data;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithOrigins("http://localhost:3000", "https://localhost:7160", "https://appname.azurestaticapps.net");
        });

});

// Extract the JWT key from appsettings, or if not specified, get the environment variable
var jwtKey = builder.Configuration["JwtSettings:SecretKey"] ??
             Environment.GetEnvironmentVariable("JWT_SECRET");

if (string.IsNullOrEmpty(jwtKey))
{
    throw new Exception("JWT Key is missing");
}


var key = Encoding.ASCII.GetBytes(jwtKey);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddAuthorization();



builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.IncludeFields = true;
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Posts", Version = "v1" });
});

var app = builder.Build();




app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "Posts";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API");
    swaggerUIOptions.RoutePrefix = string.Empty;
});
app.UseCors("CORSPolicy");
app.UseWebSockets();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

async Task<(string output, string error)> RunPythonScript(
    FunctionRequest functionRequest, string scriptPath,
    string fileName, string pythonScriptName, string outputDirectory, string? pythonClassName = null)
{
    var outputFile = Path.Combine(outputDirectory, fileName);
    string arguments = $"/c cd /d {scriptPath} && manim -o {fileName} {pythonScriptName}";

    ProcessStartInfo psi = new ProcessStartInfo
    {
        FileName = "cmd.exe",
        Arguments = arguments,
        RedirectStandardOutput = true,
        RedirectStandardError = true,
        UseShellExecute = false,
        CreateNoWindow = true
    };

    try
    {
        using (Process process = new Process { StartInfo = psi })
        {
            process.Start();
            string output = await process.StandardOutput.ReadToEndAsync();
            string error = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();

            return (output, error);
        }
    }
    catch (Exception ex)
    {
        return ($"", $"Error running script: {ex.Message}");
    }
}

app.MapPost("/api/get-function-integral", async (FunctionIntegralRequest request) =>
{
    string scriptPath = "G:\\Capstone\\manim_animations\\Calculus";
    string outputDirectory = "G:\\Capstone\\manim_animations\\Calculus\\media\\videos\\Riemann_Integral_Visualizer\\1080p60"; 
    string outputFile = Path.Combine(outputDirectory, "GetRiemannRectangles.mp4"); 
    string tempInputFile = Path.Combine(outputDirectory, "temp.txt");
    string pythonScriptName = "Riemann_Integral_Visualizer.py";
    string fileName = "GetRiemannRectangles";
    try
    {
        await File.WriteAllTextAsync(tempInputFile, request.ToString());
        Console.WriteLine(request.ToString());
        var (output, error) = await RunPythonScript(request,scriptPath, fileName,pythonScriptName, "GetRiemannRectangles.mp4", outputDirectory);

   
        Console.WriteLine("Output:\n" + output);
        if (!string.IsNullOrEmpty(error))
        {
            Console.WriteLine("Errors:\n" + error);
        }

        if (!File.Exists(outputFile))
        {
            return Results.BadRequest(new { Success = false, Message = $"Error generating video: {error}" });
        }


        var fileBytes = await File.ReadAllBytesAsync(outputFile);
        return Results.File(fileBytes, "video/mp4", "GetRiemannRectangles.mp4");
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { Success = false, Message = ex.Message });
    }
});

app.MapPost("/api/get-function-limit", async (FunctionRequest request) =>
{

var scriptPath = "G:\\Capstone\\manim_animations\\Calculus\\limit_visualizer.py";
        var outputDirectory = "G:\\Capstone\\manim_animations\\Calculus\\media\\images\\limit_visualizer";
        var outputFile = Path.Combine(outputDirectory, "limitVisualizer_ManimCE_v0.19.0.png");
        var tempInputFile = Path.Combine(outputDirectory, "temp.txt");

        try
        {
            await File.WriteAllTextAsync(tempInputFile, request.ToString());
            Console.WriteLine(request.ToString());
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    //Arguments = $"/c cd /d G:\\Capstone\\manim_animations\\Calculus && manim limit_visualizer.py limitVisualizer --media_dir G:\\Capstone\\manim_animations\\Calculus\\media",
                    Arguments = $"/c cd /d G:\\Capstone\\manim_animations\\Calculus && manim -s limit_visualizer.py limitVisualizer --media_dir G:\\Capstone\\manim_animations\\Calculus\\media",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            process.Start();
            string output = await process.StandardOutput.ReadToEndAsync();
            string error = await process.StandardError.ReadToEndAsync();
            process.WaitForExit();

            if (process.ExitCode != 0 || !File.Exists(outputFile))
            {
                return Results.BadRequest(new { Success = false, Message = $"Error generating image: {error}" });
            }

            var fileBytes = await File.ReadAllBytesAsync(outputFile);
            return Results.File(fileBytes, "image/png", "limitVisualizer_ManimCE_v0.19.0.png");
        }
        catch (Exception ex)
        {
            return Results.BadRequest(new { Success = false, Message = ex.Message });
        }
});

app.MapPost("/api/login", async (HttpContext context, User userToCheck) =>
{
    var user = await UsersRepository.UserExistsAsync(userToCheck.display_name, userToCheck.password);

    if (user != null)
    {
        var jwtKey = builder.Configuration["JwtSettings:SecretKey"]
                     ?? Environment.GetEnvironmentVariable("JWT_SECRET");

        if (string.IsNullOrEmpty(jwtKey))
        {
            return Results.Problem("JWT Secret Key is missing!");
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var tokenHandler = new JwtSecurityTokenHandler();

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("username", user.display_name),
                new Claim("userId", user.userID.ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(24), 
            SigningCredentials = creds
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        //Console.WriteLine($"Generated JWT Token: {tokenString}");

        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(tokenString);
        //Console.WriteLine(jwtToken);

        context.Response.Cookies.Append("jwt", tokenString, new CookieOptions
        {
            HttpOnly = true, 
            Secure = true,  
            SameSite = SameSiteMode.None,
            MaxAge = TimeSpan.FromHours(24)
        });


        //var jwtCookie = context.Request.Cookies["jwt"];
        //Console.WriteLine($"Set token: {jwtCookie}");

        return Results.Ok(new { Success = true, username = user.display_name, userID = user.userID });
    }
    else
    {
        return Results.Ok(new { Success = false, Message = "Invalid credentials" });
    }
}); //}).RequireAuthorization();


app.MapGet("/api/protected", (HttpContext context) =>
{
    var user = context.User.Identity;
    if (user != null && user.IsAuthenticated)
    {
        return Results.Ok(new { Message = "You are authenticated!", User = user.Name });
    }
    return Results.Unauthorized();
}).RequireAuthorization();

app.MapGet("/api/test-cookie", (HttpContext context) =>
{
    context.Response.Cookies.Append("test_cookie", "test_value", new CookieOptions
    {
        HttpOnly = false, 
        Secure = false,  
        SameSite = SameSiteMode.None
    });
    return Results.Ok(new { Message = "Test cookie set!" });
});


app.MapPost("/api/logout", (HttpContext context) =>
{
    context.Response.Cookies.Append("jwt", "", new CookieOptions
    {
        Expires = DateTime.UtcNow.AddDays(-1),
        HttpOnly = true,
        Secure = true, 
        SameSite = SameSiteMode.None, 
        Path = "/" 
    });
    return Results.Ok(new { Success = true, Message = "Logged out successfully" });
});

app.MapGet("/api/validate-token", async (HttpContext context) =>
{
    var jwtCookie = context.Request.Cookies["jwt"];
    Console.WriteLine($"Received Token: {jwtCookie}");
    if (string.IsNullOrEmpty(jwtCookie))
    {
        Console.WriteLine("JWT cookie is missing");
        return Results.Unauthorized();
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

        var usernameClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "username");
        if (usernameClaim == null)
        {
            Console.WriteLine("No valid username claim found.");
            return Results.Unauthorized();
        }
        var username = usernameClaim.Value;

        return Results.Ok(new { isValid = true, username });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Token validation failed: {ex.Message}");
        return Results.Unauthorized();
    }
});

app.MapPost("/api/register", async (User userToCheck) => {
    var user = await UsersRepository.UserExistsAsync(userToCheck.display_name, userToCheck.password);
    bool success = false;
    if (user == null)
    {
        success = await UsersRepository.CreateUserAsync(userToCheck);
    }

    if (success)
    {
        return Results.Ok(new { Success = true });
    }
    else
    {
        return Results.Ok(new { Success = false, Message = "User already exists" });
    }
});

app.Run();