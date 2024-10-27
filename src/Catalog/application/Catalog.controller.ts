import { Controller, Get, Param } from '@nestjs/common';
import { CatalogService } from '../interface/Catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  async getCatalog() {
    return await this.catalogService.getCatalog();
  }
  @Get('model')
  async getModel() {
    return await this.catalogService.getModel();
  }
  @Get('brand')
  async getBrand() {
    return await this.catalogService.getBrand();
  }
  @Get(':idVehicle/vehicle')
  async findByVehicle(
    @Param('idVehicle') idVehicle: string
  ) {
    return await this.catalogService.findByVehicle(+idVehicle);
  }
  @Get(':idModel/model')
  async findByModel(@Param('idModel') idModel: string) {
    return await this.catalogService.findByModel(+idModel);
  }

  @Get(':idBrand/brand')
  async findByMarca(@Param('idBrand') idBrand: string) {
    return await this.catalogService.findByBrand(+idBrand);
  }

}
