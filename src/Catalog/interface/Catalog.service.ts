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
    const queryBuilder = this.catalogRepository.createQueryBuilder("vehicle");
    const vehicles = await queryBuilder
      .leftJoinAndSelect("vehicle.model", "model") // Relacionar el modelo
      .leftJoinAndSelect("model.brand", "brand")  // Relacionar la marca del modelo
      .where("vehicle.deleteDate IS NULL")        // Filtrar vehículos no eliminados
      .andWhere("vehicle.status = :status", { status: "Disponible" }) // Filtrar vehículos disponibles
      .orderBy("vehicle.vehicleId")
      .getMany();

    return vehicles;
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
