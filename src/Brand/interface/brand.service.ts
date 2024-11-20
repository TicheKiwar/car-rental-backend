import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from 'src/entity/Brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async getAllBrands() {
    return await this.brandRepository.find({ where: { deletedAt: null } });
  }

  async getBrandById(id: number) {
    return await this.brandRepository.findOne({ where: { brandId: id, deletedAt: null } });
  }

  async createBrand(brandData: any) {
    const newBrand = this.brandRepository.create(brandData);
    return await this.brandRepository.save(newBrand);
  }

  async updateBrand(id: number, brandData: any) {
    await this.brandRepository.update(id, brandData);
    return await this.getBrandById(id);
  }

  async deleteBrand(id: number) {
    return await this.brandRepository.softDelete(id);
  }
}
