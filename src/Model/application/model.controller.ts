import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { ModelService } from '../interface/model.service';
import { CreateModelDto } from '../dto/CreateModel.dto';
import { UpdateModelDto } from '../dto/UpdateModel.dto';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  async getModels() {
    return await this.modelService.getModels();
  }

  @Post()
  async createModel(@Body() createModelDto: CreateModelDto) {
    return await this.modelService.createModel(createModelDto);
  }

  @Put(':id')
  async updateModel(@Param('id') id: number, @Body() updateModelDto: UpdateModelDto) {
    return await this.modelService.updateModel(id, updateModelDto);
  }

  @Delete(':id')
  async deleteModel(@Param('id') id: number) {
    return await this.modelService.deleteModel(id);
  }
}
