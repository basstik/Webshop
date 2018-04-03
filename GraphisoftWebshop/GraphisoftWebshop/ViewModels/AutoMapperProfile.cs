// ====================================================

namespace Quick_Application3.ViewModels
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<DAL.Models.Product, GraphisoftWebshop.ViewModels.ProductViewModel>();

            CreateMap<GraphisoftWebshop.ViewModels.ProductViewModel, DAL.Models.Product>();

        }
    }
}
