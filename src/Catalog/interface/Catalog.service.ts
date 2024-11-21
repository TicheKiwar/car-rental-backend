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
  ) {}

  async getModel() {
    const model = await this.modelRepository.find({ where: { deleteDate: null } });
    return model;
  }

  async getBrand() {
    const brand = await this.brandRepository.find({ where: { deleteDate: null } });
    return brand;
  }

  async getCatalog() {
    const catalog = await this.catalogRepository.find({
      select: {
        vehicleId: true,
        licensePlate: true,
        type: true,
        status: true,
        color: true,
        doorCount: true,
        model: {
          modelId: true,
          modelName: true,
          brand: {
            brandId: true,
            brandName: true,
          }
        }
      },
      where: { deleteDate: null },
      relations: ["model", "model.brand"],
    });
    return catalog;
  }

  async findByVehicle(idVehicle: number) {
    const vehicle = await this.catalogRepository.findOne({
      where: {
        vehicleId: idVehicle,
        deleteDate: null,
      },
      relations: ["model", "model.brand"]
    });
    return vehicle;
  }

  async findByModel(idModel: number) {
    const model = await this.modelRepository.findOne({
      where: { modelId: idModel, deleteDate: null },
      relations: ["vehicles"]
    });
    return model;
  }

  async findByBrand(idBrand: number) {
    const brand = await this.brandRepository.findOne({
      where: { brandId: idBrand, deleteDate: null },
    });
    return brand;
  }
}
