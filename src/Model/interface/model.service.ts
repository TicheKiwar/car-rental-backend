import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from '../../entity/Model.entity';
import { Brand } from '../../entity/Brand.entity';
import { IModelRepository } from '../domain/model.repository';

@Injectable()
export class ModelService implements IModelRepository {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async getModels() {
    const queryBuilder = this.modelRepository.createQueryBuilder("model");
    const models = await queryBuilder
      .leftJoinAndSelect("model.brand", "brand") // Relacionar la marca
      .where("model.deletedAt IS NULL") // Asegúrate de que solo devuelvas modelos no eliminados
      .getMany();
  
    return models;
  }
  

  async createModel(createModelDto: any) {
    const { brandId, modelName, year } = createModelDto;
    const brand = await this.brandRepository.findOne({ where: { brandId, deletedAt: null } });
    if (!brand) throw new NotFoundException('Brand not found');

    const model = this.modelRepository.create({ modelName, year, brand });
    return await this.modelRepository.save(model);
  }

  async updateModel(id: number, updateModelDto: any) {
    const { brandId, modelName, year } = updateModelDto;

    const model = await this.modelRepository.findOne({
      where: { modelId: id, deletedAt: null },
      relations: ['brand'],
    });

    if (!model) throw new NotFoundException('Model not found');

    if (brandId) {
      const brand = await this.brandRepository.findOne({ where: { brandId, deletedAt: null } });
      if (!brand) throw new NotFoundException('Brand not found');
      model.brand = brand;
    }

    if (modelName) model.modelName = modelName;
    if (year !== undefined) model.year = year;

    return await this.modelRepository.save(model);
  }

  async deleteModel(id: number) {
    const model = await this.modelRepository.findOne({ where: { modelId: id, deletedAt: null } });
    if (!model) throw new NotFoundException('Model not found');

    model.deletedAt = new Date();
    return await this.modelRepository.save(model);
  }
}
