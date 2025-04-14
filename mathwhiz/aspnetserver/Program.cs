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
using aspnetserver.Data.Structures;
using aspnetserver.Data;
using Azure.Core;


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
app.UseStaticFiles();



app.MapPost("/api/get-function-integral/{userId}", async (FunctionIntegralRequest request, int userId) =>
{
    string outputDirectory = "G:\\Capstone\\manim_animations\\Calculus\\media\\videos\\Riemann_Integral_Visualizer\\1080p60";
    await Console.Out.WriteLineAsync($"Integral Request received from User Id: {userId}");
    string pythonScriptName = "Riemann_Integral_Visualizer.py";
    ManimRequest.RequestType type = ManimRequest.RequestType.Integral;

    try
    {
        IResult? cachedFile = await request.GetCachedFileAsync(type, outputDirectory, "mp4", userId);
        if (cachedFile != null)
        {
            return cachedFile; 
        }
        
        await request.SaveJsonRepresentationAsync(type, ManimRequest.RequestJsonFilePath);
        Console.WriteLine(request.ToString());
        var (output, error,outputFileName) = await PythonScripts.RunPythonScript(request, FunctionRequest.scriptPathCalculus, pythonScriptName, type,"mp4",outputDirectory, userId);
        string outputFile = Path.Combine(outputDirectory, outputFileName);

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
        return Results.File(fileBytes, "video/mp4", outputFileName);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { Success = false, Message = ex.Message });
    }
});

app.MapPost("/api/get-linear-transformation/{userId}", async (LinearAlgebraRequest request, int userId) =>
{
    
    string outputDirectory = "G:\\Capstone\\manim_animations\\LinearAlgebra\\media\\videos\\Vector_transformations\\1080p60";
    await Console.Out.WriteLineAsync($"Linear Transformation Request received from User Id: {userId}");
    string pythonScriptName = "Vector_transformations.py";
 
    ManimRequest.RequestType type = ManimRequest.RequestType.LinearTransformation;

    try
    {
        IResult? cachedFile = await request.GetCachedFileAsync(type, outputDirectory, "mp4", userId);
        if (cachedFile != null)
        {
            return cachedFile;
        }
       
        await request.SaveJsonRepresentationAsync(type, ManimRequest.RequestJsonFilePath);
        Console.WriteLine(request.ToString());

        var (output, error, outputFileName) = await PythonScripts.RunPythonScript(
            request, LinearAlgebraRequest.scriptPath, pythonScriptName, type, "mp4", outputDirectory,userId
        );

        string outputFile = Path.Combine(outputDirectory, outputFileName);
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
        return Results.File(fileBytes, "video/mp4", outputFileName);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { Success = false, Message = ex.Message });
    }
});

app.MapPost("/api/get-eigenvector-visualizer/{userId}", async (LinearAlgebraRequest request, int userId) =>
{

    string outputDirectory = "G:\\Capstone\\manim_animations\\LinearAlgebra\\media\\videos\\Eigenvectors\\1080p60";
    await Console.Out.WriteLineAsync($"Eigenvector Visualizer Request received from User Id: {userId}");
    string pythonScriptName = "Eigenvectors.py";
  
    ManimRequest.RequestType type = ManimRequest.RequestType.Eigenvectors;

    try
    {
        IResult? cachedFile = await request.GetCachedFileAsync(type, outputDirectory, "mp4", userId);
        if (cachedFile != null)
        {
            return cachedFile;
        }
      
        await request.SaveJsonRepresentationAsync(type, ManimRequest.RequestJsonFilePath);
        Console.WriteLine(request.ToString());

        var (output, error, outputFileName) = await PythonScripts.RunPythonScript(
            request, LinearAlgebraRequest.scriptPath, pythonScriptName, type, "mp4", outputDirectory, userId
        );

        string outputFile = Path.Combine(outputDirectory, outputFileName);
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
        return Results.File(fileBytes, "video/mp4", outputFileName);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { Success = false, Message = ex.Message });
    }
});

app.MapPost("/api/get-newtons-method/{userId}", async (NumericalRequest request, int userId) =>
{
    string outputDirectory = "G:\\Capstone\\manim_animations\\Numerical\\media\\videos\\Newtons_Method_Visualizer\\1080p60";
    await Console.Out.WriteLineAsync($"Newtons Method Request received from User Id: {userId}");
    string pythonScriptName = "Newtons_Method_Visualizer.py";
    ManimRequest.RequestType type = ManimRequest.RequestType.NewtonsMethod;
    try
    {     
        IResult? cachedFile = await request.GetCachedFileAsync(type, outputDirectory, "mp4", userId);
        if (cachedFile != null)
        {
            return cachedFile;
        }

        await request.SaveJsonRepresentationAsync(type, ManimRequest.RequestJsonFilePath);
        Console.WriteLine(request.ToString());
      
        var (output, error, outputFileName) = await PythonScripts.RunPythonScript(
            request, NumericalRequest.scriptPathNumerical, pythonScriptName, type, "mp4", outputDirectory,userId
        );

        string outputFile = Path.Combine(outputDirectory, outputFileName);

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
        return Results.File(fileBytes, "video/mp4", outputFileName);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { Success = false, Message = ex.Message });
    }
});

