import { Module } from '@nestjs/common';
import { ReservationsController } from './application/reservations.controller';
import { ReservationsService } from './interface/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from 'src/entity/Reservations.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Reservations])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
