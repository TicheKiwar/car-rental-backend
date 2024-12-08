import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { UpdateReservationDto } from '../domain/dto/update-reservation.dto';
import { ReservationsService } from '../interface/reservations.service';
import { Reservations } from 'src/entity/Reservations.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  @Get()
  async getAll(userID: number): Promise<[Reservations]> {
    throw new Error('Method not implemented.');
  }
  @Post("create")
  async createReservation(createreservationDto: CreateReservationDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  @Delete("delete")
  async deleteReservation(reservationId: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  @Patch("edit")
  async editReservation(updateReservationDto: UpdateReservationDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
