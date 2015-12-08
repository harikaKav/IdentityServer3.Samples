﻿using System.Collections.Generic;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IdentityModel.Tokens.Jwt;

namespace Api
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddCors(options =>
                                    options.AddPolicy("AllowAngularApp", p => p.WithOrigins("http://localhost:2870")
                                                                        .AllowAnyMethod()
                                                                        .AllowAnyHeader()));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseIISPlatformHandler();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap = new Dictionary<string, string>();

            app.UseJwtBearerAuthentication(options =>
            {
                options.Authority = "http://localhost:18942";
                options.RequireHttpsMetadata = false;

                options.Audience = "http://localhost:18942/resources";
                options.AutomaticAuthenticate = true;
            });

            app.UseMiddleware<RequiredScopesMiddleware>(new List<string> { "api1" });

            app.UseCors("AllowAngularApp");
            app.UseMvc();
            
        }

        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}