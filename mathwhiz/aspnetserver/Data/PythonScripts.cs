using aspnetserver.Data;
using aspnetserver.Data.Structures;
using System.Diagnostics;
using System.Globalization;

namespace mathwhiz.Data
{
    internal static class PythonScripts
    {
        internal static async Task<(string output, string error,string fileName)> RunPythonScript(
            ManimRequest manimRequest, string scriptPath,
            string pythonScriptName,ManimRequest.RequestType type,string fileExtension, string? pythonClassName = null)
        {
            if (manimRequest == null || scriptPath == null)
            {
                throw new Exception("Null function received or the script path was not specified, the request has failed!");
            }

            string fileName = manimRequest.GenerateUniqueFileName(type);
            string JsonInput = Path.Combine(ManimRequest.RequestJsonFilePath, $"{type}_{manimRequest.RequestHash}.json");
            string arguments = $"/c cd /d {scriptPath} && manim -o {fileName} --json-file {JsonInput} {pythonScriptName} ";

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

                    return (output, error,$"{fileName}.{fileExtension}");
                }
            }
            catch (Exception ex)
            {
                return ($"", $"Error running script: {ex.Message}",$"");
            }
        }

    }
}
