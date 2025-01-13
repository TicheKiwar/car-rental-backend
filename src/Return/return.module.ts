import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Returns } from '../entity/Returns.entity';
import { Rentals } from '../entity/Rentals.entity';
import { Employees } from '../entity/Employees.entity';
import { ReturnsController } from './aplication/return.controller';
import { Vehicles } from '../entity/Vehicles.entity';
import { ReturnsService } from './interface/return.service';
import { Payments } from 'src/entity/Payments.entity';
import { VehicleStatus } from 'src/entity/VehicleStatus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Returns, Rentals, Employees, Vehicles, VehicleStatus])],
  controllers: [ReturnsController],
  providers: [ReturnsService],
})
export class ReturnsModule {}
