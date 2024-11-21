import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from 'src/entity/Brand.entity';
import { IBrandRepository } from '../domain/brand.repository';

@Injectable()
export class BrandService implements IBrandRepository{
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

async createBrand(brandData: { brandName: string }) {
  if (!brandData.brandName || brandData.brandName.trim() === "") {
    throw new Error("El nombre de la marca es obligatorio.");
  }

  // Creamos la nueva marca, asegurándonos de establecer deletedAt en null
  const newBrand = this.brandRepository.create({
    brandName: brandData.brandName,
    deletedAt: null, // Se asegura que deletedAt sea null
  });

  return await this.brandRepository.save(newBrand);
}


  async updateBrand(id: number, brandData: any) {
    await this.brandRepository.update(id, brandData);
    return await this.getBrandById(id);
  }

  // Método para eliminar una marca de forma lógica
  async deleteBrand(id: number) {
    const brand = await this.brandRepository.findOne({ where: { brandId: id } });

    if (brand) {
      brand.softDelete(); // Marcamos la marca como eliminada
      return this.brandRepository.save(brand); // Guardamos la marca actualizada
    }

    throw new Error('Brand not found');
  }
}
