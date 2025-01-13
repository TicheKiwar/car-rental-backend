import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rentals } from 'src/entity/Rentals.entity';
import { Repository } from 'typeorm';
import { CreateRentalDto } from '../domain/dto/create-rental.dto';
import { RentalRepository } from '../domain/rental.repository';
import { CreateRentalEmployee } from '../domain/dto/create-rentalEmployee.dto';
import { UpdateRentalDto } from '../domain/dto/update-rental.dto';
import { UpdateRentalEmployee } from '../domain/dto/update-rentalEmployee.dto';
import { Vehicles } from 'src/entity/Vehicles.entity';

@Injectable()
export class RentalService implements RentalRepository {
  private readonly editTimeLimitInHours = 5;
  constructor(
    @InjectRepository(Rentals)
    private readonly rentalRepository: Repository<Rentals>,
    @InjectRepository(Vehicles)
    private readonly vehicleRepository: Repository<Vehicles>,
  ) { }
  async deleteRentalEmployee(rentalID: number) {
    const rental = await this.rentalRepository.findOne({
      where: {
        rentalId: rentalID
      },
      relations: ["vehicle"]
    });
    if (!rental) {
      throw new NotFoundException("No se encontro el alquiler del cliente");
    }
    this.setRentalStatus(rental, 'CANCELADO');
    this.setVehicleStatus(rental.vehicle.vehicleId, 'Disponible');
  }
  async deleteRental(clientID: number, rentalID: number) {
    const rental = await this.rentalRepository.findOne({
      where: {
        client: { clientId: clientID },
        rentalId: rentalID
      }, relations: ['vehicle']
    });
    if (!rental) {
      throw new NotFoundException("No se encontro el alquiler del cliente");
    }
    this.setRentalStatus(rental, 'CANCELADO');
    this.setVehicleStatus(rental.vehicle.vehicleId, 'Disponible');
  }
  async updateRental(clientID: number, rentalID: number, rental: UpdateRentalDto) {
    const rent = await this.rentalRepository.findOne({
      where: {
        client: { clientId: clientID },
        rentalId: rentalID
      },
    });
    if (!rent) {
      throw new NotFoundException("No se encontro el alquiler del cliente");
    }
    const verify = await this.canEditRental(rent.createdAt);
    const verifyDate = await this.canEditDate(rental.rentalDate);
    if (!verify && !verifyDate) {
      throw new BadRequestException("No se puede editar el alquiler cliente");
    }
    rent.rentalDate = rental.rentalDate;
    rent.rentalDays = rental.rentalDays;
    await this.rentalRepository.save(rent);
    this.setVehicleStatus(rental.vehicleId, 'EN ALQUILER');
    return true;
  }
  async updateRentalEmployee(employeeID: number, rentalID: number, rental: UpdateRentalEmployee) {
    const rent = await this.rentalRepository.findOne({
      where: {
        rentalId: rentalID
      },
      relations: ['employee']
    });
    if (!rent) {
      throw new NotFoundException("No se encontro el alquiler");
    }
    const verify = await this.canEditRental(rent.createdAt);
    const verifyDate = await this.canEditDate(rental.rentalDate);
    if (!verify && !verifyDate) {
      throw new BadRequestException("No se puede editar el alquiler empleado");
    }
    rent.rentalDate = rental.rentalDate;
    rent.rentalDays = rental.rentalDays;
    rent.employee.employeeId = employeeID;
    await this.rentalRepository.save(rent);
    return true;
  }


  async markCar(employeeID: number, rentalID: number, rental: UpdateRentalEmployee) {
    const rent = await this.rentalRepository.findOne({
      where: {
        rentalId: rentalID
      }, relations: ['employee']
    });
    if (!rent) {
      throw new NotFoundException("No se encontro el alquiler");
    }
    const verify = await this.canMarkDate(rent.rentalDate);
    console.log(verify)
    if (!verify) {
      throw new BadRequestException("No se puede editar el alquiler");
    }
    await this.rentalRepository
    .createQueryBuilder()
    .update(Rentals)
    .set({
      markAt: () => 'CURRENT_TIMESTAMP',
      initialFuelLevel : rental.initialFuelLevel,
      employee:{employeeId:employeeID},
      status : 'En Curso'
    })
    .where('rentalId = :rentalID', { rentalID })
    .execute();
    return true;
  }

