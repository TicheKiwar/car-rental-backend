import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { Vehiculos } from 'src/entity/Vehiculos.entity';
import { CatalogController } from './application/Catalog.controller';
import { CatalogService } from './interface/Catalog.service';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Vehiculos]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class catalogModule {}