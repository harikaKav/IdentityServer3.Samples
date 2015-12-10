using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using MvcAngularClient.ViewModels;

namespace MvcAngularClient.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Angular()
        {
            var token = User.FindFirst("access_token").Value;

            return View();
        }

        [AllowAnonymous]
        public async Task Signout()
        {
            await HttpContext.Authentication.SignOutAsync("Oidc");
            await HttpContext.Authentication.SignOutAsync("Cookies");
        }

        public async Task<AccessToken> GetAccessToken()
        {
            var token = User.FindFirst("access_token").Value;

            return await Task.FromResult(new AccessToken(token));
        }
    }
}
