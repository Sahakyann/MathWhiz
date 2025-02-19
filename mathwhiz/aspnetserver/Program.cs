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
            .WithOrigins("http://localhost:3000", "https://localhost:7299", "https://appname.azurestaticapps.net");
        });

});

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
    /*var scriptPath = "G:\\Capstone\\manim_animations\\Calculus\\limit_visualizer.py";
    var outputDirectory = "G:\\Capstone\\manim_animations\\Calculus\\media\\images\\limit_visualizer";
    var outputFile = Path.Combine(outputDirectory, "limitVisualizer.mp4");
    var tempInputFile = Path.Combine(outputDirectory, "temp.txt");*/

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

app.MapPost("/api/login", async (User userToCheck) => {
    var user = await UsersRepository.UserExistsAsync(userToCheck.display_name, userToCheck.password);

    if (user != null)
    {
        return Results.Ok(new { Success = true, displayName = user.display_name, userID = user.userID });
    }
    else
    {
        return Results.Ok(new { Success = false, Message = "Invalid credentials" });
    }
});

app.Run();