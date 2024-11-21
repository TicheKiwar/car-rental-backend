import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelController } from './application/model.controller';
import { ModelService } from './interface/model.service';
import { Model } from '../entity/Model.entity';
import { Brand } from '../entity/Brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Model, Brand])],
  controllers: [ModelController],
  providers: [ModelService],
  exports: [ModelService],
})
export class ModelModule {}
