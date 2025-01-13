import { Module } from '@nestjs/common';
import { MaintenanceService } from './interface/maintenance.service';
import { MaintenanceController } from './application/maintenance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleStatus } from 'src/entity/VehicleStatus.entity';
import { VehicleMaintenance } from 'src/entity/VehicleMaintenance';
import { Vehicles } from 'src/entity/Vehicles.entity';
import { VehiclesService } from 'src/Vehicle/interface/vehicle.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleStatus, VehicleMaintenance, Vehicles])],
  providers: [MaintenanceService],
  controllers: [MaintenanceController],
  exports: [MaintenanceService]
})
export class MaintenanceModule { }
