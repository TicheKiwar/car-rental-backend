export interface IBrandRepository {
    getAllBrands();
    getBrandById(id: number);
    createBrand(brandData: any);
    updateBrand(id: number, brandData: any);
    deleteBrand(id: number);
  }
  