/*app.MapPost("/api/get-function-limit", async (FunctionRequest request) =>
{
    string scriptPath = "G:\\Capstone\\manim_animations\\Calculus";
    string outputDirectory = "G:\\Capstone\\manim_animations\\Calculus\\media\\images\\limit_visualizer";
    string pythonScriptName = "limit_visualizer.py";
    FunctionRequest.FunctionType type = FunctionRequest.FunctionType.Limit;
    string tempInputFile = Path.Combine(outputDirectory, "temp.txt");

    //string functionHash = FunctionHashStore.GetOrCreateFunctionHash(request.latex_function);
    //string tempInputFile = Path.Combine(outputDirectory, $"temp_{functionHash}.txt");
    //string outputFile = Path.Combine(outputDirectory, $"limitVisualizer_{functionHash}.png");

    try
    {

        await File.WriteAllTextAsync(tempInputFile, request.ToString());
        Console.WriteLine(request.ToString());

        var (output, error, outputFileName) = await PythonScripts.RunPythonScript(request, scriptPath, pythonScriptName, type, ".png", outputDirectory);
        string outputFile = Path.Combine(outputDirectory, outputFileName);

        Console.WriteLine("Output:\n" + output);
        if (!string.IsNullOrEmpty(error))
        {
            Console.WriteLine("Errors:\n" + error);
        }

        if (!File.Exists(outputFile))
        {
            return Results.BadRequest(new { Success = false, Message = $"Error generating image: {error}" });
        }

        var fileBytes = await File.ReadAllBytesAsync(outputFile);
        return Results.File(fileBytes, "video/mp4", outputFileName);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { Success = false, Message = ex.Message });
    }
});*/

app.MapPost("/api/get-taylor-series/{userId}", async (TaylorSeriesRequest request,int userId) =>
{
    string outputDirectory = "G:\\Capstone\\manim_animations\\Calculus\\media\\videos\\Taylor_Series_Visualizer\\1080p60";
    await Console.Out.WriteLineAsync($"Taylor Series Request received from User Id: {userId}");
    string pythonScriptName = "Taylor_Series_Visualizer.py";
    ManimRequest.RequestType type = ManimRequest.RequestType.TaylorSeries;

    try
    {
        IResult? cachedFile = await request.GetCachedFileAsync(type, outputDirectory, "mp4", userId);
        if (cachedFile != null)
        {
            return cachedFile;
        }
     
        await request.SaveJsonRepresentationAsync(type, ManimRequest.RequestJsonFilePath);
        Console.WriteLine(request.ToString());

        var (output, error, outputFileName) = await PythonScripts.RunPythonScript(
            request, FunctionRequest.scriptPathCalculus, pythonScriptName, type, "mp4", outputDirectory,userId
        );

        string outputFile = Path.Combine(outputDirectory, outputFileName);

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
        return Results.File(fileBytes, "video/mp4", outputFileName);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { Success = false, Message = ex.Message });
    }
});


app.MapPost("/api/login", async (HttpContext context, User userToCheck) =>
{
    var user = await UsersRepository.UserExistsAsync(userToCheck.username, userToCheck.password);

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
                new Claim("username", user.username),
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

        return Results.Ok(new { Success = true, username = user.username, user.userID });
    }
    else
    {
        return Results.Ok(new { Success = false, Message = "Invalid credentials or the user does not exist" });
    }
});


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
    var (isValid, username, userID, errorResult) = JwtHelper.ValidateToken(context, jwtKey);
    if (!isValid)
        return errorResult!;

    return Results.Ok(new { isValid = true, username, userID });
});

