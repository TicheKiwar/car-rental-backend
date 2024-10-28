import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculos } from 'src/entity/Vehiculos.entity';
import { CatalogController } from './application/Catalog.controller';
import { CatalogService } from './interface/Catalog.service';
import { Modelo } from 'src/entity/Modelo.entity';
import { Marca } from 'src/entity/Marca.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehiculos,Modelo,Marca]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class catalogModule {}