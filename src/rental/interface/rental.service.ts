import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rentals } from 'src/entity/Rentals.entity';
import { Repository } from 'typeorm';
import { CheckCar } from '../domain/dto/CheckCar.dto';
import { CreateRentalDto } from '../domain/dto/create-rental.dto';
import { RentalRepository } from '../domain/rental.repository';
import { CreateRentalEmployee } from '../domain/dto/create-rentalEmployee.dto';

@Injectable()
export class RentalService implements RentalRepository {

  constructor(
    @InjectRepository(Rentals)
    private readonly rentalRepository: Repository<Rentals>,
             
  ) { }

  async createRental(clientID: number, rental: CreateRentalDto) {
    const newRental = this.rentalRepository.create(rental);
    newRental.client.clientId = clientID;
    return await this.rentalRepository.save(newRental);
  }
  async createRentalEmployee(employeeID: number, rental: CreateRentalEmployee) {
    const newRental = this.rentalRepository.create(rental);
    newRental.employee.employeeId = employeeID;
    return await this.rentalRepository.save(newRental);
  }

  async getAllByClient(clientID: number) {
    return await this.rentalRepository.find({ where:{
      client:{clientId:clientID}
    },
    relations: ['vehicle', 'employee','payments'] });
  }
  async getAllByEmployee(employeeID: number) {
    return await this.rentalRepository.find({ where:{
      employee:{employeeId:employeeID}
    },
    relations: ['vehicle', 'client','payments'] });
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
    return await this.rentalRepository.find({ relations: ['vehicle', 'employee',  'client','payments'] });
  }

}

