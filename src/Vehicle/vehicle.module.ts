import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesController } from './application/vehicle.controller';
import { VehiclesService } from './interface/vehicle.service';
import { Vehicles } from '../entity/Vehicles.entity';
import { Model } from '../entity/Model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicles, Model])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
