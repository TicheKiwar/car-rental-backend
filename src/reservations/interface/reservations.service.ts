import { Injectable } from '@nestjs/common';
import { ReservationRepository } from '../domain/reservations.repository';
import { Reservations } from 'src/entity/Reservations.entity';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { UpdateReservationDto } from '../domain/dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from 'src/entity/Clients.entity';
import { Vehicles } from 'src/entity/Vehicles.entity';
import { Rentals } from 'src/entity/Rentals.entity';

@Injectable()
export class ReservationsService implements ReservationRepository {
  constructor(
    @InjectRepository(Reservations)
    private readonly reservationRepository: Repository<Reservations>,
    @InjectRepository(Clients)
    private readonly clientRepository: Repository<Clients>,
    @InjectRepository(Vehicles)
    private readonly vehicleRepository: Repository<Vehicles>,
    @InjectRepository(Rentals)
    private readonly rentalRepository: Repository<Rentals>
  ) { }

  async getAll() {
    return await this.reservationRepository.find({
      relations: ['client', 'vehicle', 'rentals'],
    });
  }
  async getAllByUser(userID: number) {
    const reservations = await this.reservationRepository
      .createQueryBuilder('reservation')
      .select([
        'reservation.reservationId',
        'reservation.reservationDate',
        'reservation.reservationDays',
        'reservation.totalCost',
        'vehicle.vehicleId',
        'vehicle.type',
        'vehicle.image',
        'vehicle.dailyRate',
        'rental.rentalId',
        'rental.status',
        'rental.totalDays',
        'rental.totalCost',
        'model.modelName',
        'brand.brandName', // Asegúrate de que estos campos existan en la entidad model
      ])
      .leftJoin('reservation.client', 'client')  // Relaciona con la entidad "client"
      .leftJoin('reservation.vehicle', 'vehicle')  // Relaciona con la entidad "vehicle"
      .leftJoin('vehicle.model', 'model')  // Relaciona con la entidad "model" a través de vehicle
      .leftJoin('model.brand', 'brand')  // Relaciona con la entidad "model" a través de vehicle
      .leftJoin('reservation.rentals', 'rental')  // Relaciona con la entidad "rentals"
      .where('client.userId = :userId', { userId: userID })  // Filtra por el userId
      .getMany();

    return reservations;

  }

  // Crear una nueva reserva
  async createReservation(userID: number, createReservationDto: CreateReservationDto): Promise<boolean> {
    try {
      const client = await this.clientRepository.findOneBy({ userId: userID });
      const newReservation = this.reservationRepository.create({
        reservationDate: createReservationDto.reservationDate,
        reservationDays: createReservationDto.reservationDays,
        totalCost: createReservationDto.totalCost,
        client: { clientId: client.clientId }, // Relación con cliente
        vehicle: { vehicleId: createReservationDto.vehicleId }, // Relación con vehículo
      });

      await this.reservationRepository.save(newReservation);
      const vehicle = await this.vehicleRepository.findOne({ where: { vehicleId: createReservationDto.vehicleId, status: "Disponible" }, });
      if (vehicle) {
        vehicle.status = "No Disponible";
        await this.vehicleRepository.save(vehicle);
      }
      return true;
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      return false;
    }
  }

  // Eliminar una reserva por ID
  async deleteReservation(reservationId: number): Promise<boolean> {
    try {
      const verifyReservation = await this.verifyReservation(reservationId);
      console.log("verifi", verifyReservation);
      if  (verifyReservation.length!==0) {
        console .log("No se puede eliminar la reserva, ya que tiene rentas asociadas");
       throw new Error("No se puede eliminar la reserva, ya que tiene rentas asociadas");
      }
      const reservation = await this.reservationRepository.findOne({ where: { reservationId: reservationId },relations:["vehicle"] });
      console.log("reser",reservation);
      if (!reservation || !reservation.vehicle) {
        throw new Error("No se puede eliminar la reserva, ya que no tiene rentas asociadas");
    }
      const vehicle = reservation.vehicle;
      console.log(vehicle);
      vehicle.status = "Disponible";
      await this.vehicleRepository.save(vehicle);
      
      const result = await this.reservationRepository.delete(reservationId);
      return result.affected > 0;
    } catch (error) {
      return error;
    }
  }

  // Editar una reserva existente
  async editReservation(reservationId: number, updateReservationDto: UpdateReservationDto): Promise<boolean> {
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

      await this.reservationRepository.save(existingReservation);
      return true;
    } catch (error) {
      console.error('Error al editar la reserva:', error);
      return false;
    }
  }

  async verifyReservation(reservationId: number) {
    try {
      const reservation = await this.rentalRepository.findOne({
        where: {
          reservation: {
            reservationId: reservationId
          }
        }
      });

      if (!reservation) {
        return []; // Devolver array vacío si no hay reserva
      }
      return [reservation]; // Devolver array con la reserva si existe
    } catch (error) {
      console.error('Error al verificar la reserva:', error);
      return []; // Devolver array vacío en caso de error
    }
}

}
