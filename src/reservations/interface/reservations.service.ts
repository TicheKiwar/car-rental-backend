import { Injectable } from '@nestjs/common';
import { ReservationRepository } from '../domain/reservations.repository';
import { Reservations } from 'src/entity/Reservations.entity';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { UpdateReservationDto } from '../domain/dto/update-reservation.dto';

@Injectable()
export class ReservationsService implements ReservationRepository{
  async getAll(userID: number): Promise<[Reservations]> {
    throw new Error('Method not implemented.');
  }
  async createReservation(createreservationDto: CreateReservationDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async deleteReservation(reservationId: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async editReservation(updateReservationDto: UpdateReservationDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}
