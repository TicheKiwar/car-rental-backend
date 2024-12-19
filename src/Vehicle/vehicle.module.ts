import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesController } from './application/vehicle.controller';
import { VehiclesService } from './interface/vehicle.service';
import { Vehicles } from '../entity/Vehicles.entity';
import { Model } from '../entity/Model.entity';
import { UploadController } from './application/upload.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicles, Model])],
  controllers: [VehiclesController, UploadController],
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
