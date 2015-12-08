using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.DependencyInjection;
using IdentityServer3.Core.Configuration;
using IdentityServer.Configuration;
using System.Security.Cryptography.X509Certificates;
using IdentityServer3.Core.Services.Default;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.Extensions.Logging;
using Serilog;

namespace IdentityServer
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDataProtection();
        }

        public void Configure(IApplicationBuilder app, IApplicationEnvironment env, ILoggerFactory loggerFactory)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .WriteTo.LiterateConsole()
                .CreateLogger();

            loggerFactory.AddConsole();
            loggerFactory.AddDebug();

            app.UseIISPlatformHandler();
            app.UseStaticFiles();
            

            var certFile = env.ApplicationBasePath + "\\idsrv3test.pfx";

            var idsrvOptions = new IdentityServerOptions
            {
                Factory = new IdentityServerServiceFactory()
                                .UseInMemoryUsers(Users.Get())
                                .UseInMemoryClients(Clients.Get())
                                .UseInMemoryScopes(Scopes.Get()),

                SigningCertificate = new X509Certificate2(certFile, "idsrv3test"),
                RequireSsl = false
            };

            var viewOptions = new DefaultViewServiceOptions();
            viewOptions.Stylesheets.Add("/css/Site.css");
            viewOptions.CacheViews = false;

            var templatePath = System.IO.Path.Combine(env.ApplicationBasePath, "templates");
            viewOptions.ViewLoader = new Registration<IViewLoader>(new FileSystemWithEmbeddedFallbackViewLoader(templatePath));
            idsrvOptions.Factory.ConfigureDefaultViewService(viewOptions);
            

            app.UseIdentityServer(idsrvOptions);
            
           
        }

        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}