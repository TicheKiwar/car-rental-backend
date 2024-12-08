import { Module } from '@nestjs/common';
import { ReservationsController } from './application/reservations.controller';
import { ReservationsService } from './interface/reservations.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
