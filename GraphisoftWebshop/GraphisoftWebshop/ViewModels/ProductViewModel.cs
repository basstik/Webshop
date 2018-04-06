using System;

namespace GraphisoftWebshop.ViewModels
{
    public class ProductViewModel
    {
        public int? Id { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public String CreatedBy { get; set; }
        public string Email { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
