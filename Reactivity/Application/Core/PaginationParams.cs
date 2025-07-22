using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{

    public class PaginationParams<TCursor>
    {
        private const int MaxPageSize = 3;

        public TCursor? Cusor { get; set; }

        private int _pageSize = 3;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }



    }
}
