using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UserFollowing
    {
        public required string ObserverId { get; set; }
        public User Observer { get; set; } = null!;

        public required string TargetId { get; set; }
        public User Target { get; set; } = null!;
    }
}