  async createRental(clientID: number, rental: CreateRentalDto) {
    const newRental = this.rentalRepository.create({
      vehicle: { vehicleId: rental.vehicleId, },
      rentalDate: rental.rentalDate,
      client: { clientId: clientID },
      rentalDays: rental.rentalDays,
    });
    this.setVehicleStatus(rental.vehicleId, 'EN ALQUILER');
    return await this.rentalRepository.save(newRental);
  }
  async createRentalEmployee(employeeID: number, rental: CreateRentalEmployee) {
    const newRental = this.rentalRepository.create({
      vehicle: { vehicleId: rental.vehicleId, },
      rentalDate: rental.rentalDate,
      client: { clientId: rental.ClientID },
      employee: { employeeId: employeeID },
      rentalDays: rental.rentalDays,
      initialFuelLevel: rental.initialFuelLevel,
    });
    this.setVehicleStatus(rental.vehicleId, 'EN ALQUILER');
    return await this.rentalRepository.save(newRental);
  }

  async getAllByClient(clientID: number) {
    return await this.rentalRepository.find({
      where: {
        client: { clientId: clientID },
      },
      relations: ['vehicle', 'vehicle.model', "vehicle.model.brand", 'employee', 'payments']
    });
  }

  async getAllByEmployee(employeeID: number) {
    return await this.rentalRepository.find({
      where: {
        employee: { employeeId: employeeID }
      },
      relations: ['vehicle', 'vehicle.model', "vehicle.model.brand", 'client', 'payments']
    });
  }

  async getAll() {
    return await this.rentalRepository.find({ relations: ['vehicle', 'vehicle.model', "vehicle.model.brand", 'employee', 'client', 'payments'] });
  }

  async setVehicleStatus(vehicleID: number, status: string) {
    try {
      const vehicle = await this.vehicleRepository.findOne({ where: { vehicleId: vehicleID } });
      vehicle.status = status;
      await this.vehicleRepository.save(vehicle);
      return
    } catch (error) {
      throw new BadRequestException("No se pudo cambiar el estado del vehiculo");
    }
  }

  async canEditRental(rentalCreatedAt: Date): Promise<boolean> {
    const currentTimestamp = await this.rentalRepository.query('SELECT NOW()');
    const now = new Date(currentTimestamp[0].now);

    // Convertir rentalCreatedAt a Date si es una cadena
    const rentalCreatedDate = typeof rentalCreatedAt === 'string' ? new Date(rentalCreatedAt) : rentalCreatedAt;

    if (isNaN(rentalCreatedDate.getTime())) {
      throw new Error('Invalid rentalCreatedAt date');
    }

    const timeElapsed = (now.getTime() - rentalCreatedDate.getTime()) / (1000 * 60 * 60);
    return timeElapsed <= this.editTimeLimitInHours;
  }

  async canEditDate(rentalDate: Date): Promise<boolean> {
    const currentTimestamp = await this.rentalRepository.query('SELECT NOW()');
    const now = new Date(currentTimestamp[0].now);

    const rentalAt = typeof rentalDate === 'string' ? new Date(rentalDate) : rentalDate;
    const differenceInMilliseconds = rentalAt.getTime() - now.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return differenceInDays >= 2;
  }

  async canMarkDate(rentalDate: Date): Promise<boolean> {
    const currentTimestamp = await this.rentalRepository.query('SELECT NOW()');
    const now = new Date(currentTimestamp[0].now);

    // Asegurarse de que rentalDate sea un objeto Date
    const rentalAt = typeof rentalDate === 'string' ? new Date(rentalDate) : rentalDate;

    // Comparar las fechas: Solo permitir si rentalDate es mayor o igual a la fecha actual
    return rentalAt <= now;

  }

  async setRentalStatus(rental: Rentals, status: string) {
    try {
      rental.status = status;
      await this.rentalRepository.save(rental);
      return
    } catch (error) {
      throw new BadRequestException("No se pudo cambiar el estado de la renta");
    }
  }

}

