import { Injectable } from '@nestjs/common';
import { ReservationRepository } from '../domain/reservations.repository';
import { Reservations } from 'src/entity/Reservations.entity';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { UpdateReservationDto } from '../domain/dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService implements ReservationRepository {
  constructor(
    @InjectRepository(Reservations)
    private readonly reservationRepository: Repository<Reservations>,
  ) {}

  async getAll() {
    return await this.reservationRepository.find({
      relations: ['client', 'vehicle', 'employee', 'rentals'],
    });
  }
  async getAllByUser(userID: number){

    return await this.reservationRepository.find({
      where: { client: { userId: userID } },
      relations: ['client', 'vehicle', 'rentals'],
    });
  }

  // Crear una nueva reserva
  async createReservation(createReservationDto: CreateReservationDto): Promise<boolean> {
    try {
      const newReservation = this.reservationRepository.create({
        reservationDate: createReservationDto.reservationDate,
        reservationDays: createReservationDto.reservationDays,
        totalCost: createReservationDto.totalCost,
        client: { clientId: createReservationDto.clientId }, // Relación con cliente
        vehicle: { vehicleId: createReservationDto.vehicleId }, // Relación con vehículo
      });

      await this.reservationRepository.save(newReservation);
      return true;
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      return false;
    }
  }

  // Eliminar una reserva por ID
  async deleteReservation(reservationId: number): Promise<boolean> {
    try {
      const result = await this.reservationRepository.delete(reservationId);
      return result.affected > 0;
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      return false;
    }
  }

  // Editar una reserva existente
  async editReservation(reservationId:number,updateReservationDto: UpdateReservationDto): Promise<boolean> {
    try {
      const existingReservation = await this.reservationRepository.findOne({
        where: { reservationId: reservationId },
      });

      if (!existingReservation) {
        console.error('Reserva no encontrada');
        return false;
      }

      // Actualizar campos
      existingReservation.reservationDate = updateReservationDto.reservationDate;
      existingReservation.reservationDays = updateReservationDto.reservationDays;
      existingReservation.totalCost = updateReservationDto.totalCost;

      // Relaciones opcionales
      if (updateReservationDto.clientId) {
        existingReservation.client = { clientId: updateReservationDto.clientId } as any;
      }

      if (updateReservationDto.vehicleId) {
        existingReservation.vehicle = { vehicleId: updateReservationDto.vehicleId } as any;
      }

      await this.reservationRepository.save(existingReservation);
      return true;
    } catch (error) {
      console.error('Error al editar la reserva:', error);
      return false;
    }
  }
}
