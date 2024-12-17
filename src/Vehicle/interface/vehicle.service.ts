import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicles } from '../../entity/Vehicles.entity';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { Model } from '../../entity/Model.entity';
import { IVehiclesRepository } from '../domain/vehicle.repository';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';

@Injectable()
export class VehiclesService implements IVehiclesRepository {
  constructor(
    @InjectRepository(Vehicles)
    private readonly vehiclesRepository: Repository<Vehicles>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) { }

  async findAll() {
    const queryBuilder = this.vehiclesRepository.createQueryBuilder("vehicle");
    const vehicles = await queryBuilder
      .leftJoinAndSelect("vehicle.model", "model") // Relacionar el modelo
      .leftJoinAndSelect("model.brand", "brand")  // Relacionar la marca del modelo
      .where("vehicle.deletedAt IS NULL")        // Filtrar vehículos no eliminados
      .orderBy("vehicle.vehicleId")
      .getMany();

    return vehicles;
  }

  async findOne(id: number) {
    return await this.vehiclesRepository.findOne({
      where: { vehicleId: id, deletedAt: null },
      relations: ['model', 'model.brand'],
    });
  }

  async create(createVehicleDto: CreateVehicleDto) {
    const model = await this.modelRepository.findOne({
      where: { modelId: createVehicleDto.modelId, deletedAt: null },
    });

    if (!model) {
      throw new Error('Model not found');
    }

    const vehicle = this.vehiclesRepository.create({
      ...createVehicleDto,
      status: "Disponible",
      model,
    });

    return await this.vehiclesRepository.save(vehicle);
  }



  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.vehiclesRepository.findOne({
      where: { vehicleId: id, deletedAt: null },
    });

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    if (updateVehicleDto.modelId) {
      const model = await this.modelRepository.findOne({
        where: { modelId: updateVehicleDto.modelId, deletedAt: null },
      });

      if (!model) {
        throw new Error('Model not found');
      }
      vehicle.model = model;
    }

    Object.assign(vehicle, updateVehicleDto);
    return await this.vehiclesRepository.save(vehicle);
  }

  async remove(id: number) {
    const vehicle = await this.vehiclesRepository.findOne({
      where: { vehicleId: id, deletedAt: null },
    });

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    vehicle.deletedAt = new Date();
    return await this.vehiclesRepository.save(vehicle);
  }
}
