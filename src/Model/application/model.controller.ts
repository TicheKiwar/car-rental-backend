import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from 'src/entity/Model.entity';

@Injectable()
export class ModelController {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async getAllModels() {
    return await this.modelRepository.find({ where: { deletedAt: null } });
  }

  async getModelById(id: number) {
    return await this.modelRepository.findOne({ where: { modelId: id, deletedAt: null } });
  }

  async createModel(modelData: any) {
    const newModel = this.modelRepository.create(modelData);
    return await this.modelRepository.save(newModel);
  }

  async updateModel(id: number, modelData: any) {
    await this.modelRepository.update(id, modelData);
    return await this.getModelById(id);
  }

  async deleteModel(id: number) {
    return await this.modelRepository.softDelete(id);
  }
}
