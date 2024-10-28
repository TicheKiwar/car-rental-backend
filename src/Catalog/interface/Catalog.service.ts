import { Injectable } from '@nestjs/common';
import { ICatalogRepository } from '../domain/Catalog.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculos } from 'src/entity/Vehiculos.entity';
import { Repository } from 'typeorm';
import { Modelo } from 'src/entity/Modelo.entity';
import { Marca } from 'src/entity/Marca.entity';
import { fork } from 'child_process';

@Injectable()
export class CatalogService implements ICatalogRepository {

  constructor(
    @InjectRepository(
      Vehiculos,
    )
    private readonly catalogRepository: Repository<Vehiculos>,
    @InjectRepository(
      Modelo,
    )
    private readonly modelRepository: Repository<Modelo>,
    @InjectRepository(
      Marca,
    )
    private readonly brandRepository: Repository<Marca>
  ) { }
  async getModel() {
    const model = await this.modelRepository.find()
    return model
  }
  async getBrand() {
    const brand = await this.brandRepository.find()
    return brand
  }

  async getCatalog() {
    const catalog = await this.catalogRepository.find({
      select: {
        idVehiculo: true,
        matricula: true,
        tipo: true,
        estado: true,
        numeroPuertas: true,
        idModelo: {
          idModelo :true,
          nombre: true,
          idMarca: {
            idMarca: true,
            nombre:true
          }
        }
      },
      relations: ["idModelo","idModelo.idMarca"],
    });
    return catalog
  }

  async findByVehicle(idVehicle: number) {
    const vehicle = await this.catalogRepository.findOne({where:{
      idVehiculo:idVehicle
    }})
    return vehicle
  }
  async findByModel(idModelo: number) {
    const vehicle = await this.modelRepository.findOne({where:{idModelo:idModelo},
    relations:["vehiculos"]
    })
    return vehicle
  }
  async findByBrand(idBrand: number) {
    const brand = await this.brandRepository.findOne({where:{idMarca:idBrand},
      })
      return brand
  }

}
