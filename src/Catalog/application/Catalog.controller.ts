import { Controller, Get } from '@nestjs/common';
import { CatalogService } from '../interface/Catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  async getCatalog() {
    return await this.catalogService.getCatalog();
  }
}
