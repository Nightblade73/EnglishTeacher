using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Services;
using System.Web.Services;

namespace EnglishTeacher.Controllers
{

    //   [EnableCors(origins: "http://localhost:54049", headers: "*", methods: "*")]
   // [EnableCors(origins: "http://localhost:54049", headers: "*", methods: "*")]
 //   idmkbfegdginpeohickgddcmannkbdjk
    
    public class ValuesController : ApiController
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
        [HttpOptions]
        public void Options()
        {

        }
    }
}