app.MapPost("/api/register", async (User userToCheck) => {
    var user = await UsersRepository.UserExistsAsync(userToCheck.username, userToCheck.password);
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

app.MapGet("/api/get-user-by-id/{userId}", async (int userID) =>
{
    UpdateUserDTO userDTO = new( await UsersRepository.GetUserByIdAsync(userID));
    if(userDTO != null)
    {
        return Results.Ok(userDTO);
    }
    else
    {
        return Results.BadRequest();
    }

});

app.MapPost("/api/update-user", async (HttpContext context, UpdateUserDTO userToUpdate) =>
{
    var (isValid, username, userID, errorResult) = JwtHelper.ValidateToken(context, jwtKey);
    if (!isValid)
        return errorResult!;

    if (userID != userToUpdate.user_Id.ToString())
    {
        Console.WriteLine($"Token userID {userID} does not match update target {userToUpdate.user_Id}");
        return Results.Forbid();
    }

    Console.WriteLine($"Received update request for user: {userToUpdate.user_Id}");

    bool updateSuccessful = await UsersRepository.UpdateUserAsync(userToUpdate);

    return updateSuccessful
        ? Results.Ok("Update successful.")
        : Results.BadRequest("Update failed.");
});

app.MapPost("/api/upload-profile-picture/{userId}", async (HttpContext context, int userId) =>
{
    var (isValid, _, userIDFromToken, errorResult) = JwtHelper.ValidateToken(context, jwtKey);
    if (!isValid)
        return errorResult!;

    if (userIDFromToken != userId.ToString())
    {
        Console.WriteLine($"Token userID {userIDFromToken} does not match upload target {userId}");
        return Results.Forbid();
    }

    Console.WriteLine($"Received profile picture upload request from userId: {userId}");

    var file = context.Request.Form.Files.FirstOrDefault();
    if (file == null)
    {
        return Results.BadRequest(new { Success = false, Message = "No file uploaded" });
    }

    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
    Directory.CreateDirectory(uploadsFolder);

    var uniqueFileName = $"{userId}_{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }

    var savedPath = $"/uploads/{uniqueFileName}";

    bool success = await UsersRepository.UpdateUserProfilePictureAsync(userId, savedPath);
    Console.WriteLine($"Success: {success}, File at: {savedPath}");

    if (success)
    {
        return Results.Ok(new { Success = true, FilePath = savedPath });
    }
    else
    {
        return Results.Ok(new { Success = false, Message = "Failed to update profile picture" });
    }
});


app.MapPost("/api/upload-background-picture/{userId}", async (HttpContext context, int userId) =>
{
    var (isValid, _, userIDFromToken, errorResult) = JwtHelper.ValidateToken(context, jwtKey);
    if (!isValid)
        return errorResult!;

    if (userIDFromToken != userId.ToString())
    {
        Console.WriteLine($"Token userID {userIDFromToken} does not match background upload target {userId}");
        return Results.Forbid();
    }

    Console.WriteLine($"Received background picture upload request from userId: {userId}");

    var file = context.Request.Form.Files.FirstOrDefault();
    if (file == null)
    {
        return Results.BadRequest(new { Success = false, Message = "No file uploaded" });
    }

    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
    Directory.CreateDirectory(uploadsFolder);

    var uniqueFileName = $"{userId}_bg_{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }

    var savedPath = $"/uploads/{uniqueFileName}";

    bool success = await UsersRepository.UpdateUserBackgroundPictureAsync(userId, savedPath);
    Console.WriteLine($"Success: {success}, File at: {savedPath}");

    if (success)
    {
        return Results.Ok(new { Success = true, FilePath = savedPath });
    }
    else
    {
        return Results.Ok(new { Success = false, Message = "Failed to update background picture" });
    }
});


app.MapPost("/api/upload-user-asset/{userId}/{fileName}", async (HttpContext context, int userId, string fileName) =>
{
    var (isValid, _, userIDFromToken, errorResult) = JwtHelper.ValidateToken(context, jwtKey);
    if (!isValid)
        return errorResult!;

    if (userIDFromToken != userId.ToString())
    {
        Console.WriteLine($"Token userID {userIDFromToken} does not match asset upload target {userId}");
        return Results.Forbid();
    }

    Console.WriteLine($"Received User Asset Upload Request from userID: {userId}");

    var filePath = VisualizationCache.Get(userId);
    if (string.IsNullOrEmpty(filePath) || !System.IO.File.Exists(filePath))
    {
        return Results.BadRequest(new { Success = false, Message = "No cached visualization found for this user." });
    }

    if (string.IsNullOrWhiteSpace(fileName))
    {
        fileName = Path.GetFileName(filePath);
    }

    var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(filePath)}";

    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "user_saved_assets");
    Directory.CreateDirectory(uploadsFolder);

    var destinationPath = Path.Combine(uploadsFolder, uniqueFileName);

    await using (var sourceStream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
    await using (var destStream = new FileStream(destinationPath, FileMode.Create))
    {
        await sourceStream.CopyToAsync(destStream);
    }

    // Allows saving the ran video only once
    //VisualizationCache.Remove(userId);

    var savedPath = $"/user_saved_assets/{uniqueFileName}";

    User owner = await UsersRepository.GetUserByIdAsync(userId);
    if (owner == null)
    {
        return Results.BadRequest(new { Success = false, Message = "User not found." });
    }

    UserSavedAsset asset = new UserSavedAsset
    {
        OwnerUserID = owner.userID,
        Saved_Asset = savedPath,
        FileName = fileName,
        CreatedAt = DateTime.UtcNow
    };

    bool success = await UsersRepository.UploadUserAsset(asset);

    Console.WriteLine($"Success: {success}, File at: {savedPath}");

    return success
        ? Results.Ok(new { Success = true, FilePath = savedPath })
        : Results.Ok(new { Success = false, Message = "Failed to update user asset." });
});


app.MapGet("/api/get-user-assets/{userId}", async (int userId) =>
{
    List<UserSavedAsset> assets = await UsersRepository.GetUserAssetsAsync(userId);
    if (assets.Count < 100)
    {
        foreach (var asset in assets)
        {
            if (string.IsNullOrEmpty(asset.FileName.Trim()))
            {
                asset.FileName = $"Asset {asset.AssetId} by UserId {asset.OwnerUserID}";
            }
        }
    }
    var response = assets.Select(asset => new
    {
        assetId = asset.AssetId,
        saved_Asset = asset.Saved_Asset,
        fileName = asset.FileName,
        createdAt = asset.CreatedAt.ToString("yyyy-MM-dd HH:mm")
    });

    return Results.Ok(response);
});

app.MapGet("/api/get-users-by-query", async (HttpRequest request) =>
{
    //await Console.Out.WriteLineAsync("User search query:" + request.Query["query"].ToString());
    var query = request.Query["query"].ToString();
    List<UpdateUserDTO> users = await UsersRepository.GetUsersAsync(query);
    return Results.Ok(users);
});

app.MapDelete("/api/delete-user-asset/{userId}/{assetId}", async (int userId, int assetId) =>
{
    var asset = await UsersRepository.GetUserAssetByIdAsync(assetId);

    if (asset == null || asset.OwnerUserID != userId)
        return Results.BadRequest(new { Success = false, Message = "Asset not found or unauthorized." });

    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", asset.Saved_Asset.TrimStart('/'));
    if (System.IO.File.Exists(filePath))
    {
        System.IO.File.Delete(filePath);
    }

    bool deleted = await UsersRepository.DeleteUserAssetAsync(assetId);

    return deleted
        ? Results.Ok(new { Success = true })
        : Results.Ok(new { Success = false, Message = "Failed to delete asset." });
});

app.MapGet("/api/get-profile-picture/{userId}", async (HttpContext context, int userId) =>
{
    Console.WriteLine($"Received profile picture get request from userId: {userId}");
    User user = await UsersRepository.GetUserByIdAsync(userId);

    if (user == null || string.IsNullOrEmpty(user.profile_picture))
    {
        return Results.BadRequest(new { Success = false, Message = "User does not exist or has no profile picture uploaded!" });
    }

    string filePath = Path.Combine("wwwroot", user.profile_picture.TrimStart('/'));
    if (!System.IO.File.Exists(filePath))
    {
        return Results.NotFound(new { Success = false, Message = "Profile picture file not found!" });
    }

    return Results.Ok(new { Success = true, FilePath = user.profile_picture });

});

app.MapGet("/api/get-background-picture/{userId}", async (HttpContext context, int userId) =>
{
    Console.WriteLine($"Received background picture get request from userId: {userId}");
    User user = await UsersRepository.GetUserByIdAsync(userId);

    if (user == null || string.IsNullOrEmpty(user.profile_background))
    {
        return Results.BadRequest(new { Success = false, Message = "User does not exist or has no background picture uploaded!" });
    }

    string filePath = Path.Combine("wwwroot", user.profile_background.TrimStart('/'));
    if (!System.IO.File.Exists(filePath))
    {
        return Results.NotFound(new { Success = false, Message = "Background picture file not found!" });
    }

    return Results.Ok(new { Success = true, FilePath = user.profile_background });

});

static string? ValidateJwt(HttpContext context, string jwtKey)
{
    var jwtCookie = context.Request.Cookies["jwt"];
    Console.WriteLine($"Received Token: {jwtCookie}");

    if (string.IsNullOrEmpty(jwtCookie))
    {
        Console.WriteLine("JWT cookie is missing");
        return null;
    }

    try
    {
        var tokenHandler = new JwtSecurityTokenHandler();
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

        var userIdFromToken = jwtToken.Claims.FirstOrDefault(x => x.Type == "userId")?.Value;

        if (string.IsNullOrEmpty(userIdFromToken))
        {
            Console.WriteLine("No userId claim found.");
            return null;
        }

        return userIdFromToken;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Token validation failed: {ex.Message}");
        return null;
    }
}

app.Run();