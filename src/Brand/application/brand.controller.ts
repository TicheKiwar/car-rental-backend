import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { BrandService } from '../interface/brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getAllBrands() {
    return await this.brandService.getAllBrands();
  }

  @Get(':id')
  async getBrandById(@Param('id') id: string) {
    return await this.brandService.getBrandById(+id);
  }

  @Post()
  async createBrand(@Body() brandData: any) {
    return await this.brandService.createBrand(brandData);
  }

  @Put(':id')
  async updateBrand(@Param('id') id: string, @Body() brandData: any) {
    return await this.brandService.updateBrand(+id, brandData);
  }

  @Delete(':id')
  async deleteBrand(@Param('id') id: string) {
    return await this.brandService.deleteBrand(+id);
  }
}
