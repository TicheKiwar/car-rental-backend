import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ModelService } from '../interface/model.service';

@Controller('model') // Verifica que este decorador esté presente
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  async getAllModels() {
    return await this.modelService.getAllModels();
  }

  @Get(':id')
  async getModelById(@Param('id') id: string) {
    return await this.modelService.getModelById(+id);
  }

  @Post()
  async createModel(@Body() modelData: any) {
    return await this.modelService.createModel(modelData);
  }

  @Put(':id')
  async updateModel(@Param('id') id: string, @Body() modelData: any) {
    return await this.modelService.updateModel(+id, modelData);
  }

  @Delete(':id')
  async deleteModel(@Param('id') id: string) {
    return await this.modelService.deleteModel(+id);
  }
}
