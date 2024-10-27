import { Injectable } from '@nestjs/common';
import { ICatalogRepository } from '../domain/Catalog.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculos } from 'src/entity/Vehiculos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatalogService implements ICatalogRepository{

  constructor(
    @InjectRepository(
      Vehiculos
    )
    private readonly catalogRepository:Repository<Vehiculos>
) {}
  getModel() {
    throw new Error('Method not implemented.');
  }
  getBrand() {
    throw new Error('Method not implemented.');
  }

  async getCatalog() {
    const catalog = await this.catalogRepository.find({
      select: {
        idVehiculo: true,
        matricula: true,
        tipo: true,
        estado:true,
        idModelo: {
          nombre: true,  // Selecciona solo el campo "nombre" de la relación idModelo
        }
      },
    relations: ["idModelo"], 
  });
    return catalog
  }

  async findByVehicle(idVehicle: number) {
    throw new Error('Method not implemented.');
  }
  async findByModel(idModelo: number) {
    throw new Error('Method not implemented.');
  }
  async findByBrand(idBrand: number) {
    throw new Error('Method not implemented.');
  }

}
