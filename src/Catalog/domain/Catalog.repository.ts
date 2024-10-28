
export interface ICatalogRepository {

    getCatalog();
    findByVehicle(idVehicle: number)
    findByModel(idModelo: number)
    findByBrand(idBrand: number)
    getModel()
    getBrand()
}
