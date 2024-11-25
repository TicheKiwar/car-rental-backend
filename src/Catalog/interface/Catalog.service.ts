import { Injectable } from '@nestjs/common';
import { ICatalogRepository } from '../domain/Catalog.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicles } from 'src/entity/Vehicles.entity';
import { Model } from 'src/entity/Model.entity';
import { Brand } from 'src/entity/Brand.entity';

@Injectable()
export class CatalogService implements ICatalogRepository {
  constructor(
    @InjectRepository(Vehicles)
    private readonly catalogRepository: Repository<Vehicles>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>
  ) { }

  async getModel() {
    const model = await this.modelRepository.find({ where: { deletedAt: null } });
    return model;
  }

  async getBrand() {
    const brand = await this.brandRepository.find({ where: { deletedAt: null } });
    return brand;
  }

  async getCatalog() {
    const catalog = await this.catalogRepository
      .createQueryBuilder('catalog')
      .select([
        'catalog.vehicleId',
        'catalog.licensePlate',
        'catalog.type',
        'catalog.status',
        'catalog.color',
        'catalog.doorCount',
        'catalog.image',
        'model.modelId',
        'model.modelName',
        'brand.brandId',
        'brand.brandName',
      ])
      .leftJoin('catalog.model', 'model') // Relaciona con la entidad "model"
      .leftJoin('model.brand', 'brand') // Relaciona con la entidad "brand" desde "model"
      .where('catalog.deletedAt IS NULL') // Filtra por registros no eliminados
      .getMany(); // Ejecuta la consulta y obtiene los resultados

    return catalog;
  }


  async findByVehicle(idVehicle: number) {
    const vehicle = await this.catalogRepository.findOne({
      where: {
        vehicleId: idVehicle,
        deletedAt: null,
      },
      relations: ["model", "model.brand"]
    });
    return vehicle;
  }

  async findByModel(idModel: number) {
    const model = await this.modelRepository.findOne({
      where: { modelId: idModel, deletedAt: null },
      relations: ["vehicles"]
    });
    return model;
  }

  async findByBrand(idBrand: number) {
    const brand = await this.brandRepository.findOne({
      where: { brandId: idBrand, deletedAt: null },
    });
    return brand;
  }
}
