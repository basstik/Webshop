// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using System;
using System.Collections.Generic;
using DAL.Models.Interfaces;

namespace DAL.Models
{
    public class Product : IBaseEntity, IAuditableEntity
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public String CreatedBy { get; set; }
        public string Email { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
