import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rentals } from 'src/entity/Rentals.entity';
import { Repository } from 'typeorm';
import { CheckCar } from '../domain/dto/CheckCar.dto';
import { CreateRentalDto } from '../domain/dto/create-rental.dto';
import { RentalRepository } from '../domain/rental.repository';
import { CreateRentalEmployee } from '../domain/dto/create-rentalEmployee.dto';
import { UpdateRentalDto } from '../domain/dto/update-rental.dto';
import { UpdateRentalEmployee } from '../domain/dto/update-rentalEmployee.dto';
import { Vehicles } from 'src/entity/Vehicles.entity';

@Injectable()
export class RentalService implements RentalRepository {

  constructor(
    @InjectRepository(Rentals)
    private readonly rentalRepository: Repository<Rentals>,
    @InjectRepository(Vehicles)
    private readonly vehicleRepository: Repository<Vehicles>,
  ) { }
  async deleteRental(clientID: number, rentalID: number) {
    const rental = await this.rentalRepository.delete({ rentalId: rentalID, client: { clientId: clientID } });
    if (!rental) {
      throw new NotFoundException("No se encontro el alquiler del cliente");
    }
    const result = await this.rentalRepository.delete(rentalID);
      return result.affected > 0;
  }
  updateRental(clientID: number, rentalID: number, rental: UpdateRentalDto) {
    throw new Error('Method not implemented.');
  }
  updateRentalEmployee(clientID: number, rentalID: number, rental: UpdateRentalEmployee) {
    throw new Error('Method not implemented.');
  }

  async createRental(clientID: number, rental: CreateRentalDto) {
    const newRental = this.rentalRepository.create({
      vehicle:{ vehicleId:rental.vehicleId,},
      rentalDate: rental.rentalDate,
      client: { clientId: clientID },
      rentalDays: rental.rentalDays,
    });
    this.setVehicleStatus(rental.vehicleId, 'EN ALQUILER');
    return await this.rentalRepository.save(newRental);
  }
  async createRentalEmployee(employeeID: number, rental: CreateRentalEmployee) {
    const newRental = this.rentalRepository.create({
      vehicle:{ vehicleId:rental.vehicleId,},
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
    return await this.rentalRepository.find({ where:{
      client:{clientId:clientID}
    },
    relations: ['vehicle','vehicle.model',"vehicle.model.brand", 'employee','payments'] });
  }
  async getAllByEmployee(employeeID: number) {
    return await this.rentalRepository.find({ where:{
      employee:{employeeId:employeeID}
    },
    relations: ['vehicle','vehicle.model',"vehicle.model.brand", 'client','payments'] });
  }

  async checkCar(rentalID: number, checkCar: CheckCar) {
    try {
      const rental = await this.rentalRepository.findOne({
        where: { rentalId: rentalID }, relations:['payments']
      });

      rental.employee.employeeId = checkCar.employee;
      rental.initialFuelLevel = checkCar.initialFuelLevel;
      if(rental.payments.length > 0){
        rental.status = 'EN CURSO';
      }
      await this.rentalRepository.save(rental);
      return
    } catch (error) {
      throw new BadRequestException("Datos para el Checkeo Incorrectos");
    }
  }

  async getAll() {
    return await this.rentalRepository.find({ relations: ['vehicle','vehicle.model',"vehicle.model.brand", 'employee',  'client','payments'] });
  }

  async setVehicleStatus(vehicleID: number, status: string) {
    try{
      const vehicle = await this.vehicleRepository.findOne({where:{vehicleId:vehicleID}});
      vehicle.status = status;
      await this.vehicleRepository.save(vehicle);
      return
    }catch (error) {
      throw new BadRequestException("No se pudo cambiar el estado del vehiculo");
    }
  }

}

