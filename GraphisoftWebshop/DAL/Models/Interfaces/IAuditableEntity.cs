// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using System;

namespace DAL.Models
{
    internal interface IAuditableEntity
    {
        String CreatedBy { get; set; }
        DateTime CreatedDate { get; set; }
    }
}