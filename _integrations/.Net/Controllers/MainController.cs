using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Net.Helpers;
using Net.Models;

namespace Net.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MainController : Controller
    {
        private readonly Logs _logs;
        public MainController(Logs logs)
        {
            this._logs = logs;
        }

        [HttpPost("info")]
        public IActionResult registerInfo()
        {
            MethodBase method = MethodBase.GetCurrentMethod();
            _logs.RegisterLog(new Log()
            {
                message = "register info in",
                type = "asp",
                info = new
                {
                    method = $"{method.ReflectedType.Name}/{method.Name}"
                }

            }, Constants.Logs.Info);
            return Ok();
        }
        [HttpPost("error")]
        public IActionResult registerError()
        {
            throw new Exception("error .net project");

        }
        
        [HttpPost("warning")]
        public IActionResult registerWarning()
        {
            MethodBase method = MethodBase.GetCurrentMethod();
            _logs.RegisterLog(new Log()
            {
                message = "register warning in",
                type = "asp",
                info = new
                {
                    method = $"{method.ReflectedType.Name}/{method.Name}"
                }

            }, Constants.Logs.Info);
            return Ok();
        }
    }
}