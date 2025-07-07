using Microsoft.AspNet.Identity.EntityFramework;
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class User : IdentityUser
    {
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? ImageUrl { get; set; }
    }
}
