using System.Linq;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Cors;

namespace Api.Controllers
{
    [Route("identity")]
    [Authorize]
    public class IdentityController : Controller
    {
        [HttpGet]
        [EnableCors("AllowAngularApp")]
        public IActionResult Get()
        {
            return Json(from c in User.Claims
                        select new { c.Type, c.Value });
        }
    }
}