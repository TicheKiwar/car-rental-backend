import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogController } from './application/Catalog.controller';
import { CatalogService } from './interface/Catalog.service';
import { Vehicles } from 'src/entity/Vehicles.entity';
import { Model } from 'src/entity/Model.entity';
import { Brand } from 'src/entity/Brand.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicles,Model,Brand]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class catalogModule {}