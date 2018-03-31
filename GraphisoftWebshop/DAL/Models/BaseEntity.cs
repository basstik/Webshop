// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using DAL.Models.Interfaces;

namespace DAL.Models
{
    public class BaseEntity : IBaseEntity
    {
        public int Id { get; set; }
    }
}
