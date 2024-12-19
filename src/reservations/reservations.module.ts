import { Module } from '@nestjs/common';
import { ReservationsController } from './application/reservations.controller';
import { ReservationsService } from './interface/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from 'src/entity/Reservations.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/Auth/auth.module';
import { catalogModule } from 'src/Catalog/Catalog.module';
import { Clients } from 'src/entity/Clients.entity';
import { VehiclesModule } from 'src/Vehicle/vehicle.module';
import { Vehicles } from 'src/entity/Vehicles.entity';
import { Rentals } from 'src/entity/Rentals.entity';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([Reservations,Clients,Vehicles,Rentals])
  ,UserModule,
  catalogModule,
  VehiclesModule
],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports:[ReservationsService]
})
export class ReservationsModule {}
